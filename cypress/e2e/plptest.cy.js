//const { describe } = require("mocha");
//import {describe} from "mocha";
import {standardUser} from "../fixtures/users";

describe("PDP test", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.get("input[name='user-name']").type(standardUser.username);
        cy.get("input[name='password']").type(standardUser.password);
        cy.get("input[type='submit']").click();
    });

    it("Sort by Price (low to high)", () => {
        cy.get('select[data-test="product-sort-container"]').select("Price (low to high)");
        cy.get(
            ':nth-child(1) > [data-test="inventory-item-description"] > .pricebar > [data-test="inventory-item-price"]'
        ).should("have.text", "$7.99");
        cy.get(
            ':nth-child(6) > [data-test="inventory-item-description"] > .pricebar > [data-test="inventory-item-price"]'
        ).should("have.text", "$49.99");
    });

    it("Sort by Price (high to low)", () => {
        cy.get('select[data-test="product-sort-container"]').select("Price (high to low)");
        cy.get(
            ':nth-child(1) > [data-test="inventory-item-description"] > .pricebar > [data-test="inventory-item-price"]'
        ).should("have.text", "$49.99");
        cy.get(
            ':nth-child(6) > [data-test="inventory-item-description"] > .pricebar > [data-test="inventory-item-price"]'
        ).should("have.text", "$7.99");
    });

    it("Sort by Name (A to Z)", () => {
        cy.get('select[data-test="product-sort-container"]').select("za");
        cy.get(
            ':nth-child(1)>[data-test="inventory-item-description"]> .inventory_item_label [data-test="inventory-item-name"]'
        ).should("have.text", "Test.allTheThings() T-Shirt (Red)");
    });

    it("Open the burger menu", () => {
        cy.get("#react-burger-menu-btn").click();
        cy.get("#inventory_sidebar_link").should("be.visible");
        cy.get("#about_sidebar_link").should("be.visible");
        cy.get("#logout_sidebar_link").should("be.visible");
        cy.get("#reset_sidebar_link").should("be.visible");
    });

    it("Open the About page", () => {
        cy.get("#react-burger-menu-btn").click();
        cy.get("#about_sidebar_link").click();
        cy.url().should("include", "saucelabs.com/");
        cy.origin("https://saucelabs.com", () => {
            cy.get("h1").should("have.text", "The World's Only Full-Lifecycle AI-Quality Platform");
        });
    });
    it("Check product details", () => {
        cy.get('[data-test="inventory-item-name"]').first().click();
        cy.get(".inventory_details_name").should("have.text", "Sauce Labs Backpack");
        cy.get(".inventory_details_price").should("have.text", "$29.99");
    });
});
