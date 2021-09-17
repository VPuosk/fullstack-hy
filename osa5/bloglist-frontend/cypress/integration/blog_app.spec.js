/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Login')
  })

  describe('Login',function() {
    beforeEach(function() {
      const user = {
        name: 'Teppo Testaaja',
        username: 'ttappi',
        password: 'topsekret'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.visit('http://localhost:3000')
    })

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('ttappi')
      cy.get('#password').type('topsekret')
      cy.get('#login-button').click()
      cy.contains('Logged in user:')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('ttappi')
      cy.get('#password').type('confitential')
      cy.get('#login-button').click()
      cy.contains('Login')
    })

    it('error box is reddish', function() {
      cy.get('#username').type('ttappi')
      cy.get('#password').type('confitential')
      cy.get('#login-button').click()
      cy.get('.error').should('have.css', 'color', 'rgb(100, 0, 0)')
      //cy.wait(100)
      //cy.contains('.error')
      //cy.get('.error').should('have.css', 'color', 'rbg(100, 0, 0)')
    })
  })
})
/*
describe('Blog ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Teppo Testaaja',
      username: 'ttappi',
      password: 'topsekret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Login')
  })
})
*/
