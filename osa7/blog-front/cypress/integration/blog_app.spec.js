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

    it('A blog can be liked', function() {
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

    it('A blog can be removed', function() {
      // ...
      cy.get('#toggle').click()
      cy.get('#title_input').type('Blogin otsikko')
      cy.get('#author_input').type('Blogin rustaaja')
      cy.get('#url_input').type('Blogin osoite')
      cy.get('#PostBlog').click()
      cy.visit('http://localhost:3000')
      cy.get('#blogs_element')
        .contains('Blogin otsikko by Blogin rustaaja')
        .find('button').click()
      cy.get('#blogs_element').get('#removeBlog').click()
      cy.get('.success').should('have.css', 'color', 'rgb(0, 100, 0)')
    })

    it.only('blogs will be sorted according to likes', function() {
      // ...
      cy.get('#toggle').click()
      cy.get('#title_input').type('Eka otsikko')
      cy.get('#author_input').type('Eka rustaaja')
      cy.get('#url_input').type('Eka osoite')
      cy.get('#PostBlog').click()
      cy.get('#toggle').click()
      cy.get('#title_input').type('Toka otsikko')
      cy.get('#author_input').type('Toka rustaaja')
      cy.get('#url_input').type('Toka osoite')
      cy.get('#PostBlog').click()
      cy.visit('http://localhost:3000')
      cy.wait(200)

      cy.get('#blogs_element')
        .contains('Eka otsikko by Eka rustaaja')
        .find('button').click()
      cy.get('#blogs_element')
        .contains('Eka otsikko')
        .parent()
        .contains('Likes: ')
        .find('button').click()
      cy.get('#blogs_element').contains('Likes: 1')
      cy.get('#blogs_element')
        .contains('Toka otsikko by Toka rustaaja')
        .find('button').click()
      cy.get('#blogs_element')
        .contains('Toka otsikko')
        .parent()
        .contains('Likes: ')
        .find('button').click()
      cy.wait(300)
      cy.get('#blogs_element')
        .contains('Toka otsikko')
        .parent()
        .contains('Likes: ')
        .find('button').click()
      cy.wait(300)
      cy.get('#blogs_element')
        .contains('Toka otsikko')
        .parent()
        .contains('Likes: ')
        .find('button').click()
      cy.wait(300)
      //cy.visit('http://localhost:3000')
      cy.get('.fullBlog').then((test) => {
        console.log(test)
        console.log(test[0].innerText.includes('Toka otsikko'))
        expect(test[0].innerText).to.include('Toka otsikko')
      })
    })
  })
})