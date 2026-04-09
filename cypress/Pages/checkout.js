///<reference types="cypress" />

class Checkout {
    fillFirstName(firstName) {
        cy.get("input[name='firstName']").type(firstName);
    }

    fillLastName(lastName) {
        cy.get("input[name='lastName']").type(lastName);
    }

    fillPostalCode(postalCode) {
        cy.get("input[name='postalCode']").type(postalCode);
    }

    cancelCheckout() {
        cy.get("button#cancel").click();
    }

    continueToOverview() {
        cy.get("input#continue").click();
    }

    finishCheckout() {
        cy.get("button#finish").click();
    }
}

export default new Checkout();
