function acessarPaginaInicial() {
    cy.visit('https://www.automationexercise.com/')
    cy.contains('AutomationExercise').should('be.visible')
    cy.contains('Full-Fledged practice website for Automation Engineers').should('be.visible')
}

function acessarAba(nomeDaAba) {
    cy.contains('a', nomeDaAba).should('be.visible').click()
}

function realizarAssinatura() {
    cy.get('footer').scrollIntoView()
    cy.get('footer .single-widget h2').should('be.visible').and('have.text', 'Subscription')
    cy.get('#susbscribe_email').should('be.visible').clear().type(`teste_assinatura@gmail${Date.now()}.com`)
    cy.get('#subscribe').should('be.visible').click()
}

function verificarAssinatura() {
    cy.get('footer').contains('You have been successfully subscribed!').should('be.visible')
}

module.exports = {
    acessarPaginaInicial,
    acessarAba,
    realizarAssinatura,
    verificarAssinatura
}