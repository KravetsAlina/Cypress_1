describe('Feedback form', () => {
    it('Failed feedback', () => {
        cy.visit('https://www.nur.kz/')
        cy.get('ul.bottom-nav__buttons-wrapper').contains('Напишите, что Вы думаете о NUR.KZ').click()
    })

    it('Send feedback and receive mistake', () => {
        cy.visit('https://www.nur.kz/feedback.html')
        cy.get('input#name-input').type('test')
        cy.get('input#email-input').type('test@test.com')
        cy.get('input#phone-input').type('1111111111111111111')
        cy.get('textarea#message-input').type('test')

        cy.get('button.feedback-form__button').click()

        cy.get('h1.feedback-form__header').should('contain', 'Ошибка')
    })

    it('Valid feedback form', () => {
        cy.visit('https://www.nur.kz/feedback.html')
        cy.get('input#name-input').type('test')
        cy.get('input#email-input').type('test@test.com')
        cy.get('input#phone-input').type('088770877')
        cy.get('textarea#message-input').type('test')

        cy.get('button.feedback-form__button').click()

        cy.get('h1.feedback-form__header').should('contain', 'Спасибо')
        
    })

    it('Expect error and red hints', () => {
        cy.visit('https://www.nur.kz/feedback.html')

        cy.get('button.feedback-form__button').click()

        cy.get(':nth-child(1) > .feedback-form__error-message')
        .should('contain', 'Пожалуйста, укажите, как мы можем к Вам обращаться')

        cy.get(':nth-child(2) > .feedback-form__error-message')
        .should('contain', 'Без адреса электронной почты мы не сможем с Вами связаться')

        cy.get(':nth-child(4) > .feedback-form__error-message')
        .should('contain', 'Напишите Ваше сообщение')

        
    })


})