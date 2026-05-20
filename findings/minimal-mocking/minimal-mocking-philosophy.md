# Minimal Mocking in Tests — Philosophy & Practice

**Date:** 2026-03-31
**Tags:** #research #testing #mocking #software-design #tdd
**Focus:** When mocks signal design problems, what to mock, what to use instead

---

## 1. 🚨 "Mocking Is a Code Smell" — When Mocks Indicate Design Problems

**Core rule:** If you need extensive mocking to test a unit, the unit is tightly coupled to its dependencies. Mocking is not inherently evil, but *needing* mocks reveals decomposition failure.

**Eric Elliott's diagnostic:** "Can the unit be tested without mocking dependencies? If it can't, it's tightly coupled."

**Why it matters:**

- Tight coupling = hard to change, hard to test, hard to reuse
- Mock-heavy tests break on refactoring even when behavior is preserved
- Tests become a maintenance burden rather than a safety net
- "If unit testing is becoming painful, don't mock — decompose"

**Sources of coupling that force mocking:**

- Class inheritance (multiplies coupling across hierarchies)
- Global variables and mutable state
- Module imports with side-effects
- Control parameters telling dependencies what to do
- Mutable parameters passed between units

**What to do instead:**

- **Pure functions** — map inputs to outputs, no side effects, zero mocking needed

  ```javascript
  // Impure - needs mock to test
  const signInUser = user => user.isSignedIn = true;
  // Pure - no mock needed
  const signInUser = user => ({...user, isSignedIn: true});
  ```

- **Isolate side-effects from logic** — logic is thinking, effects are actions
- **Declarative composition** — `pipe(g, f)` has no logic to test
- **Pub/sub pattern** — decouple I/O from views using events
- **Saga pattern** — return computation descriptions instead of executing them

**Source:** [Eric Elliott — Mocking is a Code Smell](https://medium.com/javascript-scene/mocking-is-a-code-smell-944a70c90a6a)

---

## 2. ⚔️ Mockist vs. Classicist Testing (Fowler's "Mocks Aren't Stubs")

**Core distinction:** Two fundamentally different philosophies of what "unit test" means.

### Test Doubles Taxonomy (Gerard Meszaros)

| Type | Description | Verification |
|------|------------|--------------|
| **Dummy** | Fills parameter lists, never used | N/A |
| **Fake** | Working implementation, shortcuts for prod (in-memory DB) | State |
| **Stub** | Canned responses, doesn't react outside programmed scenarios | State |
| **Spy** | Stub that records call information | State |
| **Mock** | Pre-programmed with expectations about calls it should receive | Behavior |

### Two Schools of TDD

| | Classicist (Detroit/Chicago) | Mockist (London) |
|---|---|---|
| **Origin** | Kent Beck | Freeman & Pryce ("GOOS") |
| **Unit** | A behavior, may span classes | A single class |
| **Dependencies** | Real objects when feasible | Mock everything with "interesting behavior" |
| **Verification** | State — check outputs/results | Behavior — verify method calls |
| **Design feedback** | Emerges bottom-up | Discovered outside-in |
| **Test coupling** | Coupled to behavior | Coupled to implementation |

**Fowler's preference:** Classical testing. Key concern: mockist tests couple to implementation, breaking on refactoring even when behavior is correct.

**When classicist uses doubles:**

- Only for "awkward collaborations" — external services, slow resources, non-deterministic things
- Everything else: real objects

**Source:** [Martin Fowler — Mocks Aren't Stubs](https://martinfowler.com/articles/mocksArentStubs.html)

---

## 3. 🎯 What to Mock: Only External Boundaries

**Core rule:** Mock I/O, network, time, randomness. Nothing else.

### The "Don't Mock What You Don't Own" Principle

**Origin:** London School of TDD, codified in Freeman & Pryce's *Growing Object-Oriented Software, Guided by Tests* (2009).

**What it means:** Don't mock third-party libraries directly. Instead:

1. Wrap the external dependency in your own thin adapter/facade
2. Mock *your* adapter in tests
3. Test the adapter itself with integration tests against the real thing

**Why it matters:**

- Mocking third-party APIs requires deep knowledge of their internals
- Expectations hardcoded in mocks can be wrong or get out of date
- Library version upgrades silently invalidate mock assumptions
- Tests drown in mocking boilerplate, obscuring intent

**Example — the wrong way:**

```python
# Mocking httpx.Client directly — fragile, verbose
mock_response = Mock()
mock_response.json.return_value = {"repositories": []}
mock_client = Mock()
mock_client.get.return_value = mock_response
```

**Example — the right way:**

```python
# Own abstraction wrapping the external dependency
class DockerRegistryClient:
    def get_repos(self) -> list[str]:
        response = self.client.get("/v2/_catalog")
        return response.json()["repositories"]

# Test mocks YOUR class, not httpx
mock_registry = Mock(spec=DockerRegistryClient)
mock_registry.get_repos.return_value = []
```

**Valid mock targets (external boundaries):**

- Database calls
- HTTP/network requests
- File system I/O
- System clock / `time.Now()`
- Random number generators
- Message queues
- Email/SMS gateways

**Invalid mock targets (internal):**

- Domain objects
- Value objects
- Internal helper functions
- Data structures
- Internal collaborators between your own classes

**Source:** [Hynek Schlawack — Don't Mock What You Don't Own in 5 Minutes](https://hynek.me/articles/what-to-mock-in-5-mins/), [Google Testing Blog](https://testing.googleblog.com/2020/07/testing-on-toilet-dont-mock-types-you.html)

---

## 4. 🔧 Alternatives to Mocking

### 4a. Fakes (In-Memory Implementations)

**What:** Lightweight, working implementations of an interface that behave like the real thing but are faster/simpler.

**Examples:**

- In-memory database instead of PostgreSQL
- In-memory filesystem (Go's `afero`, etc.)
- In-memory message queue
- In-memory HTTP server

**Advantages over mocks:**

- Maintain state across calls (mocks don't)
- Single maintenance point when interfaces change
- Reusable across many tests
- Test state rather than interactions
- Can serve as local development tools too

**Go example — fake with contract testing:**

```go
type PantryContract struct {
    NewPantry func() planner.Pantry
}

func (c PantryContract) Test(t *testing.T) {
    t.Run("can store and retrieve ingredients", func(t *testing.T) {
        sut := c.NewPantry()
        sut.Store(ctx, "flour", 500)
        got, _ := sut.Get(ctx, "flour")
        assert.Equal(t, 500, got)
    })
}

// Run contract against both implementations
func TestInMemoryPantry(t *testing.T) {
    planner.PantryContract{NewPantry: func() planner.Pantry {
        return inmemory.NewPantry()
    }}.Test(t)
}

func TestSQLitePantry(t *testing.T) {
    planner.PantryContract{NewPantry: func() planner.Pantry {
        return sqlite.NewPantry(client)
    }}.Test(t)
}
```

**Critical practice:** Run the same contract tests against both the fake AND the real implementation. This guarantees fidelity.

**Who maintains fakes:** The team that owns the real implementation should write and maintain the fake (Google's recommendation).

### 4b. Testcontainers

**What:** Spin up real dependencies (databases, message queues, Redis) in Docker containers for tests.

**When to use:**

- Integration tests against real infrastructure
- When fakes would be too complex or unreliable
- Schema migration testing
- Testing database-specific behavior

**Trade-off:** Slower than in-memory fakes but higher fidelity than mocks.

### 4c. Contract Testing (Pact, Spring Cloud Contract)

**What:** Consumer-driven contracts that verify API compatibility between services without deploying both.

**How it works:**

1. Consumer defines expected interactions (contract)
2. Contract is shared with provider
3. Provider verifies it can fulfill the contract
4. Both sides run independently

**When to use:** Microservices, API boundaries, cross-team dependencies.

### 4d. James Shore's "Nullables" Pattern

**What:** Production code with an "off switch" for external dependencies. Unlike test doubles, they're actual production code usable for dry-run modes, cache warming, etc.

**How it works:**

- Infrastructure wrappers have a `createNull()` factory
- Null instance disables external communication
- Configurable responses define what the null returns
- Output tracking records what would have been written

**Advantage over mocks:** No separate test double code to maintain; the "fake" IS the production code.

**Source:** [James Shore — Testing Without Mocks](http://www.jamesshore.com/v2/blog/2018/testing-without-mocks)

### 4e. The Functional Core / Imperative Shell Pattern

**What:** Separate pure business logic (testable without any doubles) from I/O orchestration.

```
// Pure logic — test directly, no mocks ever needed
func addOrder(customer Customer, order Order) Customer {
    return Customer{...customer, Paid: true, OrderCount: customer.OrderCount + 1}
}

// Imperative shell — thin, uses real or fake I/O
func processOrder(order Order) error {
    customer := db.GetCustomer(order.CustomerID)  // I/O
    updated := addOrder(customer, order)            // Pure logic
    return db.SaveCustomer(updated)                 // I/O
}
```

**Result:** Most of your code is pure functions needing zero mocks. The thin I/O layer is tested with fakes or integration tests.

---

## 5. 🔺 Testing Pyramid and Mocking

**The pyramid:**

```
        /  E2E  \        ← Few, slow, no mocks (real system)
       / Integration \    ← Moderate, fakes/testcontainers at boundaries
      /   Unit Tests   \  ← Many, fast, minimal mocking
```

**How mocking relates to each level:**

- **Unit tests:** Should need almost no mocks if logic is pure. Mock only I/O boundaries.
- **Integration tests:** Use fakes, testcontainers, or real instances. Mocking here defeats the purpose.
- **E2E tests:** No mocking at all — test the real system.

**Key insight:** If your unit tests need extensive mocking, you probably have the wrong ratio. Push integration concerns to integration tests where they belong. Don't simulate integrations at the unit level.

**The "ice cream cone" anti-pattern:** Too many E2E tests, too few unit tests. Often caused by code that's so coupled it can only be tested end-to-end.

---

## 6. 🚫 Specific Anti-Patterns

### Anti-Pattern 1: Mocking Internal Collaborators

- **What:** Mocking classes/functions that you own and control internally
- **Problem:** Tests become coupled to implementation structure, not behavior
- **Symptom:** Refactoring internal code breaks dozens of tests even though external behavior unchanged
- **Fix:** Test through public API; let internal collaborators execute for real

### Anti-Pattern 2: Mocking Data Structures

- **What:** Using mock frameworks on DTOs, value objects, structs
- **Problem:** Data structures have no behavior — nothing to mock
- **Symptom:** `when(mockUser.getName()).thenReturn("Bob")` instead of just `new User("Bob")`
- **Fix:** Construct real data objects. Use test factories/builders.

### Anti-Pattern 3: Mock-Heavy Tests That Break on Refactoring

- **What:** Tests that verify *how* something is done, not *what* result is produced
- **Problem:** Tests cannot distinguish a bug from a legitimate refactoring
- **Example:**

  ```java
  // BAD: Breaks if you change which internal method is called
  verify(mockService).calculateTax(amount);
  verify(mockService).applyDiscount(amount);
  
  // GOOD: Verifies outcome regardless of implementation
  assertEquals(expected, order.getTotal());
  ```

- **Fix:** State verification over behavior verification

### Anti-Pattern 4: Testing Implementation via Internal Field Inspection

- **What:** Tests that check private/internal state rather than observable behavior
- **Problem:** Internal representation changes (e.g., integer flag to enum) break all tests
- **Fix:** Test through public API and observable outputs

### Anti-Pattern 5: Duplicated Mock Setup Across Tests

- **What:** Copy-pasting mock configuration in every test
- **Problem:** Maintenance nightmare; changes require updating dozens of places
- **Fix:** Centralize test data creation in factories; use shared fixtures

### Anti-Pattern 6: Mocking to Achieve 100% Unit Test Coverage

- **What:** Mocking every dependency so every line can be "unit tested"
- **Problem:** Creates false confidence; mock-based tests rarely find bugs
- **Fix:** Accept that some code (I/O orchestration, framework glue) is better tested with integration tests

**Source:** [Codepipes — Software Testing Anti-Patterns](https://blog.codepipes.com/testing/software-testing-antipatterns.html)

---

## 7. ✅ When Mocking IS Appropriate

**The narrow set of valid use cases:**

1. **External service boundaries** — HTTP APIs, third-party services you can't control
2. **Non-deterministic inputs** — system clock, random number generators, UUIDs
3. **Slow resources** — when real implementation is too slow for unit test feedback loops (but prefer fakes)
4. **Hard-to-trigger error conditions** — network timeouts, disk full, connection refused, integrity failures
5. **Expensive/destructive operations** — sending emails, charging credit cards, deleting production data
6. **Verifying side-effects that produce no observable state** — "was an email sent?" when you can't check a mailbox
7. **State-changing functions with no other way to verify** — `sendEmail()`, `deleteRecord()` where no return value or state change is queryable

**Google's rule of thumb:** Use interaction testing (mocks) ONLY for state-changing functions, NEVER for queries/getters. And always supplement with larger-scope tests using real implementations.

**Even when mocking is valid, prefer this hierarchy:**

1. Real implementation (if fast and deterministic)
2. Fake (in-memory implementation)
3. Stub (hardcoded return values)
4. Mock (behavior verification) ← last resort

---

## 8. 🏢 Google's Approach (Software Engineering at Google, Ch. 13)

**Core philosophy:** "Our first choice for tests is to use the real implementations of the system under test's dependencies."

**The hard lesson:**
> "When mocking frameworks first came into use at Google, they seemed like a hammer fit for every nail... It wasn't until several years and countless tests later that we began to realize the cost: though these tests were easy to write, we suffered greatly given that they required constant effort to maintain while rarely finding bugs."

**Google's preference hierarchy:**

1. **Real implementations** — when fast (<=1ms), deterministic, simple to construct
2. **Fakes** — lightweight working implementations, maintained by API owners
3. **Stubbing** — hardcoded returns, only when directly related to test assertions
4. **Interaction testing** — last resort, only state-changing functions

**The `@DoNotMock` annotation:**

- API owners mark types that should not be mocked
- Signals: "better alternatives exist (real impl or fake)"
- Prevents thousands of brittle mock-based tests from accumulating

**Overusing stubs (BAD):**

```java
when(mockCreditCardServer.isServerAvailable()).thenReturn(true);
when(mockTransactionProcessor.beginTransaction()).thenReturn(transaction);
when(mockCreditCardServer.initTransaction(transaction)).thenReturn(true);
when(mockCreditCardServer.pay(transaction, creditCard, 500)).thenReturn(false);
// ... many more stubs ...
verify(mockCreditCardServer).pay(transaction, creditCard, 500);
// Can't verify payment actually worked!
```

**Using fakes (GOOD):**

```java
paymentProcessor = new PaymentProcessor(creditCardServer, transactionProcessor);
paymentProcessor.processPayment(creditCard, Money.dollars(500));
assertThat(creditCardServer.getMostRecentCharge(creditCard)).isEqualTo(500);
// Verifies actual state — the charge exists
```

**Key insight:** Mocks test *how* something was done. Fakes test *what happened*. Only the latter catches real bugs.

**Source:** [Software Engineering at Google — Test Doubles](https://abseil.io/resources/swe-book/html/ch13.html)

---

## 9. 🔄 Sociable Tests vs. Solitary Tests

**The spectrum:**

| | Solitary Tests | Sociable Tests |
|---|---|---|
| **Dependencies** | All replaced by test doubles | Real collaborators used |
| **Isolation** | Tests one class in total isolation | Tests behavior spanning classes |
| **Failure scope** | Only one test fails per bug | Multiple tests may fail per bug |
| **Refactoring safety** | Break on internal restructuring | Survive refactoring if behavior unchanged |
| **Speed** | Fast (no real deps) | Still fast (no I/O, real in-memory objects) |
| **Fidelity** | Low — mocked assumptions may be wrong | High — real interactions tested |

**Key arguments:**

**Pro-solitary (mockist):** "A breakage in one collaborator should lead to a single test failure, not cascading failures." Easier to pinpoint the exact broken component.

**Pro-sociable (classicist):** Tests reflect real usage. Refactoring internal structure doesn't break tests. Catches interaction bugs that solitary tests miss entirely.

**Modern consensus:** Use sociable tests as default. Reserve solitary tests for components with genuinely complex dependency graphs where sociable testing is impractical.

**Jay Fields' framing (adopted by Fowler):** These are not binary categories but a spectrum. Most teams use a mix — sociable for domain logic, solitary for infrastructure boundaries.

**Source:** [Martin Fowler — Unit Test](https://martinfowler.com/bliki/UnitTest.html), [Fowler — On the Diverse And Fantastical Shapes of Testing](https://martinfowler.com/articles/2021-test-shapes.html)

---

## 10. 💉 Dependency Injection Without Mocking

**Core idea:** DI is for composability and real implementation swapping, not for enabling mocks.

### Architecture: Hexagonal / Ports & Adapters

```
          [Application Core]
         /        |         \
    [Port A]  [Port B]  [Port C]   ← interfaces you define
       |         |          |
  [Adapter]  [Adapter]  [Adapter]  ← implementations (real or fake)
```

- Domain code depends only on ports (interfaces)
- Production: inject real adapters
- Tests: inject fakes (not mocks)
- The adapter is thin — just translation between your domain and the external world

### Thin Adapters Pattern

```go
// Port (interface you own)
type CustomerStore interface {
    Save(ctx context.Context, c Customer) error
    Get(ctx context.Context, id string) (Customer, error)
}

// Real adapter
type PostgresCustomerStore struct { db *sql.DB }

// Fake adapter (same interface, in-memory)
type InMemoryCustomerStore struct { data map[string]Customer }

// Your service takes the interface
type CustomerService struct { store CustomerStore }
```

**In tests:** Inject `InMemoryCustomerStore`. No mocking framework needed. The fake maintains state, supports queries, behaves like a real store.

### Parameterless Instantiation (James Shore)

All classes should have factories with sensible defaults:

```go
func NewApp() *App {
    return &App{
        store:  NewInMemoryStore(),
        clock:  NewRealClock(),
        logger: NewStdoutLogger(),
    }
}

func NewTestApp() *App {
    return &App{
        store:  NewInMemoryStore(),
        clock:  NewFakeClock(fixedTime),
        logger: NewNullLogger(),
    }
}
```

**No mocking framework involved.** Just real or fake implementations composed via constructor injection.

**Source:** [Learn Go with Tests — Working Without Mocks](https://quii.gitbook.io/learn-go-with-tests/testing-fundamentals/working-without-mocks), [Stack Overflow Blog — Favor Real Dependencies](https://stackoverflow.blog/2022/01/03/favor-real-dependencies-for-unit-testing/)

---

## 🧭 Summary Decision Framework

```
Do I need to test this dependency?
│
├── Is it pure logic (no I/O, no state)?
│   └── YES → Test directly. No doubles needed.
│
├── Is it an internal collaborator I own?
│   └── YES → Use the real implementation. Don't mock it.
│
├── Is it an external boundary (DB, HTTP, filesystem)?
│   ├── Is a fake available?
│   │   └── YES → Use the fake.
│   ├── Can I use testcontainers?
│   │   └── YES → Use testcontainers for integration tests.
│   ├── Is it too slow/non-deterministic for unit tests?
│   │   └── YES → Create a fake, or stub as last resort.
│   └── Do I need to verify a side-effect with no observable state?
│       └── YES → Mock is acceptable here (last resort).
│
└── Is it time/randomness?
    └── YES → Inject a controllable implementation (fake clock, seeded RNG).
```

---

## 📚 Key Sources

- [Eric Elliott — Mocking is a Code Smell](https://medium.com/javascript-scene/mocking-is-a-code-smell-944a70c90a6a)
- [Martin Fowler — Mocks Aren't Stubs](https://martinfowler.com/articles/mocksArentStubs.html)
- [Martin Fowler — Unit Test (Sociable vs Solitary)](https://martinfowler.com/bliki/UnitTest.html)
- [Software Engineering at Google — Test Doubles (Ch. 13)](https://abseil.io/resources/swe-book/html/ch13.html)
- [Hynek Schlawack — Don't Mock What You Don't Own in 5 Minutes](https://hynek.me/articles/what-to-mock-in-5-mins/)
- [James Shore — Testing Without Mocks: A Pattern Language](http://www.jamesshore.com/v2/blog/2018/testing-without-mocks)
- [Learn Go with Tests — Working Without Mocks](https://quii.gitbook.io/learn-go-with-tests/testing-fundamentals/working-without-mocks)
- [Stack Overflow Blog — Favor Real Dependencies for Unit Testing](https://stackoverflow.blog/2022/01/03/favor-real-dependencies-for-unit-testing/)
- [Codepipes — Software Testing Anti-Patterns](https://blog.codepipes.com/testing/software-testing-antipatterns.html)
- [AmazingCTO — Mocking is an Anti-Pattern](https://www.amazingcto.com/mocking-is-an-antipattern-how-to-test-without-mocking/)
- [Google Testing Blog — Don't Overuse Mocks](https://testing.googleblog.com/2013/05/testing-on-toilet-dont-overuse-mocks.html)
- [Google Testing Blog — Don't Mock Types You Don't Own](https://testing.googleblog.com/2020/07/testing-on-toilet-dont-mock-types-you.html)

---

**Suggested location:** 3_Resources/Software Engineering/Testing/
**Potential MOCs:** [[Testing MOC]], [[Software Design MOC]], [[TDD MOC]]
**Tags:** #testing #mocking #fakes #tdd #software-design #anti-patterns
