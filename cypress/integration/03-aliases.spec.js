/// <reference types="cypress" />

describe('Aliases', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');

    cy.get('[data-test="filter-items"]').as('filterInput');
    cy.get('[data-test="items"]').as('allItems');

    cy.get('[data-test="items-unpacked"]').as('unpackedItems');
    cy.get('[data-test="items-packed"]').as('packedItems');
  });

  it('should filter items', () => {
    cy.get('@filterInput').type('iPhone');

    cy.get('@allItems').should('not.contain.text', 'Hoodie');
  });

  it.only('should move items from unpacked to packed', () => {
    cy.get('@unpackedItems').find('label').first().as('itemLabel');

    cy.get('@itemLabel').invoke('text').then((text) => {
      cy.get('@itemLabel').click();
      cy.get('@packedItems').contains(text);
    })
  });
});