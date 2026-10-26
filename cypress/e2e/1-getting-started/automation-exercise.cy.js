/// <reference types="cypress"/>

describe('Automation Exercise', () => {
    // Cadastro
    it('Teste 01: Cadastrar novo usuário com sucesso', () => {
        cy.visit('https://www.automationexercise.com/')
        cy.get('a[href*=login]').click()

        cy.get('[data-qa="signup-name"]').type(`Maga Teste`)
        cy.get('[data-qa="signup-email"]').type(`maga.teste.${Date.now()}@gmail.com`)

        cy.get('[data-qa="signup-button"]').click()

        // radio buttons -> check
        cy.get('#id_gender2').check()

        cy.get('[data-qa="password"]').type('12345')
        
        // selects e comboboxes -> select
        cy.get('[data-qa="days"]').select('4')
        cy.get('[data-qa="months"]').select('12')
        cy.get('[data-qa="years"]').select('1994')
        
        // checkboxes -> check
        cy.get('#newsletter').check()
        cy.get('#optin').check()

        // informações de endereço
        cy.get('[data-qa="first_name"]').type(`Maga`)
        cy.get('[data-qa="last_name"]').type(`Teste`)
        cy.get('[data-qa="company"]').type(`PGATS`)
        cy.get('[data-qa="address"]').type('Rua Paulo Hauschild')
        cy.get('[data-qa="country"]').select('Australia')
        cy.get('[data-qa="state"]').type('Rio Grande do Sul')
        cy.get('[data-qa="city"]').type('Estrela')
        cy.get('[data-qa="zipcode"]').type('95880000')
        cy.get('[data-qa="mobile_number"]').type('999753592')
        cy.get('[data-qa="create-account"]').click()

        cy.get('b').contains('Account Created!')

    });

    it('Teste 02: Efetuar login de usuário com email e senha corretos', () => {
        // ARRANGE
        // Ter uma conta para efetuar o login
        // maga.teste.1792252860746@gmail.com 
        // 12345
        
        cy.visit('https://www.automationexercise.com/login') // PROBLEMA 1: repetição cy.visit

        // ACT
        cy.get('[data-qa="login-email"]').type('maga.teste.1792891190598@gmail.com')
        cy.get('[data-qa="login-password"]').type('12345')
        cy.get('[data-qa="login-button"]').click()
        // cy.contains('Login')

        // ASSERT
        // cy.get('a').should('contain', 'Maga Teste')
        cy.get('a > b').should('contain', 'Maga Teste')

    });

    it('Teste 03: Efetuar login de usuário com email e senha incorretos', () => {
        // ARRANGE   
        cy.visit('https://www.automationexercise.com/login')

        // ACT
        cy.get('[data-qa="login-email"]').type('maga.teste.errado@gmail.com')
        cy.get('[data-qa="login-password"]').type('12345777')
        cy.get('[data-qa="login-button"]').click()

        // ASSERT
        cy.get('form[action*="login"] > p').should('contain', 'Your email or password is incorrect!')

    });

    it('Teste 04: Efetuar logout', () => {
        // ARRANGE
        // Ter uma conta para efetuar o login
        // maga.teste.1792891190598@gmail.com
        // 12345
        
        cy.visit('https://www.automationexercise.com/login') 

        // ACT
        cy.get('[data-qa="login-email"]').type('maga.teste.1792891190598@gmail.com')
        cy.get('[data-qa="login-password"]').type('12345')
        cy.get('[data-qa="login-button"]').click()

        // ASSERT
        cy.get('a[href*="logout"]').should('be.visible').click()
        cy.get('.login-form > h2').should('be.visible')
        cy.get('a[href*="logout"]').should('not.exist')
        cy.get('[action*="login"]').should('be.visible')
        cy.url().should('include', 'login')

    });

    it('Teste 05: Tentar cadastrar usuário com e-mail já cadastrado', () => {
        // ARRANGE
        // Ter uma conta para efetuar o login
        // maga.teste.1792891190598@gmail.com
        // 12345
        
        cy.visit('https://www.automationexercise.com/')
        cy.get('a[href*=login]').click()

        // ACT
        cy.get('[data-qa="signup-name"]').type(`Maga Teste`)
        cy.get('[data-qa="signup-email"]').type(`maga.teste.1792891190598@gmail.com`)
        cy.get('[data-qa="signup-button"]').click()
        
        // ASSERT
        cy.get('form[action*="signup"] > p').should('contain', 'Email Address already exist!')

        
    });
});