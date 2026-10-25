/// <reference types="cypress"/>

describe('Automation Exercise', () => {
    // Cadastro
    it('Teste 01: Cadastrar novo usuário com sucesso', () => {
        cy.visit('https://www.automationexercise.com/')
        cy.xpath('//a[contains(@href, "login")]').click()

        cy.xpath('//*[@data-qa="signup-name"]').type(`Maga Teste`)
        cy.xpath('//*[@data-qa="signup-email"]').type(`maga.teste.${Date.now()}@gmail.com`)

        cy.xpath('//*[@data-qa="signup-button"]').click()

        // radio buttons -> check
        cy.xpath('//*[@id="id_gender2"]').check()

        cy.xpath('//*[@data-qa="password"]').type('12345')
        
        // selects e comboboxes -> select
        cy.xpath('//*[@data-qa="days"]').select('4')
        cy.xpath('//*[@data-qa="months"]').select('12')
        cy.xpath('//*[@data-qa="years"]').select('1994')
        
        // checkboxes -> check
        cy.xpath('//*[@id="newsletter"]').check()
        cy.xpath('//*[@id="optin"]').check()

        // informações de endereço
        cy.xpath('//*[@data-qa="first_name"]').type(`Maga`)
        cy.xpath('//*[@data-qa="last_name"]').type(`Teste`)
        cy.xpath('//*[@data-qa="company"]').type(`PGATS`)
        cy.xpath('//*[@data-qa="address"]').type('Rua Paulo Hauschild')
        cy.xpath('//*[@data-qa="country"]').select('Australia')
        cy.xpath('//*[@data-qa="state"]').type('Rio Grande do Sul')
        cy.xpath('//*[@data-qa="city"]').type('Estrela')
        cy.xpath('//*[@data-qa="zipcode"]').type('95880000')
        cy.xpath('//*[@data-qa="mobile_number"]').type('999753592')
        cy.xpath('//*[@data-qa="create-account"]').click()

        cy.contains('Account Created!').should('be.visible')
        cy.xpath('//*[@data-qa="continue-button"]').click()
        cy.contains('Logged in as Maga Teste').should('be.visible')
    });

    it('Teste 02: Efetuar login de usuário com email e senha corretos', () => {
        // ARRANGE
        // Ter uma conta para efetuar o login
        // maga.teste.1792252860746@gmail.com 
        // 12345
        
        cy.visit('https://www.automationexercise.com/login') // PROBLEMA 1: repetição cy.visit

        // ACT
        cy.xpath('//*[@data-qa="login-email"]').type('maga.teste.1792252860746@gmail.com')
        cy.xpath('//*[@data-qa="login-password"]').type('12345')
        cy.xpath('//*[@data-qa="login-button"]').click()
        // cy.contains('Login')

        // ASSERT
        // cy.xpath('a').should('contain', 'Maga Teste')
        cy.xpath(`//b[normalize-space()='Maga Teste']`).should('contain', 'Maga Teste')

    });

    it('Teste 03: Efetuar login de usuário com email e senha incorretos', () => {
        // ARRANGE   
        cy.visit('https://www.automationexercise.com/login')

        // ACT
        cy.xpath('//*[@data-qa="login-email"]').type('maga.teste.incorreto@gmail.com')
        cy.xpath('//*[@data-qa="login-password"]').type('987654')
        cy.xpath('//*[@data-qa="login-button"]').click()

        // ASSERT
        cy.xpath(`//p[normalize-space()='Your email or password is incorrect!']`).should('contain', 'Your email or password is incorrect!')

    });

    it('Teste 04: Efetuar logout', () => {
        // ARRANGE
        // Ter uma conta para efetuar o login
        // maga.teste.1792252860746@gmail.com 
        // 12345
        
        cy.visit('https://www.automationexercise.com/login') 

        // ACT
        cy.xpath('//*[@data-qa="login-email"]').type('maga.teste.1792252860746@gmail.com')
        cy.xpath('//*[@data-qa="login-password"]').type('12345')
        cy.xpath('//*[@data-qa="login-button"]').click()

        // ASSERT
        cy.xpath('//a[contains(@href, "logout")]').should('be.visible').click()
        cy.xpath('//a[contains(@href, "logout")]').should('not.exist')
        cy.xpath('//a[contains(@href, "login")]').should('be.visible')
        cy.url().should('include', 'login')
    });

    it.only('Teste 05: Tentar cadastrar usuário com e-mail já cadastrado', () => {
        // ARRANGE
        // Ter uma conta para efetuar o login
        // maga.teste.1792252860746@gmail.com 
        // 12345
        
        cy.visit('https://www.automationexercise.com/')
        cy.xpath('//a[contains(@href, "login")]').click()

        // ACT
        cy.xpath('//*[@data-qa="signup-name"]').type(`Maga Teste`)
        cy.xpath('//*[@data-qa="signup-email"]').type(`maga.teste.1792252860746@gmail.com`)
        cy.xpath('//*[@data-qa="signup-button"]').click()
        
        // ASSERT
        cy.xpath(`//p[normalize-space()='Email Address already exist!']`).should('contain', 'Email Address already exist!')
    });
});