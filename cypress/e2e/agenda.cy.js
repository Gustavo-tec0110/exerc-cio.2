const criarContato = (nome, email, telefone) => {
  cy.get('input[placeholder*="Nome"], input[name="nome"], input#nome').first().clear().type(nome)
  cy.get('input[placeholder*="E-mail"], input[placeholder*="Email"], input[name="email"], input#email')
    .first()
    .clear()
    .type(email)
  cy.get('input[placeholder*="Telefone"], input[name="telefone"], input#telefone')
    .first()
    .clear()
    .type(telefone)

  cy.contains('button', /Cadastrar|Adicionar|Salvar/i).click()
}

const acionarBotaoNaLinha = (nome, indiceFallback) => {
  cy.contains(nome)
    .closest('li, tr, div')
    .then(($linha) => {
      const $botoes = $linha.find('button, a, [role="button"]')
      if ($botoes.length > 0) {
        cy.wrap($botoes.eq(indiceFallback)).click({ force: true })
        return
      }

      cy.wrap($linha).click({ force: true })
    })
}

describe('Agenda de contatos', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('deve incluir um contato', () => {
    const nome = 'Contato Cypress'
    criarContato(nome, 'cypress@teste.com', '11999998888')

    cy.contains(nome).should('exist')
  })

  it('deve alterar um contato', () => {
    const nome = 'Contato Editar'
    criarContato(nome, 'editar@teste.com', '11911112222')

    acionarBotaoNaLinha(nome, 0)

    cy.get('input[placeholder*="Nome"], input[name="nome"], input#nome').first().clear().type('Contato Editado')
    cy.contains('button', /Salvar|Atualizar|Confirmar/i).click({ force: true })

    cy.contains('Contato Editado').should('exist')
  })

  it('deve remover um contato', () => {
    const nome = 'Contato Remover'
    criarContato(nome, 'remover@teste.com', '11933334444')

    acionarBotaoNaLinha(nome, 1)

    cy.contains(nome).should('not.exist')
  })
})
