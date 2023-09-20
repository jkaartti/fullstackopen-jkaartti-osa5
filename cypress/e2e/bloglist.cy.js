describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'testpassword'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.get('form')
      .should('contain', 'username')
      .should('contain', 'password')
      .should('contain', 'login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('testpassword')
      cy.get('#loginButton').click()

      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('wronguser')
      cy.get('#password').type('wrongpassword')
      cy.get('#loginButton').click()

      cy.get('html').should('contain', 'wrong username or password')
        .and('not.contain', 'logged in')
    })
  })
})