/// <reference types="cypress" />
import {standardUser} from "../fixtures/users";
import LoginPage from "../Pages/LoginPage";
import PLP from "../Pages/plp";
import Cart from "../Pages/cart";
import Checkout from "../Pages/checkout";
import {firstNameIsRequired, lastNameIsRequired, postalCodeIsRequired} from "../fixtures/errorMessages.json";

describe("Test checkout", () => {
    beforeEach(() => {
        LoginPage.visit();
        LoginPage.fillUsername(standardUser.userName);
        LoginPage.fillPassword(standardUser.password);
        LoginPage.submit();
        cy.url().should("include", "inventory.html");
        cy.get("span.title").should("have.text", "Products");
        PLP.addToCart("sauce-labs-backpack");
        PLP.openCart();
        cy.url().should("include", "cart.html");
        cy.get("span.title").should("have.text", "Your Cart");
        Cart.proceedToCheckout();
    });

    it("Proceed to the checkout first step", () => {
        
        cy.url().should("include", "checkout-step-one.html");
        cy.get("span.title").should("have.text", "Checkout: Your Information");
    });

    it("Try to proceed to the checkout second step with empty all fields", () => {
        
        Checkout.continueToOverview();
        cy.get("input#first-name + svg[data-icon='times-circle']").should("be.visible");
        cy.get("input#last-name + svg[data-icon='times-circle']").should("be.visible");
        cy.get("input#postal-code + svg[data-icon='times-circle']").should("be.visible");
        cy.get("h3[data-test='error']").should("have.text", firstNameIsRequired);
    });

    it("Try to proceed to the checkout second step with empty last name and postal code", () => {
      
        Checkout.fillFirstName(standardUser.userName);
        Checkout.continueToOverview();
        cy.get("input#last-name + svg[data-icon='times-circle']").should("be.visible");
        cy.get("input#postal-code + svg[data-icon='times-circle']").should("be.visible");
        cy.get("h3[data-test='error']").should("have.text", lastNameIsRequired);
    });

    it("Try to proceed to the checkout second step with empty first name and postal code", () => {
        
        Checkout.fillLastName(standardUser.lastName);
        Checkout.continueToOverview();
        cy.get("input#first-name + svg[data-icon='times-circle']").should("be.visible");
        cy.get("input#postal-code + svg[data-icon='times-circle']").should("be.visible");
        cy.get("h3[data-test='error']").should("have.text", firstNameIsRequired);
    });

    it("Try to proceed to the checkout second step with empty first name and last name", () => {
        
        Checkout.fillPostalCode("12345");
        Checkout.continueToOverview();
        cy.get("input#first-name + svg[data-icon='times-circle']").should("be.visible");
        cy.get("input#last-name + svg[data-icon='times-circle']").should("be.visible");
        cy.get("h3[data-test='error']").should("have.text", firstNameIsRequired);
    });
    it("Try to proceed to the checkout second step with empty postal code", () => {
        
        Checkout.fillFirstName(standardUser.userName);
        Checkout.fillLastName(standardUser.lastName);
        Checkout.continueToOverview();
        cy.get("input#postal-code + svg[data-icon='times-circle']").should("be.visible");
        cy.get("h3[data-test='error']").should("have.text", postalCodeIsRequired);
    });

    it("Proceed to the checkout second step with valid data", () => {
        
        Checkout.fillFirstName(standardUser.userName);
        Checkout.fillLastName(standardUser.lastName);
        Checkout.fillPostalCode("12345");
        Checkout.continueToOverview();
        cy.url().should("include", "checkout-step-two.html");
        cy.get("span.title").should("have.text", "Checkout: Overview");
    });

    it("Cancel checkout first step and return to the cart", () => {
        
        Checkout.cancelCheckout();
        cy.url().should("include", "cart.html");
        cy.get("span.title").should("have.text", "Your Cart");
    });

    it("Cancel checkout second step and return to the cart", () => {
       
        Checkout.fillFirstName(standardUser.userName);
        Checkout.fillLastName(standardUser.lastName);
        Checkout.fillPostalCode("12345");
        Checkout.continueToOverview();
        cy.url().should("include", "checkout-step-two.html");
        cy.get("span.title").should("have.text", "Checkout: Overview");
        Checkout.cancelCheckout();
        cy.url().should("include", "inventory.html");
        cy.get("span.title").should("have.text", "Products");
    });

    it("Finish checkout", () => {
        
        Checkout.fillFirstName(standardUser.userName);
        Checkout.fillLastName(standardUser.lastName);
        Checkout.fillPostalCode("12345");
        Checkout.continueToOverview();
        cy.url().should("include", "checkout-step-two.html");
        cy.get("span.title").should("have.text", "Checkout: Overview");
        Checkout.finishCheckout();
        cy.url().should("include", "checkout-complete.html");
        cy.get("span.title").should("have.text", "Checkout: Complete!");
    });
});
