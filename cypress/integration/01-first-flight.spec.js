/// <reference types="cypress" />

describe('Create a New Item', () => {
  beforeEach((() => {
    cy.visit('/jetsetter')
  }))
  
  it('should have a form', () => {
    cy.get('form')
      // absence of FINDING an element on the page is faliure
      // in this case, .should() is not required
      // .should('exist')
  })

  it('should have the words "Add item"', () => {
    cy.contains(/Add item/i);
  })

  it('should put stuff in an input field', () => {
    cy.get('[data-test="new-item-input"]').type('Hello world', { delay: 100 })
  })
});
