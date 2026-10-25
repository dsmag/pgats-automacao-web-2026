function verificarTodosOsProdutos() {
    cy.contains('h2', 'All Products').should('be.visible')
    cy.get('.features_items .product-image-wrapper').should('have.length.greaterThan', 0)
}

function verificarDetalhesDoProduto() {
    cy.get('.features_items .productinfo p').first().invoke('text').then((nomeProduto) => {
        const nomeEsperado = nomeProduto.trim()

        cy.get('.features_items').find('a[href^="/product_details/"]').first().click()

        cy.url().should('include', '/product_details/')

        cy.get('.product-information')
            .should('be.visible')
            .within(() => {
                cy.get('h2').should('be.visible').and('have.text', nomeEsperado)
                cy.contains('Category:').should('be.visible')
                cy.contains('Rs.').should('be.visible')
                cy.contains('Availability:').should('be.visible')
                cy.contains('Condition:').should('be.visible')
                cy.contains('Brand:').should('be.visible')
            })
    })
}

function pesquisarProduto(produto) {
    cy.get('#search_product').should('be.visible').clear().type(produto)
    cy.get('#submit_search').should('be.visible').click()
    cy.url().should('include', `products?search=${encodeURIComponent(produto)}`)
}

function verificarPesquisa() {
    cy.url().should('include', 'products?search=')
    cy.contains('h2', 'Searched Products').should('be.visible')
    cy.get('.features_items .product-image-wrapper').should('have.length.greaterThan', 0).each(($produto) => {
        cy.wrap($produto).find('.productinfo p').should('be.visible')
    })
}

function adicionarProdutoNoCarrinho(produto) {
    cy.contains('.productinfo p', produto).should('be.visible').closest('.product-image-wrapper').find('.productinfo .add-to-cart').click()
    cy.get('.modal-title').should('be.visible').and('contain.text', 'Added!')
    cy.get('.modal-body').should('contain.text', 'Your product has been added to cart.')
}

module.exports = {
    verificarTodosOsProdutos,
    verificarDetalhesDoProduto,
    pesquisarProduto,
    verificarPesquisa,
    adicionarProdutoNoCarrinho
}