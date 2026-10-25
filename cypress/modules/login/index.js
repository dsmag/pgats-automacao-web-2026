function preencherLogin(email, senha) {
    cy.get('[data-qa="login-email"]').type(email)
    cy.get('[data-qa="login-password"]').type(senha)
    cy.get('[data-qa="login-button"]').click()
}

function verificarSeLoginFoiEfetuadoComSucesso() {
    cy.get('a > b').should('contain', 'Maga Teste')
}

function verificarSeLogoutFoiEfetuadoComSucesso() {
    cy.get('.login-form > h2').should('be.visible')
    cy.get('a[href*="logout"]').should('not.exist')
    cy.get('[action*="login"]').should('be.visible')
    cy.url().should('include', 'login')
}

function verificarMensagemErro(seletor, mensagem) {
    cy.get(seletor).should('contain', mensagem)
}

module.exports = {
    preencherLogin,
    verificarSeLoginFoiEfetuadoComSucesso,
    verificarSeLogoutFoiEfetuadoComSucesso, 
    verificarMensagemErro
}


