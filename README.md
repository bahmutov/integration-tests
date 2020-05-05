# integration-tests

Example forked from [sarahatwork/integration-tests](https://github.com/sarahatwork/integration-tests) described in [React Integration Testing: Greater Coverage, Fewer Tests](https://css-tricks.com/react-integration-testing-greater-coverage-fewer-tests/) that shows component testing using Cypress and [cypress-react-unit-test](https://github.com/bahmutov/cypress-react-unit-test).

![Specs](images/all-specs.png)

All Cypress specs are in `src/**/*cy-spec.js` and follow Jest + RTL unit tests. But after `mount(...)` they become full web applications and you can interact with the test via standard Cypress commands.

![LoginModule tests](images/tests.gif)

```js
// src/LoginModule/index.cy-spec.js
mount(<LoginModule />);

// it renders empty email and password fields
cy.get('input#email').should('have.value', '')
cy.get('input#password').should('have.value', '')

// it renders enabled submit button
cy.contains('button', 'Submit').should('be.enabled')
```

**Bonus:** the `LoginModule` tests can be executed as a full end-to-end test, see [cypress/integration/cy-spec.js](cypress/integration/cy-spec.js). Just use `cy.visit` instead of `mount`, but the rest stays the same:

![E2E test](images/e2e.gif)

**Bonus 2:** component testing using `cypress-react-unit-test` collect code coverage by default. For E2E test we instrument the application on the fly using `@cypress/instrument-cra`, see [How to instrument react-scripts web application for code coverage](https://youtu.be/edgeQZ8UpD0).

A single E2E test covers 100% of the source code. Component tests together also cover 100% of the code.

![Coverage report](images/coverage.png)

Read [My Vision for Component Tests in Cypress](https://glebbahmutov.com/blog/my-vision-for-component-tests/)
