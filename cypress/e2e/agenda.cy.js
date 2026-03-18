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

    cy.contains(nome)
      .parentsUntil('body')
      .parent()
      .within(() => {
        cy.contains('button, a', /Editar|Alterar/i).click({ force: true })
      })

    cy.get('input[placeholder*="Nome"], input[name="nome"], input#nome').first().clear().type('Contato Editado')
    cy.contains('button', /Salvar|Atualizar|Confirmar/i).click({ force: true })

    cy.contains('Contato Editado').should('exist')
  })

  it('deve remover um contato', () => {
    const nome = 'Contato Remover'
    criarContato(nome, 'remover@teste.com', '11933334444')

    cy.contains(nome)
      .parentsUntil('body')
      .parent()
      .within(() => {
        cy.contains('button, a', /Remover|Excluir|Apagar/i).click({ force: true })
      })

    cy.contains(nome).should('not.exist')
  })
})
