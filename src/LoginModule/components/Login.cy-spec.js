import React from 'react';
import {mount} from 'cypress-react-unit-test'
import { Login } from './Login';

describe('Login', () => {
  it('renders default state', () => {
    mount(<Login state={{ status: 'idle' }} />);
    cy.get('button').should('exist')
  });

  it('renders signed in state', () => {
    mount(<Login state={{ user: { email: 'test@email.com' } }} />);
    cy.contains('Logged in as')
    cy.contains('test@email.com')
    // form is not rendered
    cy.get('button').should('not.exist')
  });

  it('renders error state', () => {
    mount(<Login state={{ status: 'rejected', error: 'invalid password' }} />);

    cy.contains('Error:')
    cy.contains('invalid password')
  });
});
