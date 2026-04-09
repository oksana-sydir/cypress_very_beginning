///<reference types="cypress" />

import LoginPage from "../Pages/LoginPage";
import PLP from "../Pages/plp";
import {standardUser} from "../fixtures/users";

describe("PDP test", () => {
    beforeEach(() => {
        LoginPage.visit();
        LoginPage.fillUsername(standardUser.userName);
        LoginPage.fillPassword(standardUser.password);
        LoginPage.submit();
    });

    it("Sort by Price (low to high)", () => {
      PLP.filterBy("Price (low to high)");
        cy.get(
            ':nth-child(1) > [data-test="inventory-item-description"] > .pricebar > [data-test="inventory-item-price"]'
        ).should("have.text", "$7.99");
        cy.get(
            ':nth-child(6) > [data-test="inventory-item-description"] > .pricebar > [data-test="inventory-item-price"]'
        ).should("have.text", "$49.99");
    });

    it("Sort by Price (high to low)", () => {
        PLP.filterBy("Price (high to low)");
        cy.get(
            ':nth-child(1) > [data-test="inventory-item-description"] > .pricebar > [data-test="inventory-item-price"]'
        ).should("have.text", "$49.99");
        cy.get(
            ':nth-child(6) > [data-test="inventory-item-description"] > .pricebar > [data-test="inventory-item-price"]'
        ).should("have.text", "$7.99");
    });

    it("Sort by Name (Z to A)", () => {
        PLP.filterBy("Name (Z to A)");
        cy.get(
            ':nth-child(1)>[data-test="inventory-item-description"]> .inventory_item_label [data-test="inventory-item-name"]'
        ).should("have.text", "Test.allTheThings() T-Shirt (Red)");
    });

    it("Open the burger menu", () => {
        PLP.openBurgerMenu();
        cy.get("#inventory_sidebar_link").should("be.visible");
        cy.get("#about_sidebar_link").should("be.visible");
        cy.get("#logout_sidebar_link").should("be.visible");
        cy.get("#reset_sidebar_link").should("be.visible");
    });

    it("Open the About page", () => {
        PLP.openAboutPage();
        cy.url().should("include", "saucelabs.com/");
        cy.origin("https://saucelabs.com", () => {
            cy.get("h1").should("have.text", "The World's Only Full-Lifecycle AI-Quality Platform");
        });
    });
    it("Check product details", () => {
        PLP.openProductDetails("Sauce Labs Backpack");
        cy.get(".inventory_details_name").should("have.text", "Sauce Labs Backpack");
        cy.get(".inventory_details_price").should("have.text", "$29.99");
    });
});

