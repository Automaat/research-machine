# Table-Driven Tests (Parameterized / Data-Driven Tests) 🧪

**Date:** 2026-03-31
**Tags:** #research #testing #go #python #java #javascript #rust #best-practices
**Focus:** Practical cross-language guide with actionable rules

---

## 1. 🏗️ Go — The Canonical Pattern

Go is where table-driven tests became a **community standard**. The Go wiki, Dave Cheney, and Mitchell Hashimoto all champion this approach.

### Core Pattern

```go
func TestSplit(t *testing.T) {
    tests := []struct {
        name  string
        input string
        sep   string
        want  []string
    }{
        {name: "simple split", input: "a/b/c", sep: "/", want: []string{"a", "b", "c"}},
        {name: "no match", input: "a/b/c", sep: ",", want: []string{"a/b/c"}},
        {name: "no sep in input", input: "abc", sep: "/", want: []string{"abc"}},
        {name: "trailing sep", input: "a/b/c/", sep: "/", want: []string{"a", "b", "c", ""}},
    }
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got := Split(tt.input, tt.sep)
            if !reflect.DeepEqual(tt.want, got) {
                t.Errorf("got %v, want %v", got, tt.want)
            }
        })
    }
}
```

### Go Community Conventions

- 📦 **Variable naming:** slice = `tests`, loop var = `tt` or `tc`
- 🏷️ **Expected field:** `want` (not `expected`)
- 📊 **Actual variable:** `got` (not `actual`)
- ✅ **Always include `name string`** field — failures without names are undebuggable
- 🔧 **Use `t.Run()`** — enables running individual cases via `go test -run="TestSplit/trailing_sep"`
- ❌ **Use `t.Errorf()` not `t.Fatalf()`** inside subtests — let other cases run
- ⚠️ **Use `t.Fatalf()` only** for setup/precondition failures

### Map-Based Tables (Advanced)

```go
tests := map[string]struct {
    input  string
    result string
}{
    "empty string":    {input: "", result: ""},
    "single char":     {input: "x", result: "x"},
    "multi-byte":      {input: "🎉", result: "🎉"},
}

for name, test := range tests {
    t.Run(name, func(t *testing.T) {
        // ...
    })
}
```

**Why maps?**

- 🎲 Randomized iteration order exposes order-dependent bugs
- 🏷️ Test name is the map key (cleaner than a `name` field)
- 📂 Better IDE collapsing behavior

### Functional Table-Driven Tests (Kubernetes Pattern)

For **complex structs** where most cases differ by one field, use modifier functions:

```go
tests := []struct {
    name string
    pod  func(pod *corev1.Pod)  // modifier function
    err  string
}{
    {
        name: "valid pod",
        // pod is nil = use default valid pod
    },
    {
        name: "missing image",
        pod: func(pod *corev1.Pod) {
            pod.Spec.Containers[0].Image = ""
        },
        err: "container.Image is empty",
    },
}

for _, tt := range tests {
    t.Run(tt.name, func(t *testing.T) {
        pod := validPod()  // base fixture
        if tt.pod != nil {
            tt.pod(pod)    // apply mutation
        }
        err := validate(pod)
        // assert...
    })
}
```

**When to use:** Kubernetes resources, API request objects, config structs — anything large where copy-pasting entire structs to change one field is painful.

### Use `go-cmp` for Complex Comparisons

```go
if diff := cmp.Diff(tt.want, got); diff != "" {
    t.Errorf("mismatch (-want +got):\n%s", diff)
}
```

Better than `reflect.DeepEqual` — shows actual diff.

---

## 2. 🐍 Python — `pytest.mark.parametrize`

### Basic Pattern

```python
import pytest

@pytest.mark.parametrize("input,expected", [
    ("a/b/c", ["a", "b", "c"]),
    ("a,b,c", ["a", "b", "c"]),
    ("abc",   ["abc"]),
])
def test_split(input, expected):
    assert split(input) == expected
```

### Named Cases with `pytest.param`

```python
@pytest.mark.parametrize("input,sep,expected", [
    pytest.param("a/b/c", "/", ["a", "b", "c"], id="slash-separator"),
    pytest.param("a,b,c", ",", ["a", "b", "c"], id="comma-separator"),
    pytest.param("abc",   "/", ["abc"],          id="no-separator-found"),
])
def test_split(input, sep, expected):
    assert split(input, sep) == expected
```

- 🏷️ **Always use `id=`** — default generated IDs are cryptic
- 📊 Use `pytest.param(..., marks=pytest.mark.xfail)` for expected failures

### Error Testing

```python
@pytest.mark.parametrize("input,error_msg", [
    pytest.param("", "empty input", id="empty-string"),
    pytest.param(None, "None not allowed", id="none-input"),
])
def test_split_errors(input, error_msg):
    with pytest.raises(ValueError, match=error_msg):
        split(input)
```

### Fixture Parametrize vs Decorator

- `@pytest.mark.parametrize` — for test-specific params
- `@pytest.fixture(params=[...])` — when **setup logic** varies and is shared across tests

---

## 3. ☕ Java — JUnit 5 `@ParameterizedTest`

### Argument Sources (from simple to complex)

```java
// Simple single-arg
@ParameterizedTest
@ValueSource(strings = {"racecar", "radar", "madam"})
void palindromes(String candidate) {
    assertTrue(isPalindrome(candidate));
}

// Inline CSV (multiple args)
@ParameterizedTest
@CsvSource({
    "1, 1, 2",
    "2, 3, 5",
    "-1, 1, 0"
})
void add(int a, int b, int expected) {
    assertEquals(expected, Calculator.add(a, b));
}

// Factory method (complex objects)
@ParameterizedTest
@MethodSource("provideStringsForSplit")
void split(String input, String sep, List<String> expected) {
    assertEquals(expected, StringUtils.split(input, sep));
}

static Stream<Arguments> provideStringsForSplit() {
    return Stream.of(
        Arguments.of("a/b/c", "/", List.of("a", "b", "c")),
        Arguments.of("a,b,c", ",", List.of("a", "b", "c"))
    );
}
```

### Display Names

```java
@ParameterizedTest(name = "{index}: split({0}, {1}) = {2}")
@MethodSource("provideStringsForSplit")
void split(String input, String sep, List<String> expected) { ... }
```

### Choosing the Right Source

| Source | Use When |
|--------|----------|
| `@ValueSource` | Single primitive/String arg |
| `@EnumSource` | Testing all enum variants |
| `@CsvSource` | Multiple simple args, compact |
| `@CsvFileSource` | Large datasets, external CSV |
| `@MethodSource` | Complex objects, computed args |
| `@ArgumentsSource` | Reusable custom providers |

### Modern Java: Records as Test Cases

```java
record TestCase(String input, String sep, List<String> expected) {}
// Records give type safety + immutability + clean toString
```

---

## 4. 🟨 JavaScript/TypeScript — Jest `each()`

### Array-Based

```typescript
describe.each([
  [1, 2, 3],
  [-1, 1, 0],
  [0, 0, 0],
])('add(%i, %i)', (a, b, expected) => {
  test(`returns ${expected}`, () => {
    expect(add(a, b)).toBe(expected);
  });
});
```

### Object Array (Recommended for TypeScript)

```typescript
type TestCase = {
  name: string;
  a: number;
  b: number;
  expected: number;
};

const cases: TestCase[] = [
  { name: 'positive numbers', a: 1, b: 2, expected: 3 },
  { name: 'negative numbers', a: -1, b: -2, expected: -3 },
  { name: 'zeros', a: 0, b: 0, expected: 0 },
];

test.each(cases)('$name', ({ a, b, expected }) => {
  expect(add(a, b)).toBe(expected);
});
```

### Template Literal Format

```typescript
test.each`
  a     | b     | expected
  ${1}  | ${2}  | ${3}
  ${-1} | ${1}  | ${0}
`('add($a, $b) = $expected', ({ a, b, expected }) => {
  expect(add(a, b)).toBe(expected);
});
```

- 📋 Template literals look like actual tables — great for simple cases
- ⚠️ Awkward for complex objects — use object arrays instead
- 🔒 TypeScript type annotations on test case arrays catch bugs at compile time

---

## 5. 🦀 Rust — `test_case` and `rstest`

### `test_case` Crate

```rust
use test_case::test_case;

#[test_case("a/b/c", "/" => vec!["a", "b", "c"] ; "slash separator")]
#[test_case("abc",   "/" => vec!["abc"]          ; "no separator")]
#[test_case("a,b,c", "," => vec!["a", "b", "c"] ; "comma separator")]
fn test_split(input: &str, sep: &str) -> Vec<&str> {
    split(input, sep)
}
```

- Each `#[test_case]` generates a separate `#[test]` function
- Integrates with `cargo test` — individual case filtering works

### `rstest` Crate (More Flexible)

```rust
use rstest::rstest;

#[rstest]
#[case("a/b/c", "/", vec!["a", "b", "c"])]
#[case("abc", "/", vec!["abc"])]
fn test_split(#[case] input: &str, #[case] sep: &str, #[case] expected: Vec<&str>) {
    assert_eq!(split(input, sep), expected);
}
```

- `rstest` also supports **fixtures** (like pytest) for shared setup
- `#[case]` macro arguments bind to function params

### Choosing Between Them

| Crate | Best For |
|-------|----------|
| `test_case` | Simple input/output mapping, readability |
| `rstest` | Complex setup, fixtures, matrix testing |

---

## 6. 🚫 When NOT to Use Table-Driven Tests (Anti-Patterns)

### ❌ Don't Use When

1. **Each case needs different assertion logic**
   - If you need `if/else` or `switch` inside your test loop, the table is hiding complexity
   - **Rule:** If test body has conditionals based on test case data → split into separate tests

2. **Each case needs different setup/teardown**
   - Tables assume uniform test structure
   - Complex per-case setup makes tables harder to read than individual tests

3. **Tests require fundamentally different verification**
   - One case checks return value, another checks side effects, another checks logging
   - **Rule:** One table = one behavior under test

4. **Test table becomes the implementation**
   - Computed expected values instead of literal constants
   - **Bad:** `expected: fmt.Sprintf("Hello %s", name)` — mirrors the implementation
   - **Good:** `expected: "Hello Alice"` — concrete literal values

5. **Large structs with minimal variation**
   - Copy-pasting 50-line structs to change one field = use functional pattern or separate tests
   - (See Kubernetes functional pattern above)

6. **Test names become meaningless**
   - `"test case 1"`, `"test case 2"` → defeats the purpose
   - Each name should describe the **scenario**, not enumerate

### 🔴 The "Complexity Canary" Rule

> If your test table is hard to write, your function is too complex.
> Table-driven tests are a **complexity indicator** — convoluted tables signal the SUT needs refactoring.

### 🔵 Closure-Driven Tests (Alternative for Go)

When tables become awkward, Jack Lindamood advocates **closure-driven tests:**

```go
func TestSplit(t *testing.T) {
    splitEquals := func(input, sep string, want []string) func(*testing.T) {
        return func(t *testing.T) {
            got := Split(input, sep)
            if !reflect.DeepEqual(want, got) {
                t.Errorf("got %v, want %v", got, want)
            }
        }
    }

    t.Run("basic", splitEquals("a/b/c", "/", []string{"a", "b", "c"}))
    t.Run("no match", splitEquals("a/b/c", ",", []string{"a/b/c"}))
}
```

**Advantages over tables:**

- Named assertion functions (`splitEquals`, `splitContains`)
- Easy to mix different assertion types
- More natural to extend iteratively

---

## 7. ⚡ Subtests and Parallel Execution

### Go Parallel Pattern

```go
func TestSplit(t *testing.T) {
    t.Parallel()
    tests := []struct {
        name  string
        input string
        sep   string
        want  []string
    }{
        // ... cases ...
    }
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            t.Parallel()
            got := Split(tt.input, tt.sep)
            if !reflect.DeepEqual(tt.want, got) {
                t.Errorf("got %v, want %v", got, tt.want)
            }
        })
    }
}
```

### ⚠️ The Loop Variable Trap (Go < 1.22)

```go
// BUG: all goroutines see the LAST value of tt
for _, tt := range tests {
    t.Run(tt.name, func(t *testing.T) {
        t.Parallel()
        t.Log(tt.value) // WRONG: captures reference, not value
    })
}

// FIX: shadow the loop variable
for _, tt := range tests {
    tt := tt  // create new binding per iteration
    t.Run(tt.name, func(t *testing.T) {
        t.Parallel()
        t.Log(tt.value) // CORRECT: each goroutine has its own copy
    })
}
```

- 🎯 **Go 1.22+** fixes this — loop variables are per-iteration by default
- 🔍 **`go vet`** (since 1.20) detects this via `loopclosure` checker
- 🎛️ Control parallelism: `go test -parallel 4`

### Python Parallel

```python
# pytest-xdist for parallel
# pytest -n auto
# Parametrized tests naturally distribute across workers
```

### JUnit Parallel

```java
// junit-platform.properties
junit.jupiter.execution.parallel.enabled = true
junit.jupiter.execution.parallel.mode.default = concurrent
```

### Jest Parallel

- Jest runs **test files** in parallel by default (worker processes)
- `test.concurrent.each` for parallel table tests within a file

---

## 8. 📐 Structuring Test Tables Well

### Naming Cases — Actionable Rules

- ✅ **Describe the scenario:** `"trailing separator"`, `"empty input"`, `"unicode chars"`
- ✅ **Include the distinguishing condition:** `"negative numbers"`, `"nil pointer"`
- ❌ **Never enumerate:** `"case 1"`, `"test 2"`
- ❌ **Never describe the expected result only:** `"returns error"` — say WHY it errors

### Field Organization

```go
tests := []struct {
    name string      // 1. Always first

    // 2. Inputs grouped together
    input string
    sep   string

    // 3. Expected outputs grouped
    want    []string
    wantErr bool
}{...}
```

### Error Handling in Tables

```go
tests := []struct {
    name    string
    input   string
    want    string
    wantErr string  // empty = no error expected
}{
    {name: "valid", input: "hello", want: "HELLO", wantErr: ""},
    {name: "empty input", input: "", want: "", wantErr: "input cannot be empty"},
}

for _, tt := range tests {
    t.Run(tt.name, func(t *testing.T) {
        got, err := Transform(tt.input)
        if tt.wantErr != "" {
            if err == nil || !strings.Contains(err.Error(), tt.wantErr) {
                t.Fatalf("want error containing %q, got %v", tt.wantErr, err)
            }
            return  // don't check result on error cases
        }
        if err != nil {
            t.Fatalf("unexpected error: %v", err)
        }
        if got != tt.want {
            t.Errorf("got %q, want %q", got, tt.want)
        }
    })
}
```

### Helper Structs for Complex Cases

```go
type Given struct {
    a int
    b int
}

type Expected struct {
    sum int
}

tests := map[string]struct {
    given    Given
    expected Expected
}{...}
```

---

## 9. 🏢 Real-World Open Source Examples

### Kubernetes

- **Pervasive use** of table-driven tests with the functional modifier pattern
- Validation tests use `func(pod *corev1.Pod)` modifiers against a valid base fixture
- Pattern: assume valid by default, each test mutates one aspect
- See: `pkg/apis/core/validation/validation_test.go`

### HashiCorp (Terraform, Consul, Vault)

- Mitchell Hashimoto's "Advanced Testing with Go" talk established patterns used across all HashiCorp projects
- Terratest library for infrastructure testing uses table-driven patterns in Go
- Test cases often include `config` (HCL string) and `expected` fields

### Go Standard Library

- `fmt` package: flag parser tests use table-driven style (`flagtests` slice)
- `strings` package: extensive table-driven tests for all string operations
- `net/http` package: request parsing tests

### TiDB

- Explicitly adopted table-driven tests with `t.Parallel()` as a standard
- Published internal guidance on avoiding the loop variable trap

### Tekton (tektoncd/pipeline)

- Large Kubernetes resource validation using functional table pattern
- Tests validate pipeline/task specs with modifier functions

---

## 10. 🐛 Common Mistakes

### Mistake 1: Missing Test Names

```go
// BAD: no name field
tests := []struct{ input string; want string }{...}

// GOOD: always include name
tests := []struct{ name, input, want string }{...}
```

Failures without names produce `TestFoo/#00` — useless for debugging.

### Mistake 2: Using `t.Fatalf` in Subtests

```go
// BAD: stops ALL remaining cases
t.Fatalf("got %v, want %v", got, tt.want)

// GOOD: reports failure, continues to next case
t.Errorf("got %v, want %v", got, tt.want)
```

Reserve `t.Fatalf` for precondition failures where continuing is meaningless.

### Mistake 3: Computed Expected Values

```go
// BAD: mirrors implementation
want: fmt.Sprintf("Hello, %s!", tt.name)

// GOOD: concrete literal
want: "Hello, Alice!"
```

Tests should verify behavior against **known constants**, not recompute the answer.

### Mistake 4: One Giant Table for Multiple Behaviors

```go
// BAD: table tests validation, transformation, AND formatting
tests := []struct {
    input       string
    wantValid   bool
    wantUpper   string
    wantFormatted string
}{...}
```

Split into `TestValidate`, `TestTransform`, `TestFormat` — one table per behavior.

### Mistake 5: Conditional Logic in Test Loop

```go
// BAD: branching defeats the purpose of tables
for _, tt := range tests {
    if tt.expectError {
        // error path
    } else if tt.expectPanic {
        // panic path
    } else {
        // success path
    }
}
```

Each branch should be its own table or test function.

### Mistake 6: Forgetting Loop Variable Capture (Go < 1.22)

See Section 7. All parallel subtests use the last loop value.

### Mistake 7: Order-Dependent Tables

```go
// BAD: test 2 depends on state from test 1
tests := []struct{...}{
    {name: "create user", ...},
    {name: "find created user", ...},  // depends on previous case
}
```

Each table entry must be **independently executable**.

### Mistake 8: Too Many Fields

If your test struct has 10+ fields, the table is too complex. Consider:

- Functional modifier pattern
- Breaking into multiple focused tables
- Refactoring the function under test

---

## 11. 📏 Decision Framework

```
Should I use table-driven tests?

├── Are test cases essentially the same logic with different data?
│   ├── YES → Use table-driven tests ✅
│   └── NO → Use individual tests
│
├── Does each case need different assertion logic?
│   ├── YES → Don't use tables (or use closure-driven) ❌
│   └── NO → Tables are fine ✅
│
├── Are inputs simple (primitives, small structs)?
│   ├── YES → Standard table pattern ✅
│   └── NO → Functional modifier pattern or closures
│
├── More than ~15-20 cases?
│   ├── YES → Consider map-based tables, or split by category
│   └── NO → Slice is fine
│
└── Is the test table becoming hard to read?
    ├── YES → Function is too complex — refactor SUT first
    └── NO → You're golden ✅
```

---

## Related

[[Go Testing]], [[Unit Testing Best Practices]], [[Test Design Patterns]], [[Kubernetes Testing]]

## Sources

- [Dave Cheney: Prefer Table Driven Tests](https://dave.cheney.net/2019/05/07/prefer-table-driven-tests)
- [Go Wiki: TableDrivenTests](https://go.dev/wiki/TableDrivenTests)
- [Go Blog: Subtests and Sub-benchmarks](https://go.dev/blog/subtests)
- [Mitchell Hashimoto: Advanced Testing with Go](https://speakerdeck.com/mitchellh/advanced-testing-with-go)
- [Arslan: Functional Table-Driven Tests in Go](https://arslan.io/2022/12/04/functional-table-driven-tests-in-go/)
- [Jack Lindamood: Closure-Driven Tests](https://medium.com/@cep21/closure-driven-tests-an-alternative-style-to-table-driven-tests-in-go-628a41497e5e)
- [Semaphore: Table-Driven Unit Tests in Go](https://semaphore.io/blog/table-driven-unit-tests-go)
- [Posener: t.Parallel() Pitfall](https://gist.github.com/posener/92a55c4cd441fc5e5e85f27bca008721)
- [Gopher Guides: Table-Driven Testing in Parallel](https://www.gopherguides.com/articles/table-driven-testing-in-parallel)
- [pytest: Parametrize](https://docs.pytest.org/en/stable/how-to/parametrize.html)
- [Baeldung: JUnit 5 Parameterized Tests](https://www.baeldung.com/parameterized-tests-junit-5)
- [JUnit User Guide: Parameterized Tests](https://docs.junit.org/6.0.3/writing-tests/parameterized-classes-and-tests.html)
- [Jest Globals API](https://jestjs.io/docs/api)
- [Goodenough: Table-Driven Testing with TypeScript](https://goodenough.nz/blog/table-driven-testing-with-typescript)
- [Swiftology: Pitfalls of Parameterized Tests](https://swiftology.io/articles/pitfalls-of-parameterized-tests/)
- [Huttunen: JUnit 5 Parameterized Tests](https://www.arhohuttunen.com/junit-5-parameterized-tests/)
- [Foojay: Records for JUnit 5 Parameterized Tests](https://foojay.io/today/records-for-cleaner-and-more-expressive-parameterized-tests-in-junit-5/)

---

**Suggested location:** 3_Resources/Engineering/Testing/
**Potential MOCs:** [[Testing MOC]], [[Go Development MOC]]
**Tags:** #testing #table-driven #parameterized #go #python #java #javascript #rust
