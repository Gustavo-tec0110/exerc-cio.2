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

const clicarBotaoLinha = (nome, indice) => {
  cy.contains(nome).then(($el) => {
    const $parents = $el.parents()
    const $comBotoes = $parents.filter((_, node) =>
      node.querySelector && node.querySelector('button, a, [role="button"]')
    )

    if ($comBotoes.length) {
      cy.wrap($comBotoes.first())
        .find('button, a, [role="button"]')
        .eq(indice)
        .click({ force: true })
      return
    }

    cy.get('button, a, [role="button"]').eq(indice).click({ force: true })
  })
}

const clicarPorTextoOuFallback = (regex, fallback) => {
  cy.get('body').then(($body) => {
    const $alvo = $body.find('button, a').filter((_, el) => regex.test(el.textContent || ''))
    if ($alvo.length) {
      cy.wrap($alvo.first()).click({ force: true })
      return
    }
    fallback()
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

    clicarBotaoLinha(nome, 0)

    cy.get('input[placeholder*="Nome"], input[name="nome"], input#nome').first().clear().type('Contato Editado')

    clicarPorTextoOuFallback(/Salvar|Atualizar|Confirmar/i, () => {
      clicarBotaoLinha(nome, 0)
    })

    cy.contains('Contato Editado').should('exist')
  })

  it('deve remover um contato', () => {
    const nome = 'Contato Remover'
    criarContato(nome, 'remover@teste.com', '11933334444')

    cy.on('window:confirm', () => true)

    clicarBotaoLinha(nome, 1)

    cy.contains(nome, { timeout: 8000 }).should('not.exist')
  })
})
