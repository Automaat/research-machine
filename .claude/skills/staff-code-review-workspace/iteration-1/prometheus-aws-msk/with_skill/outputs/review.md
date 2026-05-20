# Staff Code Review: [FEATURE] AWS SD: Add MSK Role

**PR:** <https://github.com/prometheus/prometheus/pull/17600>
**Author:** matt-gp
**Base:** main
**Changes:** +1678 / -13 across 9 files
**Date reviewed:** 2026-03-04

---

## Triage Assessment

**Does this need to exist?** Yes. AWS MSK is a widely-used managed Kafka service. There is no existing Prometheus service discovery for MSK clusters. Users currently have to manually maintain static configs or build external service discovery — this fills a real gap in the AWS SD family alongside EC2, ECS, and Lightsail.

**Does it solve the right problem?** Yes. It discovers broker and KRaft controller nodes from provisioned MSK clusters and exposes rich metadata labels for relabeling. The scope is well-defined — provisioned clusters only, no serverless (correctly documented limitation since serverless doesn't expose individual nodes).

**Can it handle failure?** Partially. See reliability section below — there are several failure modes that are silently swallowed or could cause nil pointer panics.

**Is it understandable?** Yes. The code follows established patterns from ECS/EC2/Lightsail discovery. A maintainer familiar with the existing AWS SD codebase can navigate this immediately.

**Does it fit the bigger picture?** Yes. It cleanly extends the existing AWS SD role pattern. The shared `SDConfig` with role-based dispatch is maintained. The new MSK role slots in alongside ec2/ecs/lightsail without disrupting existing behavior.

**Are the right stakeholders aware?** The PR has been approved by two maintainers. One reviewer noted they can't support MSK themselves and the author would need to maintain it — this is a reasonable expectation for a contributed service discovery module.

**PR scope:** Focused. Single feature addition with tests, docs, and dependency updates.
**PR size:** 1678 lines added, but ~1057 are tests. The core implementation is ~463 lines. Reasonable for a new SD module.
**Test coverage:** Comprehensive mock-based unit tests covering list clusters, describe clusters, list nodes, refresh with brokers, controllers, mixed node types, multiple endpoints, tags, and empty clusters.
**Design doc needed?** No — this follows an established pattern (new SD role). No new infrastructure, no cross-team contracts, no schema changes.

---

## Review Summary

**Verdict:** APPROVE_WITH_COMMENTS
**Blocking issues:** 2
**Non-blocking suggestions:** 8

---

## Blocking Issues

**blocking:** Nil pointer dereference risk when accessing `cluster.Provisioned` fields in `refresh()`.

The code accesses `cluster.Provisioned.OpenMonitoring.Prometheus.JmxExporter.EnabledInBroker` and several other nested `.Provisioned.*` fields without nil checks. While `listClusters` filters for `PROVISIONED` type, `describeClusters` does not — it calls `DescribeClusterV2` directly with user-provided ARNs. If a user accidentally provides a serverless cluster ARN in the `clusters` config list, or if a cluster is in a transitional state where `Provisioned` is nil, this will panic and crash the discovery goroutine.

*Location:* `discovery/aws/msk.go:~line 362-379` (the label construction block in `refresh()`)

Recommended fix: Add nil guards before accessing the `Provisioned` sub-fields, or validate that `cluster.ClusterType == types.ClusterTypeProvisioned` before processing and skip non-provisioned clusters with a warning log.

---

**blocking:** Credential test API call in `initMskClient` runs on every first refresh, adding latency and a potential failure mode that blocks all discovery.

The `initMskClient` method makes a `ListClustersV2` call purely to "test credentials" (lines ~417-424). This is problematic:

1. It adds unnecessary latency to the first refresh cycle.
2. If this test call fails transiently (network blip, temporary throttling), the entire discovery is blocked and `d.msk` is left `nil` — meaning the next refresh will retry `initMskClient` from scratch, but the error from the test call is indistinguishable from a real configuration error.
3. The `listClusters` method that runs immediately after will make the same API call anyway — so the "test" is redundant.
4. If the user configured specific `clusters` (ARN list), this `ListClustersV2` call tests a permission (`kafka:ListClustersV2`) that the user might not even need — they only need `kafka:DescribeClusterV2`.

*Location:* `discovery/aws/msk.go:~line 416-424`

Recommended fix: Remove the credential test call. Let the actual discovery calls surface credential/permission errors naturally. The refresh mechanism already handles errors gracefully.

---

## Architecture & Design

**suggestion:** The `Clusters` field in `SDConfig` is now shared between ECS and MSK, but with subtly different semantics.

For ECS, `Clusters` accepts cluster names or ARNs. For MSK, the `describeClusters` path requires full ARNs (since `DescribeClusterV2` takes an ARN). The documentation says "ECS or MSK cluster ARNs" but ECS also accepts names. This semantic divergence on a shared field could confuse users. Consider either:

- Documenting this difference explicitly in the YAML comments
- Validating that MSK cluster values look like ARNs during `UnmarshalYAML`

*Location:* `discovery/aws/aws.go:~line 81` and `docs/configuration/configuration.md`

---

**suggestion:** The `Source` field of the target group is set to `d.cfg.Region`.

This means all MSK clusters in a region share a single target group. If a user monitors many clusters, all targets get replaced atomically on each refresh. The ECS discovery uses a different source per cluster/service. Consider whether per-cluster source grouping would provide better operational granularity (e.g., a single failing `DescribeCluster` call wouldn't wipe targets from healthy clusters).

*Location:* `discovery/aws/msk.go:~line 320`

---

**thought:** The `UnmarshalYAML` method makes live AWS API calls (IMDS region lookup) during config parsing.

This is consistent with how EC2/ECS/Lightsail SD configs work in Prometheus, so it's an existing pattern — not something to block on. However, it's worth noting this means `promtool check config` will make network calls, which can be surprising in CI environments or air-gapped systems. A future improvement across all AWS SD modules could be to defer region resolution to the first refresh.

*Location:* `discovery/aws/msk.go:~line 97-116`

---

**nit:** The `NodeType` type is exported but only used internally.

`NodeType`, `NodeTypeBroker`, and `NodeTypeController` are exported (capitalized) but appear to have no external consumers. Consider making them unexported to reduce the public API surface.

*Location:* `discovery/aws/msk.go:~line 3-8` (the const block)

---

## Reliability & Operations

**issue:** Silent error swallowing in the refresh goroutines.

In `refresh()`, when `listNodes` fails for a cluster, the error is logged but the cluster's targets are silently dropped:

```go
if err != nil {
    d.logger.Error("Failed to list nodes", ...)
    return
}
```

This means a transient API failure for one cluster will cause all its targets to disappear from the target group until the next successful refresh. Users will see targets flapping without a clear signal. Consider:

- Emitting a metric for failed cluster refreshes
- Returning a partial error that still includes targets from successful clusters
- At minimum, logging at `Warn` level with the cluster ARN prominently displayed

*Location:* `discovery/aws/msk.go:~line 347-349`

---

**suggestion:** No concurrency limit on `describeClusters` goroutines.

`describeClusters` spawns one goroutine per cluster ARN with no semaphore/limit. If a user configures 100+ cluster ARNs, this will fire 100+ concurrent API calls, likely hitting AWS throttling limits. Consider using a worker pool with a bounded concurrency (e.g., `errgroup` with `SetLimit`).

*Location:* `discovery/aws/msk.go:~line 236-253`

---

**suggestion:** No concurrency limit on per-cluster `listNodes` goroutines in `refresh()`.

Same pattern — one goroutine per cluster in `refresh()`. When auto-discovering all clusters in a region (no `clusters` config), a region with many MSK clusters will trigger unbounded concurrent `ListNodes` calls.

*Location:* `discovery/aws/msk.go:~line 340-408`

---

**suggestion:** The `describeClusters` method returns an error if *any* cluster fails, discarding results from all successful clusters.

```go
if len(errs) > 0 {
    return nil, fmt.Errorf(...)
}
```

This means one deleted/inaccessible cluster ARN in the config will block discovery of all clusters. Consider returning partial results with logged warnings, or using `errors.Join` to preserve individual error details.

*Location:* `discovery/aws/msk.go:~line 255-257`

---

**thought:** The `BrokerId` field is typed as `*float64` in the AWS SDK, and the code formats it with `%.0f`.

This works but is fragile — if AWS ever returns a fractional broker ID (unlikely but possible with API evolution), the formatting silently truncates. Using `int(aws.ToFloat64(...))` with explicit conversion would be more intentional.

*Location:* `discovery/aws/msk.go:~line 376`

---

## Security & Dependencies

**suggestion:** The `AccessKey` field is a plain `string`, not `config.Secret`.

The `SecretKey` is correctly typed as `config.Secret` (which prevents it from being logged/serialized), but `AccessKey` is a plain string. While access keys are less sensitive than secret keys, they're still credential material. For consistency with security best practices, consider typing it as `config.Secret` as well — or at minimum, ensure it's not included in debug logging output. Note: this may be consistent with other AWS SD configs in Prometheus, in which case it's a pre-existing pattern.

*Location:* `discovery/aws/msk.go:~line 60`

---

**praise:** The dependency addition is minimal and well-scoped — only `aws-sdk-go-v2/service/kafka` is added, with minor version bumps to existing transitive dependencies. No new non-AWS dependencies introduced.

*Location:* `go.mod`

---

## Cross-Cutting Observations

1. **Pattern propagation risk:** The unbounded goroutine pattern in `describeClusters` and `refresh` is also present in the existing ECS discovery code. This PR correctly follows the existing codebase pattern, but it's worth noting that adding MSK as another consumer of this pattern increases the aggregate risk. A future refactoring to introduce bounded concurrency across all AWS SD modules would be valuable.

2. **Error handling asymmetry:** `describeClusters` (user-specified ARNs) is all-or-nothing on errors, while the `listNodes` failure path in `refresh` silently drops individual clusters. These two approaches are inconsistent — ideally both should follow the same partial-success strategy.

3. **Metrics gap:** The `mskMetrics` struct implements `DiscovererMetrics` as a no-op (empty `Register`/`Unregister`). This means there are no MSK-specific metrics beyond the generic refresh metrics. For operational maturity, consider adding metrics for:
   - Number of clusters discovered
   - Number of nodes per cluster
   - API call failures per operation type
   This is non-blocking — it matches the lightsail pattern — but it's a gap worth flagging for follow-up.

4. **Documentation quality:** The configuration docs are well-written with clear caveats about provisioned-only support, required IAM permissions, and which node types support which exporters. This is above-average for a new SD module.

---

## What's Done Well

**praise:** Excellent test coverage. The test suite is comprehensive with 1057 lines covering individual API methods (listClusters, describeClusters, listNodes), the full refresh path with multiple scenarios (brokers, controllers, mixed types, multiple endpoints, tags, empty clusters), and edge cases. The mock client is well-structured and the sort-before-compare pattern correctly handles non-deterministic goroutine ordering.

**praise:** Clean integration with the existing AWS SD framework. The PR follows established patterns exactly — `SDConfig` role dispatch, `DefaultMSKSDConfig`, `init()` registration, `refresh.Discovery` embedding, and the `mskClient` interface for testability. A new contributor or maintainer can immediately understand this code by analogy with ECS or Lightsail.

**praise:** The decision to reuse the `Clusters` field from ECS (after reviewer feedback) rather than adding new MSK-specific config fields shows good responsiveness to review and keeps the config surface area small.

**praise:** The documentation clearly calls out the limitation that serverless clusters are unsupported and explains why (they don't expose individual nodes). This saves users debugging time.
