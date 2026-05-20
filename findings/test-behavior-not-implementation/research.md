# Test Behavior, Not Implementation - Comprehensive Research

**Date:** 2026-03-31
**Tags:** #testing #tdd #software-engineering #best-practices
**Focus:** Concrete, actionable guidance for writing behavior-focused tests

---

## 1. What "Test Behavior Not Implementation" Means Concretely

### Definition

- A **behavior** is any guarantee a system makes about how it will respond to a series of inputs while in a particular state
- Behaviors are expressed as: **"Given [state], When [action], Then [outcome]"**
- Behaviors are **many-to-many with methods** -- a single method can exhibit multiple behaviors, a single behavior can span multiple methods

### The Concrete Distinction

| Behavior Test | Implementation Test |
|---|---|
| Calls public API the way a user would | Calls internal/private methods directly |
| Asserts on **outcomes** (state changes, return values) | Asserts on **interactions** (which methods were called, in what order) |
| Survives refactoring unchanged | Breaks when you refactor without changing behavior |
| Tests **what** the system does | Tests **how** the system does it |
| Uses real objects where feasible | Mocks everything aggressively |

### Red Flags You're Testing Implementation

- Test name mirrors method name (e.g., `testProcessTransaction` instead of `testFundsAreTransferred`)
- Test breaks when you refactor internal code but behavior hasn't changed
- Test uses `verify()` to check that internal methods were called in specific order
- Test accesses private fields or internal data structures
- Test requires updating when you change which algorithm/library you use internally
- Test mocks more than 1-2 dependencies
- One mock specifies behavior for multiple methods
- You need to mentally trace through production code to understand the test
- Test is a **change-detector** -- merely a transformation of production code itself

---

## 2. Key Sources & Their Core Principles

### Kent Beck -- "Programmer Test Principles" & "Canon TDD"

**Core principle:** Programmer tests should be **sensitive to behavior changes** and **insensitive to structure changes**. "If the program's behavior is stable from an observer's perspective, no tests should change."

**Eight test principles:**

1. Minimize programmer waiting (sub-second feedback)
2. Run reliably (delete flaky tests rather than tolerate them)
3. Predict deployability
4. **Respond to behavior changes**
5. **Not respond to structure changes**
6. Be cheap to write
7. Be cheap to read
8. Be cheap to change

**Canon TDD 5-step process:**

1. Write a list of test scenarios (behavioral analysis -- NOT implementation design)
2. Turn exactly one item into a concrete, runnable test
3. Change code to make the test pass
4. Optionally refactor
5. Repeat until list is empty

**Key heuristic:** The test list phase should focus purely on behavior variants and edge cases, never architectural choices. "Mixing in implementation design decisions" is the common mistake.

**Source:** [Programmer Test Principles](https://medium.com/@kentbeck_7670/programmer-test-principles-d01c064d7934), [Canon TDD](https://tidyfirst.substack.com/p/canon-tdd)

---

### Ian Cooper -- "TDD, Where Did It All Go Wrong?"

**Core principle:** The trigger for a new test is **a new behavior/requirement**, not a new class or method. Test the module's public API, not its internal classes.

**Key points:**

- The **"unit"** in unit test is a **module**, not a class -- a module may be one class or many classes behind a facade
- Writing a test per class/method causes: brittle tests, excessive mocking, high test-to-code ratio, slower development
- **Refactoring** = changing implementation while maintaining behavior. If tests break during refactoring, you're testing implementation
- **Mocking rule:** "Avoid mocks at all costs. Use them only to isolate tests at module boundaries" (ports)
- Only 5-10% of code warrants lower-level implementation tests
- The unit of isolation is the **test**, not the class

**Architecture recommendation:** Use ports and adapters. Test through the ports. Controllers should be so thin they don't need testing.

**Source:** [InfoQ Talk](https://www.infoq.com/presentations/tdd-original/), [Distillation](https://herbertograca.com/2018/08/27/distillation-of-tdd-where-did-it-all-go-wrong/), [Rob Moore Review](https://robdmoore.id.au/blog/2015/01/26/review-of-ian-cooper-tdd-where-did-it-all-go-wrong)

---

### Google -- "Software Engineering at Google" (Chapter 12) & "Testing on the Toilet"

**Core principle:** "Write tests that invoke the system being tested in the same way its users would -- make calls against its public API rather than its implementation details."

**Key rules:**

1. **Test via public APIs** -- "If tests work the same way as the system's users, by definition, a change that breaks a test might also break a user"
2. **Test state, not interactions** -- Interaction tests check *how* a system arrived at its result; you should usually care only about *what* the result is
3. **One behavior per test** -- Each test should have only one "when" and one "then"
4. **DAMP over DRY in tests** -- Descriptive And Meaningful Phrases. Tolerate duplication for readability
5. **No logic in tests** -- Tests must be trivially correct on inspection. No string concatenation, loops, or conditionals in test code
6. **Name tests after behaviors** -- Use "should" pattern: `shouldTransferFundsBetweenAccounts`, not `testProcessTransaction`

**On change-detector tests:** "A correct or incorrect program is equally likely to pass" a change-detector test. They provide **negative value** and should be deleted.

**On mocking:** "Mocking frameworks make it easy to create test doubles that record and verify every call... This strategy leads directly to brittle interaction tests." Prefer real objects if they are fast and deterministic. If you can't use real objects, prefer fakes over mocks.

**Source:** [SWE Book Ch12](https://abseil.io/resources/swe-book/html/ch12.html), [Test Behavior Not Implementation](https://testing.googleblog.com/2013/08/testing-on-toilet-test-behavior-not.html), [Test Behaviors Not Methods](https://testing.googleblog.com/2014/04/testing-on-toilet-test-behaviors-not.html), [Change-Detector Tests](https://testing.googleblog.com/2015/01/testing-on-toilet-change-detector-tests.html), [Don't Overuse Mocks](https://testing.googleblog.com/2013/05/testing-on-toilet-dont-overuse-mocks.html), [State vs Interactions](https://testing.googleblog.com/2013/03/testing-on-toilet-testing-state-vs.html)

---

### Martin Fowler -- Classicist vs Mockist

**Core principle:** Classicist (state-based) testing produces tests that survive refactoring. Mockist (interaction-based) testing couples tests to implementation because it tests internal behavior rather than effects.

**Key insight:** "Coupling to the implementation interferes with refactoring, since implementation changes are much more likely to break tests than with classic testing."

**Rule of thumb:** Assert an **effect** (product added to repository) rather than a **behavior** (productRepo.create was called with specified product).

**Source:** [Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html), [Software Testing Guide](https://martinfowler.com/testing/)

---

### Vladimir Khorikov -- "Unit Testing: Principles, Practices, Patterns"

**Core principle:** Four pillars of a good unit test:

1. **Protection against regressions** -- catches real defects
2. **Resistance to refactoring** -- doesn't break on harmless refactoring (largely binary)
3. **Fast feedback** -- executes quickly
4. **Maintainability** -- easy to read and set up

**Key insight:** "Resistance to refactoring" is about eliminating false positives. If tests fail when no behavior changed, they erode trust and slow development.

**Mocking rule:** Only mock shared, out-of-process dependencies (external services). Never mock in-process collaborators.

**Humble Object pattern:** When code is both complex and highly collaborative, refactor to separate the complex logic (testable with unit tests) from the collaboration (tested via integration).

**Source:** [Manning Book](https://www.manning.com/books/unit-testing)

---

### Dave Farley -- TDD & Continuous Delivery

**Core principle:** TDD is primarily a **design technique**, not a testing technique. Properties that make code testable (modular, loosely coupled, cohesive) are identical to high-quality software properties.

**ATDD approach:** Acceptance Test Driven Development focuses on the outcome/purpose of software, not technologies or implementation details. "Outside-in" approach produces better designed software and resilient automated tests.

**Source:** [Dave Farley Blog](https://www.davefarley.net/?p=220), [Continuous Delivery Training](https://continuous-delivery.co.uk/automated-testing)

---

## 3. Concrete Code Examples

### Example 1: State Test vs Interaction Test

```java
// BAD: Interaction test -- tests HOW, not WHAT
@Test
public void shouldWriteToDatabase() {
  accounts.createUser("foobar");
  verify(database).put("foobar");  // Breaks if DB API changes
}

// GOOD: State test -- tests WHAT happened
@Test
public void shouldCreateUsers() {
  accounts.createUser("foobar");
  assertThat(accounts.getUser("foobar")).isNotNull();  // Survives refactoring
}
```

**Why interaction test is bad:**

- Passes even if record is deleted immediately after writing
- Fails if database API changes while correctness is maintained
- Tests *how* results were achieved, not *what* the result is

---

### Example 2: Behavior Test vs Implementation-Coupled Test

```java
// BAD: Tests internal serialization format
@Test
public void shouldSaveSerializedData() {
  processor.saveToDatabase(newTransaction()
      .setId(123).setSender("me").setRecipient("you").setAmount(100));
  assertThat(database.get(123)).isEqualTo("me,you,100");  // Coupled to CSV format
}

// GOOD: Tests observable behavior through public API
@Test
public void shouldTransferFunds() {
  processor.setAccountBalance("me", 150);
  processor.setAccountBalance("you", 20);
  processor.processTransaction(newTransaction()
      .setSender("me").setRecipient("you").setAmount(100));
  assertThat(processor.getAccountBalance("me")).isEqualTo(50);
  assertThat(processor.getAccountBalance("you")).isEqualTo(120);
}
```

---

### Example 3: One Behavior Per Test

```java
// BAD: Tests two behaviors in one test
@Test
public void testDisplayTransactionResults() {
  transactionProcessor.displayTransactionResults(
      newUserWithBalance(LOW_BALANCE_THRESHOLD.plus(dollars(2))),
      new Transaction("Some Item", dollars(3)));
  assertThat(ui.getText()).contains("You bought a Some Item");
  assertThat(ui.getText()).contains("your balance is low");
}

// GOOD: Separate tests per behavior
@Test
public void displayTransactionResults_showsItemName() {
  transactionProcessor.displayTransactionResults(
      new User(), new Transaction("Some Item"));
  assertThat(ui.getText()).contains("You bought a Some Item");
}

@Test
public void displayTransactionResults_showsLowBalanceWarning() {
  transactionProcessor.displayTransactionResults(
      newUserWithBalance(LOW_BALANCE_THRESHOLD.plus(dollars(2))),
      new Transaction("Some Item", dollars(3)));
  assertThat(ui.getText()).contains("your balance is low");
}
```

---

### Example 4: Change-Detector Test (Anti-Pattern)

```python
# BAD: Mechanical mirror of production code -- provides negative value
# Production:
def process(w: Work):
    first_part.process(w)
    second_part.process(w)

# "Test" -- just verifies the calls happen in order
part1 = mock(FirstPart)
part2 = mock(SecondPart)
w = Work()
Processor(part1, part2).process(w)
verify_in_order:
    was_called part1.process(w)
    was_called part2.process(w)
# "A correct or incorrect program is equally likely to pass"
```

---

### Example 5: Over-Mocked Test vs Clean Test

```java
// BAD: Mock explosion -- 5 mocks, traces through implementation
@Test
public void testCreditCardIsCharged() {
  paymentProcessor = new PaymentProcessor(mockCreditCardServer);
  when(mockCreditCardServer.isServerAvailable()).thenReturn(true);
  when(mockCreditCardServer.beginTransaction()).thenReturn(mockTransactionManager);
  when(mockTransactionManager.getTransaction()).thenReturn(transaction);
  when(mockCreditCardServer.pay(transaction, creditCard, 500)).thenReturn(mockPayment);
  when(mockPayment.isOverMaxBalance()).thenReturn(false);
  paymentProcessor.processPayment(creditCard, Money.dollars(500));
  verify(mockCreditCardServer).pay(transaction, creditCard, 500);
}

// GOOD: Uses real (or fake) server, tests outcome
@Test
public void testCreditCardIsCharged() {
  paymentProcessor = new PaymentProcessor(creditCardServer);
  paymentProcessor.processPayment(creditCard, Money.dollars(500));
  assertEquals(500, creditCardServer.getMostRecentCharge(creditCard));
}
```

---

### Example 6: Calculator -- Implementation Changes, Tests Don't

```java
// Original implementation
public class Calculator {
  public int add(int a, int b) { return a + b; }
}

// Test -- focuses on public API behavior
public void testAdd() {
  assertEquals(3, calculator.add(2, 1));
  assertEquals(2, calculator.add(2, 0));
  assertEquals(1, calculator.add(2, -1));
}

// Refactored implementation (new high-perf library) -- test unchanged!
public class Calculator {
  private AdderFactory adderFactory;
  public Calculator(AdderFactory adderFactory) { this.adderFactory = adderFactory; }
  public int add(int a, int b) {
    Adder adder = adderFactory.createAdder();
    ReturnValue returnValue = adder.compute(new Number(a), new Number(b));
    return returnValue.convertToInteger();
  }
}
```

---

## 4. Identifying "The Behavior" -- Unit of Behavior vs Unit of Code

### The Unit Is NOT a Class

| Traditional (Wrong) | Behavioral (Correct) |
|---|---|
| Unit = single class/method | Unit = module/use case |
| One test class per production class | Tests organized by behavior/feature |
| Mock all collaborators | Use real collaborators within module |
| Isolate the class under test | Isolate the test (tests don't affect each other) |

### How to Find the Behavior

1. **Ask: "What does the user/caller care about?"** -- They care about outcomes, not internal method calls
2. **Use the Given/When/Then framework** -- If you can't express the test in GWT, you might be testing implementation
3. **Start from the requirement** -- "The trigger to add a new test is implementing a new requirement" (Ian Cooper)
4. **Write the test list first** -- List all behavioral variants before writing any code (Kent Beck)
5. **Think in use cases** -- A vertical slice through your system, not a horizontal layer

### The Litmus Test

> "If I refactor the internals of my module without changing any external behavior, how many tests break?"
>
> - **Zero** = you're testing behavior
> - **Many** = you're testing implementation

---

## 5. Ports & Adapters / Hexagonal Testing Strategy

### Architecture

```
[Primary Adapters] --> [Input Ports] --> [Domain Logic] --> [Output Ports] --> [Secondary Adapters]
  (HTTP, CLI)           (Use Cases)      (Business Rules)    (Repos, APIs)     (DB, External Services)
```

### Testing Strategy by Layer

| Layer | Test Approach |
|---|---|
| **Domain logic** | Test through input ports (use cases). Use real collaborators within domain. Sociable tests by default |
| **Primary adapters** (controllers) | Test together with domain -- they exist solely to provide access to domain |
| **Secondary adapters** (DB, APIs) | Use real test databases or fake servers (WireMock, MSW). NOT mocking HTTP clients |
| **Module boundaries** | This is where mocks live -- at the ports between modules |

### Key Rules

- **Default to sociable tests** -- use real objects. Only isolate when: performance concerns, network awkwardness, testing component-specific behavior (caching, retries), preventing combinatorial explosion
- **The testing unit is a use case** -- a vertical slice passing through entry point, domain, adapters
- **Mock at ports, not inside modules** -- the port interface is the contract; mock the secondary port when testing domain logic
- **Test entry points with domain** -- don't test controllers in isolation; exercise them with real domain logic

### Practical Metrics

- 400 vertical-slice tests running in <30 seconds is achievable
- Only 5-10% of code needs lower-level isolated tests

---

## 6. Testing Through Public APIs Only

### The Rule

> "Tests should focus on testing your code's public API, and your code's implementation details shouldn't need to be exposed to tests." -- Google Testing Blog

### Why Private Methods Don't Get Their Own Tests

- Private methods are **always reachable** through public API
- If a private method is too complex to test indirectly, it's a **missing abstraction** -- extract it into its own class with its own public API
- Testing private methods directly means tests break when you refactor internals
- The need to test a private method is a **code smell** indicating SRP violation

### The Extraction Pattern

```
BEFORE: GodClass with complex private method
  - Temptation: make private method public to test it
  
AFTER: Extract into separate class
  - ProductImport depends on CsvProductLoader + MysqlProducts
  - CsvProductLoader has its own public API and tests
  - MysqlProducts has its own integration/contract tests
  - ProductImport is unit-tested through its public API
```

---

## 7. Google's Testing Philosophy (Comprehensive)

### From "Software Engineering at Google" Chapter 12

**Tests should be unchanging** -- only four reasons to modify a test:

1. Pure refactoring (shouldn't require test changes)
2. New features (add new tests, don't modify existing)
3. Bug fixes (add the missing test)
4. Behavior changes (update affected tests)

**DAMP > DRY for test code:**

```java
// TOO DRY -- hides intent in helper methods
@Test
public void shouldAllowMultipleUsers() {
  List<User> users = createUsers(false, false);
  Forum forum = createForumAndRegisterUsers(users);
  validateForumAndUsers(forum, users);  // What is this checking?!
}

// DAMP -- clear, self-contained, duplicates setup but readable
@Test
public void shouldAllowMultipleUsers() {
  User user1 = newUser().setState(State.NORMAL).build();
  User user2 = newUser().setState(State.NORMAL).build();
  Forum forum = new Forum();
  forum.register(user1);
  forum.register(user2);
  assertThat(forum.hasRegisteredUser(user1)).isTrue();
  assertThat(forum.hasRegisteredUser(user2)).isTrue();
}
```

**No logic in tests:**

```java
// BAD: String concatenation hides a bug
@Test
public void shouldNavigateToAlbumsPage() {
  String baseUrl = "http://photos.google.com/";
  Navigator nav = new Navigator(baseUrl);
  nav.goToAlbumPage();
  assertThat(nav.getCurrentUrl()).isEqualTo(baseUrl + "/albums");
  // Actually produces "http://photos.google.com//albums" -- double slash!
}

// GOOD: Hardcoded expected value -- bug is obvious
@Test
public void shouldNavigateToAlbumsPage() {
  Navigator nav = new Navigator("http://photos.google.com/");
  nav.goToAlbumPage();
  assertThat(nav.getCurrentUrl())
      .isEqualTo("http://photos.google.com/albums");
}
```

**State vs Interaction testing:**

- **Prefer state testing** -- verifies the code returns the right results
- **Use interaction testing only when:**
  - Correctness depends on *how* (specific algorithm for performance)
  - Side effects matter (exactly one email sent)
  - Call order matters (preventing deadlocks)
  - Testing UI controllers with abstracted rendering

**Test double preference hierarchy:**

1. Real objects (if fast and deterministic)
2. Fake implementations (in-memory DB, fake server)
3. Stubs (return canned responses)
4. Mocks (verify interactions) -- last resort

---

## 8. Master Heuristics & Rules of Thumb

### The 10 Commandments of Behavior Testing

1. **New requirement = new test.** New class or method ≠ new test
2. **Test through public API.** If you can't reach it through public API, it's an implementation detail
3. **Assert outcomes, not interactions.** Check state changes, return values, side effects -- not which internal methods were called
4. **One behavior per test.** One "when", one "then". Multiple assertions only if they verify the same behavior
5. **Name tests after behaviors.** `shouldRejectInsufficientFunds`, not `testProcessTransaction`
6. **Refactoring must not break tests.** If it does, your tests are coupled to implementation
7. **Mock at boundaries, not internally.** Mocks at ports/module boundaries. Real objects within modules
8. **Prefer fakes over mocks.** In-memory DB > mock repository. Fake HTTP server > mock HTTP client
9. **Keep tests DAMP.** Tolerate duplication for clarity. Each test should be understandable without leaving its body
10. **Delete change-detector tests.** If the test is a mechanical mirror of production code, it has negative value

### Quick Decision Framework

```
Am I testing behavior or implementation?

Ask yourself:
  1. If I refactor internals, does this test break?  YES → implementation test
  2. Does this test use verify() on internal methods?  YES → implementation test
  3. Could a user/caller describe what this test checks?  NO → implementation test
  4. Does the test name describe a business rule?  NO → probably implementation test
  5. Am I mocking more than module boundaries?  YES → implementation test
```

### The "Newspaper Test" (from Google)

> Read your test like a newspaper article. The test name is the headline. The body tells the story in Given/When/Then. If a colleague can understand what behavior is being verified without reading production code, it's a good behavior test.

---

## Sources

- [Kent Beck - Programmer Test Principles](https://medium.com/@kentbeck_7670/programmer-test-principles-d01c064d7934)
- [Kent Beck - Canon TDD](https://tidyfirst.substack.com/p/canon-tdd)
- [Ian Cooper - TDD, Where Did It All Go Wrong (InfoQ)](https://www.infoq.com/presentations/tdd-original/)
- [Ian Cooper Talk Distillation](https://herbertograca.com/2018/08/27/distillation-of-tdd-where-did-it-all-go-wrong/)
- [Rob Moore Review of Ian Cooper Talk](https://robdmoore.id.au/blog/2015/01/26/review-of-ian-cooper-tdd-where-did-it-all-go-wrong)
- [SWE at Google - Unit Testing (Ch12)](https://abseil.io/resources/swe-book/html/ch12.html)
- [Google Testing Blog - Test Behavior Not Implementation](https://testing.googleblog.com/2013/08/testing-on-toilet-test-behavior-not.html)
- [Google Testing Blog - Test Behaviors Not Methods](https://testing.googleblog.com/2014/04/testing-on-toilet-test-behaviors-not.html)
- [Google Testing Blog - Change-Detector Tests Considered Harmful](https://testing.googleblog.com/2015/01/testing-on-toilet-change-detector-tests.html)
- [Google Testing Blog - Don't Overuse Mocks](https://testing.googleblog.com/2013/05/testing-on-toilet-dont-overuse-mocks.html)
- [Google Testing Blog - State vs Interactions](https://testing.googleblog.com/2013/03/testing-on-toilet-testing-state-vs.html)
- [Martin Fowler - Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)
- [Vladimir Khorikov - Unit Testing Book](https://www.manning.com/books/unit-testing)
- [Dave Farley - TDD Blog](https://www.davefarley.net/?p=220)
- [Hexagonal Architecture Testing Strategy](https://medium.com/codex/a-testing-strategy-for-a-domain-centric-architecture-e-g-hexagonal-9e8d7c6d4448)
- [The Coder Cafe - Test Behavior Not Implementation](https://read.thecoder.cafe/p/test-behavior-not-implementation)
