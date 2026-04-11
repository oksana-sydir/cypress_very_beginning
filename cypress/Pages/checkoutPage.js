///<reference types="cypress" />

class CheckoutPage {
    // Getters for selectors
    get pageTitle() {
        return "span.title";
    }

    get stepOneUrl() {
        return "checkout-step-one.html";
    }

    get stepTwoUrl() {
        return "checkout-step-two.html";
    }
    
    get checkoutCompleteUrl() {
        return "checkout-complete.html";
    }

    get firstNameField() {
        return "input[name='firstName']";
    }

    get lastNameField() {
        return "input[name='lastName']";
    }

    get postalCodeField() {
        return "input[name='postalCode']";
    }

    get cancelButton() {
        return "button#cancel";
    }

    get continueButton() {
        return "input#continue";
    }

    get finishButton() {
        return "button#finish";
    }

    get crossIconForFirstNameField() {
        return "input#first-name + svg[data-icon='times-circle']";
    }

    get crossIconForLastNameField() {
        return "input#last-name + svg[data-icon='times-circle']";
    }

    get crossIconForPostalCodeField() {
        return "input#postal-code + svg[data-icon='times-circle']";
    }

    get errorMessage() {
        return "h3[data-test='error']";
    }

    verifyStepOne() {
        cy.url().should("include", this.stepOneUrl);
        cy.get(this.pageTitle).should("have.text", "Checkout: Your Information");
    }

    verifyStepTwo() {
        cy.url().should("include", this.stepTwoUrl);
        cy.get(this.pageTitle).should("have.text", "Checkout: Overview");
    }

    verifyCheckoutIsFinished() {
        cy.url().should("include", this.checkoutCompleteUrl);
        cy.get(this.pageTitle).should("have.text", "Checkout: Complete!");
    }

    fillFirstNameField(firstName) {
        cy.get(this.firstNameField).should("be.visible").clear().type(firstName);
    }

    fillLastNameField(lastName) {
        cy.get(this.lastNameField).should("be.visible").clear().type(lastName);
    }

    fillPostalCodeField(postalCode) {
        cy.get(this.postalCodeField).should("be.visible").clear().type(postalCode);
    }

    cancelCheckout() {
        cy.get(this.cancelButton).should("be.visible").click();
    }

    continueToOverview() {
        cy.get(this.continueButton).should("be.visible").click();
    }

    finishCheckout() {
        cy.get(this.finishButton).should("be.visible").click();
    }

    verifyShippingValidation(errorMessage) {
        cy.get(this.crossIconForFirstNameField).should("be.visible");
        cy.get(this.crossIconForLastNameField).should("be.visible");
        cy.get(this.crossIconForPostalCodeField).should("be.visible");
        cy.get(this.errorMessage).should("have.text", errorMessage);
    }
}

export default new CheckoutPage();
