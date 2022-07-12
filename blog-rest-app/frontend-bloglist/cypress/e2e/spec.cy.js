/* eslint-disable no-undef */

describe('Blog app', function () {
  beforeEach(function () {
    /*   cy.visit('http://localhost:3000')
    const user = {
      name: 'yasuo',
      username: 'yasuo',
      password: 'yasuo',
    }
    cy.request('POST', 'http://localhost:3001/api/login/', user) */
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function () {
    cy.contains('blogs')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('button').contains('Log in').click()

      cy.get('#username').type('yasuo')
      cy.get('#password').type('yasuo')
      cy.get('#login-btn').click()
      cy.contains('yasuo')
    })

    it('fails with wrong credentials', function () {
      cy.get('button').contains('Log in').click()

      cy.get('#username').type('cassiano')
      cy.get('#password').type('wrong')
      cy.get('#login-btn').click()
      cy.get('.error').should('contain', 'Wrong credentials')

      cy.get('html').should('not.contain', 'yasuo')
    })
  })
})

describe('When logged in', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
    cy.get('button').contains('Log in').click()

    cy.get('#username').type('yasuo')
    cy.get('#password').type('yasuo')
    cy.get('#login-btn').click()
  })

  it('a blog can be created', function () {
    cy.createBlog({
      title: 'A blog created by cypress',
      author: 'Cypress',
      url: 'https://www.test.com/',
    })

    cy.contains('A blog created by cypress')
  })
  it('one of those can be liked', function () {
    cy.get('button').eq(6).click()
    cy.get('button').contains('Like').click()
    cy.contains('Liked')
  })
  it('one of those can be deleted', function () {
    cy.get('button').eq(6).click()
    cy.get('button').contains('Delete').click()
    cy.should('not.contain', 'Cypress')
  })
})
/* 
describe('and several blogs exist', function () {
  beforeAll(function () {
    cy.createBlog({
      title: 'first blog',
      author: 'cypress',
      url: 'https://www.test.com/',
    })
    cy.createBlog({
      title: 'second blog',
      author: 'cypress',
      url: 'https://www.test.com/',
    })
    cy.createBlog({
      title: 'third blog',
      author: 'cypress',
      url: 'https://www.test.com/',
    })
  })

 
  it('one of those can be deleted', function () {
    cy.get('button').contains('View').click()
    cy.contains('first blog').parent().find('button').click()
    cy.get('button').contains('Delete').click()
    cy.get('html').should('not.contain', 'second blog')
  })

  it('they are ordered by the number of likes in descending order', async function () {
    cy.contains('third blog').parent().find('button').click()
    cy.get('#like-btn').click().wait(500).click().wait(500)
    cy.contains('third blog').parent().find('button').click()

    cy.contains('second blog').parent().find('button').click()
    cy.get('#like-btn').click().wait(500).click().wait(500).click().wait(500)

    cy.get('.blog').eq(0).should('contain', 'second blog')
    cy.get('.blog').eq(1).should('contain', 'third blog')
    cy.get('.blog').eq(2).should('contain', 'first blog')
  })
})
 */
