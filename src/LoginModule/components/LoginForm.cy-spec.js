import React from 'react';
import { mount } from 'cypress-react-unit-test'
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('initial state', () => {
    mount(<LoginForm />);

    // it renders empty email and password fields
    cy.get('input#email').should('have.value', '')
    cy.get('input#password').should('have.value', '')

    // it renders enabled submit button
    cy.contains('button', 'Submit').should('be.enabled')
  });

  it('calls onSubmit with form data on submit button click', () => {
    const onSubmitSpy = cy.stub()
    mount(<LoginForm onSubmit={onSubmitSpy} />);

    cy.get('input#email').type('test@email.com')
    cy.get('input#password').type('password')
    cy.get('button').click()
      .then(() => {
        /* eslint-disable-next-line */
        expect(onSubmitSpy).to.be.calledWith({
          email: 'test@email.com',
          password: 'password'
        })
      })
  });

  it('updates button on loading state', () => {
    mount(<LoginForm isLoading />);

    cy.get('button').should('be.disabled')
      .and('have.text', 'Loading...')
  });
});
