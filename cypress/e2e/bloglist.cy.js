describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.get('form')
      .should('contain', 'username')
      .should('contain', 'password')
      .should('contain', 'login')
  })
})