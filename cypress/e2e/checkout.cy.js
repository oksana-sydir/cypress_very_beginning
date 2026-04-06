import {standardUser} from "../fixtures/users";
import {firstNameIsRequired, lastNameIsRequired, postalCodeIsRequired} from "../fixtures/errorMessages";
//import {it} from "mocha";

describe("Test checkout", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.get("input#user-name").type(standardUser.username);
        cy.get("input#password").type(standardUser.password);
        cy.get("input#login-button").click();
        cy.url().should("include", "inventory.html");
        cy.get("span.title").should("have.text", "Products");
        cy.get("button#add-to-cart-sauce-labs-backpack").click();
        cy.get("a.shopping_cart_link").click();
        cy.url().should("include", "cart.html");
        cy.get("span.title").should("have.text", "Your Cart");
    });

    it("Proceed to the checkout first step", () => {
        cy.get("button#checkout").click();
        cy.url().should("include", "checkout-step-one.html");
        cy.get("span.title").should("have.text", "Checkout: Your Information");
    });

    it("Try to proceed to the checkout second step with empty all fields", () => {
        cy.get("button#checkout").click();
        cy.get("[data-test='continue']").click();
        cy.get("input#first-name + svg[data-icon='times-circle']").should("be.visible");
        cy.get("input#last-name + svg[data-icon='times-circle']").should("be.visible");
        cy.get("input#postal-code + svg[data-icon='times-circle']").should("be.visible");
        cy.get("h3[data-test='error']").should("have.text", firstNameIsRequired);
    });

    it("Try to proceed to the checkout second step with empty last name and postal code", () => {
        cy.get("button#checkout").click();
        cy.get("input#first-name").type("Pampam");
        cy.get("[data-test='continue']").click();
        cy.get("input#last-name + svg[data-icon='times-circle']").should("be.visible");
        cy.get("input#postal-code + svg[data-icon='times-circle']").should("be.visible");
        cy.get("h3[data-test='error']").should("have.text", lastNameIsRequired);
    });

    it("Try to proceed to the checkout second step with empty first name and postal code", () => {
        cy.get("button#checkout").click();
        cy.get("input#last-name").type("Pampam");
        cy.get("[data-test='continue']").click();
        cy.get("input#first-name + svg[data-icon='times-circle']").should("be.visible");
        cy.get("input#postal-code + svg[data-icon='times-circle']").should("be.visible");
        cy.get("h3[data-test='error']").should("have.text", firstNameIsRequired);
    });

    it("Try to proceed to the checkout second step with empty first name and last name", () => {
        cy.get("button#checkout").click();
        cy.get("input#postal-code").type("12345");
        cy.get("[data-test='continue']").click();
        cy.get("input#first-name + svg[data-icon='times-circle']").should("be.visible");
        cy.get("input#last-name + svg[data-icon='times-circle']").should("be.visible");
        cy.get("h3[data-test='error']").should("have.text", firstNameIsRequired);
    });
    it("Try to proceed to the checkout second step with empty postal code", () => {
        cy.get("button#checkout").click();
        cy.get("input#first-name").type("Pampam");
        cy.get("input#last-name").type("Pampam");
        cy.get("[data-test='continue']").click();
        cy.get("input#postal-code + svg[data-icon='times-circle']").should("be.visible");
        cy.get("h3[data-test='error']").should("have.text", postalCodeIsRequired);
    });

    it("Proceed to the checkout second step with valid data", () => {
        cy.get("button#checkout").click();
        cy.get("input#first-name").type("Pampam");
        cy.get("input#last-name").type("Pampam");
        cy.get("input#postal-code").type("12345");
        cy.get("[data-test='continue']").click();
        cy.url().should("include", "checkout-step-two.html");
        cy.get("span.title").should("have.text", "Checkout: Overview");
    });

    it("Cancel checkout first step and return to the cart", () => {
        cy.get("button#checkout").click();
        cy.get("button#cancel").click();
        cy.url().should("include", "cart.html");
        cy.get("span.title").should("have.text", "Your Cart");
    });

    it("Cancel checkout second step and return to the cart", () => {
        cy.get("button#checkout").click();
        cy.get("input#first-name").type("Pampam");
        cy.get("input#last-name").type("Pampam");
        cy.get("input#postal-code").type("12345");
        cy.get("[data-test='continue']").click();
        cy.url().should("include", "checkout-step-two.html");
        cy.get("span.title").should("have.text", "Checkout: Overview");
        cy.get("button#cancel").click();
        cy.url().should("include", "inventory.html");
        cy.get("span.title").should("have.text", "Products");
    });

    it("Finish checkout", () => {
        cy.get("button#checkout").click();
        cy.get("input#first-name").type("Pampam");
        cy.get("input#last-name").type("Pampam");
        cy.get("input#postal-code").type("12345");
        cy.get("[data-test='continue']").click();
        cy.url().should("include", "checkout-step-two.html");
        cy.get("span.title").should("have.text", "Checkout: Overview");
        cy.get("button#finish").click();
        cy.url().should("include", "checkout-complete.html");
        cy.get("span.title").should("have.text", "Checkout: Complete!");
    });
});
