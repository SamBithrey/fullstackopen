describe('BloglistApp', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Cypress Testing',
      username: 'Tester',
      password: 'Password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    const secondUser = {
      name: 'Second User',
      username: '2ndTester',
      password: 'Password2'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', secondUser)
    cy.visit('http://localhost:3000')
  })

  describe('Front page and Login', function() {
    it('front page can be opened', function() {
      cy.visit('http://localhost:3000')
      cy.contains('Sign in')
    })
    it('user can log in', function() {
      cy.get('#username').type('Tester')
      cy.get('#password').type('Password')
      cy.get('#loginbutton').click()
      cy.contains('Cypress Testing\'s blogs')
    })
    it('log in fails with incorrect credentials', function() {
      cy.get('#username').type('Wrong User')
      cy.get('#password').type('Wrong Password')
      cy.get('#loginbutton').click()
      cy.contains('Wrong credentials')
    })
  })

  describe('Once logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Tester', password: 'Password' })
    })
    it('A blog can be created', function() {
      cy.get('#newBlogButton').click()
      cy.get('#newBlogForm')
        .get('#titleInput').type('Test Title')
      cy.get('#newBlogForm')
        .get('#authorInput').type('Test Author')
      cy.get('#newBlogForm')
        .get('#urlInput').type('Test URL')
      cy.get('#newBlogSubmitButton')
        .click()
      cy.contains('New Blog Added!')
      cy.get('#blogpost').contains('Test Title')
    })
    describe('Once a blog is created', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'Newly Created Blog',
          author: 'Blog Writer',
          url: 'blog-url.com'
        })
      })
      it('Blogs can be liked', function() {
        cy.get('#showMore').click()
        cy.get('#blogpost')
          .get('#blog-likes').contains('0')
        cy.get('#blogpost')
          .get('#likeButton').click()
        cy.get('#blogpost')
          .get('#blog-likes').contains('1')
      })
      it('Blogs can be deleted by their user', function() {
        cy.get('#showMore').click()
        cy.get('#blogpost')
          .get('#deleteButton').click()
        cy.contains('Newly Created Blog').should('not.exist')
      })
      it('Blogs can not be deleted by a different user', function() {
        cy.login({ username: '2ndTester', password: 'Password2' })
        cy.get('#showMore').click()
        cy.get('#blogpost')
          .get('#deleteButton').should('not.exist')
      })
    })
    describe('When many blogs are created', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'Blog with 2nd most likes',
          author: '2nd place Blog',
          url: 'blog-url.com'
        })
        cy.createBlog({
          title: 'Blog with most likes',
          author: '1st place Blog',
          url: 'blog-url.com'
        })
      })
      it('Blogs are sorted by the amount of likes they have', function() {
        cy.get('#showMore').click()
        cy.get('.blogpost').eq(1).get('#showMore').click()
        cy.get('.blogpost').eq(0).get('#likeButton').as('like1')
        cy.get('.blogpost').eq(1).find('#likeButton').as('like2')
        cy.get('@like1').click().wait(200)
        cy.get('@like2').click().wait(200).click().wait(200)
        cy.get('.blogpost').eq(0).should('contain', 'Blog with most likes')
        cy.get('.blogpost').eq(0).should('contain', 'Blog with 2nd most likes')
      })
    })
  })
})

