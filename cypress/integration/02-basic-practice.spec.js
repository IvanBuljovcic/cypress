/// <reference types="cypress" />

describe('Basic Practice', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');
  });

  describe('Adding a new item', () => {
    it('should put a new item on the page after clicking on "Add Item"', () => {
      cy.get('[data-test="new-item-input"]').type('Hello world');

      cy.get('[data-test="add-item"]').click();

      cy.contains('Hello world')
    });

    it('should put a new item in the "Unpacked Items" list', () => {
      cy.get('[data-test="new-item-input"]').type('Hello world');

      cy.get('[data-test="add-item"]').click();

      cy.get('[data-test="items-unpacked"]')
        .find('ul')
        .children()
        .last()
        .contains('Hello world')
    });

    it('should put a new item as the last item in the "Unpacked Items" list', () => {
      const item = 'Hello world';

      cy.get('[data-test="new-item-input"]').type(item);

      cy.get('form').submit();

      cy.get('[data-test="items-unpacked"]')
        .find('ul')
        .children()
        .last()
        .contains(item)
    });
  });

  describe('Filtering items', () => {
    it('should show items that match whatever is in the filter field', () => {
      cy.get('[data-test="filter-items"]').type('Deoderant');

      // cy.get('[data-test="items"]')
      //   .find('ul')
      //   .children()
      //   .contains(/deoderant/i);

      cy.get('[data-test="items"] li').each(($el) => {
        expect($el.text()).to.contain("Deoderant");
      })
    });

    it('should hide items that do not match whatever is in the filter field', () => {
      cy.get('[data-test="filter-items"]').type('deoderant');

      cy.contains(/tooth/i).should('not.exist');
    });
  });

  describe('Removing items', () => {
    describe('Remove all', () => {
      it('should remove all of the items', () => {
        cy.get('[data-test="remove-all"]').click();

        cy.get('[data-test="items"] li').should('not.exist');
      });
    });

    describe('Remove individual items', () => {
      it('should have a remove button on an item', () => {
        cy.get('[data-test="items"] li').first().find('[data-test="remove"]').should('exist');
      });

      it('should remove an item from the page', () => {
        cy.get('[data-test="items"] li').each(($item) => {
          cy.wrap($item).find('[data-test="remove"]').click();
          cy.wrap($item).should('not.exist');
        })
      });
    });
  });

  describe('Mark all as unpacked', () => {
    it('should empty out the "Packed" list', () => {
      cy.get('[data-test="mark-all-as-unpacked"]').click();

      cy.get('[data-test="items-packed"] li').should('not.exist');
    });

    it('should empty have all of the items in the "Unpacked" list', () => {
      cy.get('[data-test="items"] li')
        .its('length')
        .then((count) => {
          cy.get('[data-test="mark-all-as-unpacked"]').click();
          cy.get('[data-test="items-unpacked"] li').its('length').should('eq', count);
        })
    });
  });

  describe('Mark individual item as packed', () => {
    it('should move an individual item from "Unpacked" to "Packed"', () => {
      cy.get('[data-test="items-unpacked"] li').first().as('firstItem');

      cy.get('@firstItem').find('label').click();
      
      cy.get('[data-test="items-unpacked"] li').should('not.include.text', 'Tooth Brush');
      cy.get('[data-test="items-unpacked"] li').should('have.length', 3);
      cy.get('[data-test="items-packed"] li').should('have.length', 2);
    });
  });
});