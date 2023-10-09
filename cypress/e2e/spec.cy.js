describe('template spec', () => {
  it('passes', () => {

    //sum
    cy.visit('https://suprahit.github.io/Calculator/')
    cy.get('.buttons-container > :nth-child(10)').click()
    cy.get('.display').should('have.text', '5')
    cy.get(':nth-child(12)').click()
    cy.get('.buttons-container > :nth-child(9)').click()
    cy.get('.display').should('have.text', '4')
    cy.get(':nth-child(19)').click()
    cy.get('.display').should('have.text', '9')

    //clear AC
    cy.get('.buttons-container > :nth-child(1)').click()
    cy.get('.display').should('have.text', '0')

  })
})