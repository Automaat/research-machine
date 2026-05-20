# Code Review: [FEATURE] AWS SD: Add MSK Role (PR #17600)

**PR:** <https://github.com/prometheus/prometheus/pull/17600>
**Author:** matt-gp
**Status:** Merged
**Files Changed:** 9 (+1678, -13)

---

## Summary

This PR adds AWS MSK (Managed Streaming for Apache Kafka) service discovery to Prometheus. It enables automatic discovery of broker and KRaft controller nodes from provisioned MSK clusters. The implementation follows the existing patterns of EC2/ECS/Lightsail discovery, adds comprehensive metadata labels, and includes a test suite.

---

## Critical Issues

### 1. Inconsistent Region Resolution -- Does Not Use `loadRegion()`

**File:** `discovery/aws/msk.go` -- `UnmarshalYAML`

All other AWS SD roles (EC2, ECS, Lightsail, ElastiCache, RDS) use the shared `loadRegion()` helper for region resolution:

```go
// EC2, ECS, Lightsail, etc. all do this:
c.Region, err = loadRegion(context.Background(), c.Region)
```

MSK instead implements its own inline region detection logic with raw `awsConfig.LoadDefaultConfig` and IMDS calls. This is:

- **Inconsistent** with the rest of the codebase
- **Potentially buggy** -- if `loadRegion` handles edge cases that the inline version does not
- **Maintenance burden** -- region resolution logic is now duplicated

**Recommendation:** Replace the custom region detection block with a call to `loadRegion()`.

### 2. Nil Pointer Dereference Risk in `refresh()`

**File:** `discovery/aws/msk.go` -- `refresh()` method, label construction block

The code accesses deeply nested fields without nil checks:

```go
mskLabelClusterJmxExporterEnabled: model.LabelValue(
    strconv.FormatBool(*cluster.Provisioned.OpenMonitoring.Prometheus.JmxExporter.EnabledInBroker)),
mskLabelClusterConfigurationARN: model.LabelValue(
    aws.ToString(cluster.Provisioned.CurrentBrokerSoftwareInfo.ConfigurationArn)),
mskLabelClusterConfigurationRevision: model.LabelValue(
    strconv.FormatInt(*cluster.Provisioned.CurrentBrokerSoftwareInfo.ConfigurationRevision, 10)),
```

If any intermediate field (`Provisioned`, `OpenMonitoring`, `Prometheus`, `JmxExporter`, `CurrentBrokerSoftwareInfo`) is nil, this will panic. While the discovery targets provisioned clusters only, the API may return incomplete data for clusters in transitional states (CREATING, DELETING, etc.). A single nil in the chain will crash the entire Prometheus process.

Similarly for broker node exporter:

```go
mskLabelBrokerNodeExporterEnabled: model.LabelValue(
    strconv.FormatBool(*cluster.Provisioned.OpenMonitoring.Prometheus.NodeExporter.EnabledInBroker))
```

**Recommendation:** Add nil guards for the entire chain, or at minimum skip clusters/nodes where required fields are nil with a warning log.

### 3. Silently Swallowed Errors in `refresh()` Goroutines

**File:** `discovery/aws/msk.go` -- `refresh()` method

```go
go func(cluster types.Cluster) {
    defer wg.Done()
    nodes, err := d.listNodes(ctx, aws.ToString(cluster.ClusterArn))
    if err != nil {
        d.logger.Error("Failed to list nodes", ...)
        return  // silently continues
    }
    // ...
}(cluster)
```

When `listNodes` fails for a cluster, the error is logged but the refresh returns partial results as if successful. The caller (and ultimately the user) has no indication that targets are incomplete. This could lead to silent monitoring gaps.

Compare with ECS which uses `errgroup` and propagates errors properly.

**Recommendation:** Use `errgroup.Group` (like ECS does) or collect errors and return them from `refresh()` to signal incomplete discovery.

---

## Design & Architecture Issues

### 4. Credential Test Call in `initMskClient` Is Wasteful

```go
// Test credentials by making a simple API call
testCtx, cancel := context.WithTimeout(ctx, 10*time.Second)
defer cancel()
_, err = d.msk.ListClustersV2(testCtx, &kafka.ListClustersV2Input{})
```

This performs an actual `ListClustersV2` API call just to validate credentials, then the `refresh()` method immediately calls `listClusters()` or `describeClusters()` which makes the same or similar calls again. This doubles the API calls on the first refresh and counts against AWS API rate limits.

Note: ECS has the same pattern (calls `DescribeClusters` as a test), so this may be an existing project convention. However, it's still worth flagging as suboptimal.

**Recommendation:** Remove the credential test, or cache the result of the test call and reuse it in the first refresh.

### 5. `initMskClient` Called on Every Refresh

```go
func (d *MSKDiscovery) refresh(ctx context.Context) ([]*targetgroup.Group, error) {
    err := d.initMskClient(ctx)
```

While `initMskClient` has a `d.msk != nil` early return, it's called on every refresh cycle (default: 60s). This is consistent with ECS, but the credential test call inside means the first invocation has a hidden 10-second timeout that could delay the first targets appearing.

### 6. `BrokerId` Formatting as Float

```go
labels[mskLabelBrokerID] = model.LabelValue(fmt.Sprintf("%.0f", aws.ToFloat64(node.BrokerNodeInfo.BrokerId)))
```

The AWS SDK represents `BrokerId` as `*float64`, so formatting with `%.0f` is technically correct but lossy for very large IDs. This is a minor concern since broker IDs are typically small integers, but `strconv.FormatFloat(..., 'f', 0, 64)` would be more explicit.

---

## Code Quality Issues

### 7. `NodeType` as Exported Type Is Unnecessary

```go
type NodeType string

const (
    NodeTypeBroker     NodeType = "BROKER"
    NodeTypeController NodeType = "CONTROLLER"
)
```

`NodeType`, `NodeTypeBroker`, and `NodeTypeController` are exported but only used within the package. They should be unexported (`nodeType` string type, `nodeTypeBroker`, `nodeTypeController`) unless there's an intentional public API surface. The `nodeType` function name also collides with the type name, which is confusing.

### 8. `mskClient` Interface Could Be More Narrow

The `mskClient` interface includes `DescribeClusterV2`, `ListClustersV2`, and `ListNodes`. When clusters are specified via config, `ListClustersV2` is not used for discovery (only for the credential test). Consider whether the credential test should use a lighter API call.

### 9. Copyright Year in `metrics_msk.go`

```go
// Copyright 2015 The Prometheus Authors
```

The copyright header in `metrics_msk.go` says 2015, while `msk.go` uses the current format "Copyright The Prometheus Authors". This should be consistent -- the newer format without a year is preferred.

---

## Testing Assessment

### Strengths

- Comprehensive test coverage for list/describe/refresh operations
- Mock client properly simulates pagination and filtering
- Tests cover both broker and controller node types
- Multiple endpoint scenarios tested
- Shared-state test (`MSKMultipleJobsDifferentPorts`) prevents config aliasing bugs

### Gaps

- **No test for nil/missing fields** -- The test data always has fully populated structs. There are no tests for clusters in non-ACTIVE states or nodes with nil `BrokerNodeInfo`/`ControllerNodeInfo` fields, which is exactly where the nil dereference bugs (Issue #2) would manifest.
- **No test for `ListClustersV2` pagination** -- The mock returns all clusters in a single response. The pagination loop in `listClusters` is untested.
- **No test for concurrent error handling** -- `describeClusters` launches goroutines but error aggregation is not tested.
- **No test for `UnmarshalYAML` region resolution** -- The custom region detection logic is not tested at all.
- **No negative tests** -- No tests for API errors, timeouts, or malformed responses.

---

## Documentation

The documentation additions are well-structured:

- Clear explanation of supported cluster types (provisioned only)
- IAM permissions documented
- All metadata labels listed with descriptions
- Correct update to the `clusters` parameter description for shared ECS/MSK usage

Minor: The doc says `__meta_msk_cluster_type` can be "PROVISIONED, SERVERLESS" but the code filters for PROVISIONED only in `listClusters`. When using explicit cluster ARNs via `describeClusters`, serverless clusters could theoretically appear but would likely fail with nil pointer dereferences on `cluster.Provisioned.*` fields.

---

## Verdict

The PR implements MSK service discovery following established patterns in the codebase. The core design is sound and the feature is well-scoped. However, there are **production-safety concerns** around nil pointer dereferences that could crash Prometheus, and the region resolution inconsistency should be addressed to maintain codebase uniformity.

### Must Fix Before Merge

1. Nil pointer dereference guards on `cluster.Provisioned.*` chain
2. Use `loadRegion()` instead of custom inline region detection

### Should Fix

3. Propagate errors from `listNodes` goroutines instead of silently swallowing
4. Add tests for nil fields, pagination, and error cases

### Nice to Have

5. Remove or optimize the credential test call
6. Unexport `NodeType` constants
7. Fix copyright header consistency
