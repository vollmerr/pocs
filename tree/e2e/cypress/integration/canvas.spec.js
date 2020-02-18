/// <reference types="cypress" />

// POSITIONS BASED OFF data.js psooitions...

context('canvas', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    });

    it('gets the canvas...', () => {
        cy.get('canvas');
    });

    it('clicks on it...', () => {
        cy.get('canvas').click(600, 0);
    });
});
