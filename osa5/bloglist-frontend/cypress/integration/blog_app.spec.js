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
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      // log in user here
      cy.createAccount()
      cy.login({ username: 'ttappi', password: 'topsekret' })
    })

    it('A blog can be created', function() {
      cy.get('#toggle').click()
      cy.get('#title_input').type('Blogin otsikko')
      cy.get('#author_input').type('Blogin rustaaja')
      cy.get('#url_input').type('Blogin osoite')
      cy.get('#PostBlog').click()
      cy.contains('Blogin otsikko by Blogin rustaaja')
      // ...
    })

    it.only('A blog can be liked', function() {
      // ...
      cy.get('#toggle').click()
      cy.get('#title_input').type('Blogin otsikko')
      cy.get('#author_input').type('Blogin rustaaja')
      cy.get('#url_input').type('Blogin osoite')
      cy.get('#PostBlog').click()
      cy.get('#blogs_element')
        .contains('Blogin otsikko by Blogin rustaaja')
        .find('button').click()
      cy.get('#blogs_element').contains('Likes:').find('button').click()
      cy.get('#blogs_element').contains('Likes: 1')
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
