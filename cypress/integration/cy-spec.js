/// <reference types="cypress" />
describe('App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('successful login', () => {
    cy.window().then(window => {
      cy.stub(window, 'fetch')
        .resolves({ json: () => ({ token: '123' }) });
    })

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
    cy.window().then(window => {
      cy.stub(window, 'fetch')
        .resolves({ json: () => ({ error: 'invalid password' }) });
    })

    cy.get('input#email').type('test@email.com')
    cy.get('input#password').type('password')
    cy.get('button').click()

    cy.get('button').should('not.be.disabled')
      .and('have.text', 'Submit')

    cy.contains('Error:')
    cy.contains('invalid password')
  });
})
