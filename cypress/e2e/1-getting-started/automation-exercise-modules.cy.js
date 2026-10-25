/// <reference types="cypress"/>

const inicio = require('../../modules/inicio/index.js');
const cadastro = require('../../modules/cadastro/index.js');
const login = require('../../modules/login/index.js');
const produtos = require('../../modules/produtos/index.js');
const carrinho = require('../../modules/carrinho/index.js');


describe('Automation Exercise', () => {
    it('Teste 01: Cadastrar novo usuário com sucesso', () => {
        // ARRANGE  
        inicio.acessarPaginaInicial()
        inicio.acessarAba('Login')

        // ACT
        cadastro.iniciarCadastro(`Maga Teste`, `maga.teste.${Date.now()}@gmail.com`)
        cadastro.preencherCadastro()

        // ASSERT
        cadastro.verificarSeCadastroFoiEfetuadoComSucesso()
    });

    it('Teste 02: Efetuar login de usuário com email e senha corretos', () => {
        // ARRANGE      
        inicio.acessarPaginaInicial()
        inicio.acessarAba('Login')

        // ACT
        login.preencherLogin('maga.teste.1792891190598@gmail.com', '12345')

        // ASSERT
        login.verificarSeLoginFoiEfetuadoComSucesso()
    });

    it('Teste 03: Efetuar login de usuário com email e senha incorretos', () => {
        // ARRANGE   
        inicio.acessarPaginaInicial()
        inicio.acessarAba('Login')

        // ACT
        login.preencherLogin('maga.teste.incorreto@gmail.com', '77777777')

        // ASSERT
        login.verificarMensagemErro('form[action*="login"] > p', 'Your email or password is incorrect!')
    });

    it('Teste 04: Efetuar logout', () => {
        // ARRANGE
        inicio.acessarPaginaInicial()
        inicio.acessarAba('Login')

        // ACT
        login.preencherLogin('maga.teste.1792891190598@gmail.com', '12345')

        // ASSERT
        inicio.acessarAba('Logout')
        login.verificarSeLogoutFoiEfetuadoComSucesso()
    });

    it('Teste 05: Tentar cadastrar usuário com e-mail já cadastrado', () => {
        // ARRANGE
        inicio.acessarPaginaInicial()
        inicio.acessarAba('Login')

        // ACT
        cadastro.iniciarCadastro(`Maga Teste`, `maga.teste.1792891190598@gmail.com`)

        // ASSERT
        login.verificarMensagemErro('form[action*="signup"] > p', 'Email Address already exist!')
    });

    it('Teste 08: Acessar todos os produtos e verificar página de detalhes do primeiro produto', () => {
        // ARRANGE
        inicio.acessarPaginaInicial()

        // ACT        
        inicio.acessarAba('Products')

        // ASSERT
        produtos.verificarTodosOsProdutos()
        produtos.verificarDetalhesDoProduto()
    });

    it('Teste 09: Pesquisar produto', () => {
        // ARRANGE
        inicio.acessarPaginaInicial()

        // ACT        
        inicio.acessarAba('Products')
        produtos.verificarTodosOsProdutos()

        // ASSERT
        produtos.pesquisarProduto('Blue')
        produtos.verificarPesquisa()
    });

    it('Teste 10: Verificar assinatura na página inicial', () => {
        // ARRANGE
        inicio.acessarPaginaInicial()

        // ACT        
        inicio.realizarAssinatura()

        // ASSERT
        inicio.verificarAssinatura()
    });

    it('Teste 15: Registrar-se para iniciar compra e finalizar o pedido', () => {
        // ARRANGE
        inicio.acessarPaginaInicial()
        inicio.acessarAba('Login')
        cadastro.iniciarCadastro(`Maga Teste Checkout`, `maga.teste.checkout${Date.now()}@gmail.com`)
        cadastro.preencherCadastro()
        cadastro.verificarSeCadastroFoiEfetuadoComSucesso()

        // ACT        
        inicio.acessarAba('Products')
        produtos.pesquisarProduto('Dress')
        produtos.adicionarProdutoNoCarrinho('Sleeveless Unicorn Patch Gown - Pink')

        // ASSERT
        carrinho.verificarCarrinho()
        carrinho.prosseguirParaCheckout()
        carrinho.verificarEndereços()
        carrinho.revisarPedido()
        carrinho.inserirComentario()
        carrinho.fazerPedido()
        carrinho.inserirDadosDePagamento()
        carrinho.confirmarPedido()
        inicio.acessarAba('Delete')
        cadastro.validarExclusaoDaConta()
    });

    it('Teste 16: Logar para iniciar compra e finalizar o pedido', () => {
        // ARRANGE
        const email = `maga.teste.${Date.now()}@gmail.com`

        inicio.acessarPaginaInicial()
        inicio.acessarAba('Login')
        cadastro.iniciarCadastro(`Maga Teste`, email)
        cadastro.preencherCadastro()
        cadastro.verificarSeCadastroFoiEfetuadoComSucesso()
        inicio.acessarAba('Login')

        // ACT        
        inicio.acessarAba('Products')
        produtos.pesquisarProduto('Dress')
        produtos.adicionarProdutoNoCarrinho('Sleeveless Unicorn Patch Gown - Pink')

        // ASSERT
        carrinho.verificarCarrinho()
        carrinho.prosseguirParaCheckout()
        carrinho.verificarEndereços()
        carrinho.revisarPedido()
        carrinho.inserirComentario()
        carrinho.fazerPedido()
        carrinho.inserirDadosDePagamento()
        carrinho.confirmarPedido()
        inicio.acessarAba('Delete')
        cadastro.validarExclusaoDaConta()
    });
});
