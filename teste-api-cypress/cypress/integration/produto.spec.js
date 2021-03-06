/// <reference types = "cypress" />

describe('Testes da Funcionalidade Produtos', () => {

    let token

    before(() => {
        cy.token('fulano@qa.com', 'teste').then(tkn =>{token = tkn})
    });
    
    it('Listar Produtos', () => {
        cy.request({
            method: 'GET',
            url: 'produtos'
        }).then((response) => {
            expect(response.body.produtos[1].nome).to.equal('Samsung 60 polegadas')
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('produtos')
            expect(response.duration).to.be.lessThan(15)
        })
    });

    it.only('Cadastrar Produto', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/produtos',
            body:{
                "nome": "Produto EBAC novo",
                "preco": 200,
                "descricao": "Produto novo",
                "quantidade": 100
              },
              headers: {authorization: token}
        }).then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')
        })
    });
});