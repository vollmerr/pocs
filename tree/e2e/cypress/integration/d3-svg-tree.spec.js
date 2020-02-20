/// <reference types="cypress" />

let card;
let cardSelector = '#id-2';
context('d3 svg tree', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/d3-svg')
        cy.fixture('data').then((data) => {
            card = data.byId['id-2'];
        });
    });

    context('card', () => {
        it('renders', () => {
            cy.get(cardSelector);
        });

        it('renders a container', () => {
            cy.get(cardSelector).find('rect');
        });

        it('renders a title', () => {
            cy.get(cardSelector).contains(card.title);
        });
        
        // it('renders a description', () => {
        //     cy.get(cardSelector).find();
        // });

        // it('renders a image', () => {
        //     cy.get(cardSelector).find();
        // });
    });
});
