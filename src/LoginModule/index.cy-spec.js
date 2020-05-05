import React from 'react';
import { mount } from 'cypress-react-unit-test'
import { LoginModule } from './';

describe('LoginModule', () => {
  it('initial state', () => {
    mount(<LoginModule />);

    // it renders empty email and password fields
    cy.get('input#email').should('have.value', '')
    cy.get('input#password').should('have.value', '')

    // it renders enabled submit button
    cy.contains('button', 'Submit').should('be.enabled')
  });

  it('successful login', () => {
    cy.stub(window, 'fetch')
      .resolves({ json: () => ({ token: '123' }) });

    mount(<LoginModule />);

    cy.get('input#email').type('test@email.com')
    cy.get('input#password').type('password')
    cy.get('button').click()

    // Better idea: just do an visual screenshot
    // https://on.cypress.io/visual-testing
    cy.get('button').should('not.exist')
    cy.get('input#email').should('not.exist')
    cy.get('input#password').should('not.exist')
    cy.contains('Logged in as').should('be.visible')
    cy.contains('test@email.com').should('be.visible')
  });

  it('error login', () => {
    cy.stub(window, 'fetch')
      .resolves({ json: () => ({ error: 'invalid password' }) });

    mount(<LoginModule />);

    cy.get('input#email').type('test@email.com')
    cy.get('input#password').type('password')
    cy.get('button').click()

    cy.get('button').should('not.be.disabled')
      .and('have.text', 'Submit')

    cy.contains('Error:')
    cy.contains('invalid password')
  });
});
