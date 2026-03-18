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

const encontrarBotoesContato = (nome) =>
  cy.get('body').then(($body) => {
    const $botoes = $body.find('button, a, [role="button"]').filter((_, el) => {
      const container = el.closest('li, tr, div, section, article')
      if (!container) return false
      return container.textContent && container.textContent.includes(nome)
    })

    if ($botoes.length) {
      return cy.wrap($botoes)
    }

    return cy.wrap($body.find('button, a, [role="button"]'))
  })

const clicarBotaoContato = (nome, indice) => {
  encontrarBotoesContato(nome).then(($botoes) => {
    cy.wrap($botoes.eq(indice)).click({ force: true })
  })
}

const salvarEdicao = () => {
  cy.get('form').first().within(() => {
    cy.get('button').first().click({ force: true })
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

    clicarBotaoContato(nome, 0)

    cy.get('input[placeholder*="Nome"], input[name="nome"], input#nome').first().clear().type('Contato Editado')

    salvarEdicao()

    cy.contains('Contato Editado').should('exist')
  })

  it('deve remover um contato', () => {
    const nome = 'Contato Remover'
    criarContato(nome, 'remover@teste.com', '11933334444')

    cy.on('window:confirm', () => true)

    clicarBotaoContato(nome, 1)

    cy.contains(nome, { timeout: 8000 }).should('not.exist')
  })
})
