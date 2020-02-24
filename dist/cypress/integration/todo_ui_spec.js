'use strict';

//Här skriver vi våra UI tester


//mocha syntax:
describe('UI test for To Do list', function () {

        it('Should add a todo item and then delete it', function () {

                cy.visit('http://localhost:8002/todolist');

                //söker efter innehåll på sidan
                cy.get('#inputfield').type('den nya todon');

                cy.get('#submitbutton').click();

                //cy.get('.delete').click({ multiple: true })
                cy.get('.delete').click(function () {
                        cy.get('.delete').first().click();
                });

                cy.url().should('include', '/todolist');
        });
});