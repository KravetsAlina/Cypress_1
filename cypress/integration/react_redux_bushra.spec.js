describe('react-redux.realworld.io', () => {

    //log in to https://react-redux.realworld.io
    it('LogIn Form', () => {
        cy.visit('https://react-redux.realworld.io/#/login')

        cy.get('[class="auth-page"]').then(sendForm =>{
            cy.wrap(sendForm).get('input[placeholder="Email"]').type('alinakravets2017@gmail.com')
            cy.wrap(sendForm).get('input[placeholder="Password"]').type('alina1331')
            cy.wrap(sendForm).get('button[type="submit"]').click()
        })
    })

    //open page for creating new post
    it('page "New Post"', () => {
        cy.get('.container > .nav > :nth-child(2) > .nav-link')
          .should('contain','New Post')
          .and('have.attr', 'href', '#editor')
          .click()
    })

    //check the form to create a post for hints
    it('check hints for Form', () => {
        // cy.get('button').dblclick() //не подходит(())
        cy.get('button').click()
        cy.get('button').click()

        cy.get('.error-messages > :nth-child(1)')
           .should('contain', 'title can\'t be blankis too short (minimum is 1 character)')

        cy.get('.error-messages > :nth-child(2)')
          .should('contain', 'body can\'t be blank')

        cy.get('.error-messages > :nth-child(3)')
          .should('contain', 'description can\'t be blankis too short (minimum is 1 character)')

//не работает 
        // cy.get('ul[class="error-messages"]')
        // .first().should('contain', 'title can\'t be blankis too short (minimum is 1 character)')
        // .next().should('contain', 'body can\'t be blank')
        // .next().should('contain', 'description can\'t be blankis too short (minimum is 1 character)')
        
        // cy.get('ul[class="error-messages"]').eq(1)
        // .should('contain', 'body can\'t be blank')
        
        // cy.get('ul[class="error-messages"]').eq(2)
        // .should('contain', 'description can\'t be blankis too short (minimum is 1 character)')
        
    })

       
    //create new post
    it('Create new post', () => {
        cy.get('form').within(($form) => {

            cy.get('input[placeholder="Article Title"]').type('New title for new post')
            cy.get('input[placeholder="What\'s this article about?"]').type('This article about new abilities, oportunities.')
            cy.get('textarea[placeholder="Write your article (in markdown)"]').type('My article. Hello! New life!')
            cy.get('input[placeholder="Enter tags"]').type('life cypress')

            cy.get('button[type="button"]')
              .should('contain','Publish Article')
              .click()

            cy.wait(5000)  //долго загруж страница

                //cy.root().submit() => почему этот вариант возвращает меня на экран логина????

        })
    })

    //add comment for post
    it('comment for post', () => { 
        cy.get('textarea[class="form-control"]')
            .should('have.attr', 'rows', '3')
            .type('qwerty')

        cy.get('button[type="submit"]')
            .should('contain','Post Comment')
            .and('have.attr','class','btn btn-sm btn-primary')  //я могу сделать проверку только на 1 класс а не на всю цепочку?
            .click()
      
    })

    //edit post
    it('edit post', () => {
        cy.get('.btn-outline-secondary').click()
        cy.wait(5000)

        cy.get(':nth-child(1) > .form-control').clear().type('Edit post')
        
        cy.get('button[type="button"]').click()
        cy.wait(5000)  //долго загруж страница
            
    })

    //delete post
    it('delete post and check page after deleting', () => {
        cy.get('.btn-outline-danger').click()
        cy.location('href').should('include', '/#')
        
    })

    //like somebody's post
    it('find post and like it', () => {
      cy.get('.navbar').find(':nth-child(1) > .nav-link').click()  
      cy.contains('Global Feed').click()
      cy.contains('Global Feed')
        .should('contain','Global Feed')
        .and('have.class','nav-link active')

      cy.get('button').first().click()
      cy.wait(5000)
      cy.get('button').first().should('contain','1') //???? т к это чужой пост уже может быть лайк


    })
     

    //find by tag
    it('find page with tag', () => {
        cy.contains('dragons').click() 
        cy.get('ul.nav').contains('dragons').should('have.class','active')

    })

    //Log out from site
    it('LogOut Form', () => {
        cy.get(':nth-child(3) > .nav-link')
          .should('contain','Settings')
          .click()

        cy.get('button[class="btn btn-outline-danger"]')
          .should('contain','Or click here to logout.')
          .click()
    })



})