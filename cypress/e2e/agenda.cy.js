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

  cy.contains('button', /Adicionar|Cadastrar|Salvar/i).click()
}

const encontrarContainerContato = (nome) =>
  cy.get('body').then(($body) => {
    const $candidatos = $body
      .find('li, tr, div, section, article')
      .filter((_, el) => el.textContent && el.textContent.includes(nome))
    return cy.wrap($candidatos.first())
  })

const clicarBotaoContatoPorTexto = (nome, texto) => {
  encontrarContainerContato(nome).within(() => {
    cy.contains('button', texto).click({ force: true })
  })
}

describe('Agenda de contatos', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('deve incluir, editar e remover contatos', () => {
    const sufixo = Date.now()
    const contatoEditar = `Contato Editar ${sufixo}`
    const contatoRemover = `Contato Remover ${sufixo}`
    const contatoEditado = `Contato Editado ${sufixo}`

    criarContato(contatoEditar, 'editar@teste.com', '11911112222')
    criarContato(contatoRemover, 'remover@teste.com', '11933334444')

    cy.contains(contatoEditar).should('exist')
    cy.contains(contatoRemover).should('exist')

    clicarBotaoContatoPorTexto(contatoEditar, /EDITAR/i)
    cy.get('input[placeholder*="Nome"], input[name="nome"], input#nome')
      .first()
      .clear()
      .type(contatoEditado)
    cy.get('input[placeholder*="E-mail"], input[placeholder*="Email"], input[name="email"], input#email')
      .first()
      .clear()
      .type('editado@teste.com')
    cy.get('input[placeholder*="Telefone"], input[name="telefone"], input#telefone')
      .first()
      .clear()
      .type('11911112222')
    cy.contains('button', /ADICIONAR|Salvar|Atualizar/i).click()
    cy.contains(contatoEditado).should('exist')

    cy.intercept('DELETE', '**/api/contatos*').as('deleteContato')
    cy.on('window:confirm', () => true)
    clicarBotaoContatoPorTexto(contatoRemover, /DELETAR|Excluir|Apagar/i)
    cy.wait('@deleteContato')
    cy.reload()
    cy.contains(contatoRemover, { timeout: 10000 }).should('not.exist')
  })
})
