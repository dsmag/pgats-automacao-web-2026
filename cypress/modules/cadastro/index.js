function iniciarCadastro(nome, email) {
    cy.get('[data-qa="signup-name"]').type(nome)
    cy.get('[data-qa="signup-email"]').type(email)
    cy.get('[data-qa="signup-button"]').click()
}

function preencherCadastro() {
    cy.get('#id_gender2').check()
    cy.get('[data-qa="password"]').type('12345')
    cy.get('[data-qa="days"]').select('4')
    cy.get('[data-qa="months"]').select('12')
    cy.get('[data-qa="years"]').select('1994')
    cy.get('#newsletter').check()
    cy.get('#optin').check()
    cy.get('[data-qa="first_name"]').type(`Maga`)
    cy.get('[data-qa="last_name"]').type(`Teste`)
    cy.get('[data-qa="company"]').type(`PGATS`)
    cy.get('[data-qa="address"]').type('Rua Paulo Hauschild')
    cy.get('[data-qa="country"]').select('Australia')
    cy.get('[data-qa="state"]').type('Rio Grande do Sul')
    cy.get('[data-qa="city"]').type('Estrela')
    cy.get('[data-qa="zipcode"]').type('95880000')
    cy.get('[data-qa="mobile_number"]').type('999753592')

}

function verificarSeCadastroFoiEfetuadoComSucesso() {
    cy.get('[data-qa="create-account"]').click()
    cy.get('[data-qa="account-created"]').should('be.visible').and('contain', 'Account Created!')
}

function validarExclusaoDaConta() {
    cy.contains('b', 'Account Deleted!').should('be.visible')
    cy.contains('p', 'Your account has been permanently deleted!').should('be.visible')
    cy.get('[data-qa="continue-button"]').should('be.visible').click()
}

module.exports = {
    iniciarCadastro,
    preencherCadastro,
    verificarSeCadastroFoiEfetuadoComSucesso,
    validarExclusaoDaConta
}