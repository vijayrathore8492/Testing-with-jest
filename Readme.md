# Testing in Javascript

## Content

- [Introduction](#introduction)
- [Test Driven Development](#tdd)
- [jest](#jest)
  - [HandsOn](#in-action-jest)
- [sinon](#sinon)
  - [HandsOn](#in-action-sinon)
- [Conclusion](#conclusion)

## Introduction

All of us have heard about Unit Testing, Test Driven Development(TDD), BDD or something similar.

What's these all about?

### Unit Testing

From Stackoverflow, Testing individual units of code.
An individual unit of code is the smallest possible unit of code that can be individually tested in isolation.

### Test Driven Development(TDD)

letting your tests drive your development.
You can do that with unit tests, functional tests and acceptance tests. Usually, you use all three.

### Behavior Driven Development(BDD)

Behavior Driven Development, Where you only write test of a complete behavior of the system rather than small units.
Then you write code to make sure that system exhibit that behavior.


## TDD

In this session we will look into TDD as TDD includes both Unit Testing and functional/Behavioral testing.
There are 3 simple step to do TDD.

1. Set context
2. Expect/Assert outcome
3. Make changes in your code to make the Assertion true

And continue...

Let's take and example of an ATM/CDM machine. To build withdraw function of ATM the above steps will become.

1. Set Context
  Given that money Y is available in the account.
2. Expect/Assert Outcome
  if I withdraw X amount the balance will become Y-X
3. Make changes in your code to make the Assertion true
  Now write the withdraw function that makes the above assertion true.

## Jest

Read more about [Jest](https://jestjs.io/)

Jest is a simple Javascript Testing framework which I have used to do TDD in Javascript.

It works with projects using: Babel, TypeScript, Node, React, Angular, Vue and more!.

We will see it in action with Typescript. Why with Typescript? because Javascript is ridiculous without it

### In-Action-Jest

Let's see it in action.

## Sinon

Read more about [sinon](https://sinonjs.org/)

Sinon is universal Standalone test spies, stubs and mocks for JavaScript.

### In-Action-Sinon

Let's see it in action.


## Conclusion

There are lot of benefits doing TDD.

1. Makes code less error prone.
2. Reduces test cycles.
3. Helps in test automation.
4. Makes your code more readable, anyone can tell by looking at the test cases that what that piece of code is doing.
5. You do what you need to do, nothing more nothing less.
6. Tell if you last change has broke the code. As some test will start failing.
7. It simplifies the code.
8. Quality is improved.
9. Bugs are reduced.
10. Most importantly, it levels you up as a developer.

Cons:

It necessitates a lot of time and effort up front, which can make development feel slow to begin with.
Requires lot of effort in the starting of the project.
But these efforts pays off as the project proceeds.