function verificarCarrinho() {
    cy.contains('.modal-body a', 'View Cart').click()
    cy.url().should('include', 'view_cart')
    cy.get('.active').should('be.visible').and('have.text', 'Shopping Cart')
        cy.get('#cart_info').should('be.visible')
}

function prosseguirParaCheckout() {
    cy.contains('.col-sm-6 > .btn', 'Proceed To Checkout').click()
    cy.get('.active').should('be.visible').and('have.text', 'Checkout')
}

function verificarEndereços() {
    cy.contains('.heading', 'Address Details').should('be.visible')
    cy.get('#address_delivery').should('be.visible')
        .and('contain.text', 'Your delivery address')
        .and('contain.text', 'Rua Paulo Hauschild')
        .and('contain.text', 'Estrela')
        .and('contain.text', 'Rio Grande do Sul')
        .and('contain.text', '95880000')
        .and('contain.text', 'Australia')

    cy.get('#address_invoice').should('be.visible')
        .and('contain.text', 'Your billing address')
        .and('contain.text', 'Rua Paulo Hauschild')
        .and('contain.text', 'Estrela')
        .and('contain.text', 'Rio Grande do Sul')
        .and('contain.text', '95880000')
        .and('contain.text', 'Australia')
}

function revisarPedido() {
    cy.contains('.heading', 'Review Your Order').should('be.visible')
    cy.get('#cart_info').should('be.visible').find('[id^="product-"]').should('have.length.greaterThan', 0)
}

function inserirComentario() {
    cy.get('.form-control').type('Comentário: Teste 15')
}

function fazerPedido() {
    cy.contains('a', 'Place Order').click()
}

function inserirDadosDePagamento() {
    cy.get('[data-qa="name-on-card"]').type('Nome cartão')
    cy.get('[data-qa="card-number"]').type('12345555126')
    cy.get('[data-qa="cvc"]').type(332)
    cy.get('[data-qa="expiry-month"]').type(12)
    cy.get('[data-qa="expiry-year"]').type(2028)
    cy.get('[data-qa="pay-button"]').click()
}

function confirmarPedido() {     
    cy.get('[data-qa="order-placed"] > b').should('be.visible')
        .and('contain.text', 'Order Placed!')
    cy.contains('.col-sm-9 > p', 'Congratulations! Your order has been confirmed!').should('be.visible')
}

module.exports = {
    verificarCarrinho,
    prosseguirParaCheckout,
    verificarEndereços,
    revisarPedido,
    inserirComentario,
    fazerPedido,
    inserirDadosDePagamento,
    confirmarPedido
}