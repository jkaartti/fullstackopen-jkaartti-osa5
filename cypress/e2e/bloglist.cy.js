describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'testpassword'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.visit('')
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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testuser', password: 'testpassword' })
      cy.createBlog({
        title: 'Initial Blog',
        author: 'Some Author',
        url: 'www.url.com'
      })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()

      cy.get('#title').type('Test Title')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('www.testurl.com')

      cy.get('#create').click()
      cy.contains('Test Title Test Author')
    })

    it('a blog can be liked', function() {
      cy.contains('view').click()
      cy.contains('likes 0')
      cy.contains('like').click()
      cy.contains('likes 1')
    })

    it('a blog can be removed by the user who created it', function() {
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.should('not.contain', 'Inital Blog')
    })

    it('only the user who cretad the blog sees the remove button', function() {
      cy.contains('view').click()
      cy.contains('remove')
      cy.contains('logout').click()

      const user = {
        name: 'Other User',
        username: 'otheruser',
        password: 'otherpassword'
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
      cy.login({ username: 'otheruser', password: 'otherpassword' })

      cy.contains('view').click()
      cy.should('not.contain', 'remove')
    })

    it.only('the blogs are ordered by likes', function() {
      cy.createBlog({
        title: 'Second most likes',
        author: 'Some Author',
        url: 'www.url.com'
      })
      cy.createBlog({
        title: 'Most likes',
        author: 'Some Author',
        url: 'www.url.com'
      })

      cy.get('.blog').eq(2).contains('Most likes').as('mostLikes')
      cy.get('@mostLikes').contains('view').click()
      cy.get('@mostLikes').contains('like').click()
      cy.get('.blog').eq(0).contains('likes 1')
      cy.get('.blog').eq(0).contains('like').click()

      cy.get('.blog').eq(2).contains('Second most likes').as('secondMostLikes')
      cy.get('@secondMostLikes').contains('view').click()
      cy.get('@secondMostLikes').contains('like').click()

      cy.get('.blog').eq(0).should('contain', 'Most likes')
      cy.get('.blog').eq(1).should('contain', 'Second most likes')
      cy.get('.blog').eq(2).should('contain', 'Initial Blog')
    })
  })
})