/// <reference types="cypress" />
import {standardUser} from "../fixtures/users";
import LoginPage from "../Pages/LoginPage";
import PLP from "../Pages/plp";
import Cart from "../Pages/cart";

describe("Add Product to Cart test", () => {
    beforeEach(() => {
        LoginPage.visit();
        LoginPage.fillUsername(standardUser.userName);
        LoginPage.fillPassword(standardUser.password);
        LoginPage.submit();
        cy.url().should("include", "inventory.html");
        PLP.addToCart("sauce-labs-backpack");
    });
    it("Check the counter near the cart", () => {
        cy.get('[data-test="remove-sauce-labs-backpack"]').should("have.text", "Remove");
        cy.get(".shopping_cart_badge").should("have.text", "1");
    });

    it("Open the cart and check the product", () => {
        PLP.openCart();
        cy.url().should("include", "cart.html");
        cy.get(".inventory_item_name").should("have.text", "Sauce Labs Backpack");
    });

    it("Remove product from the cart in the pdp", () => {
        PLP.removeFromCart("sauce-labs-backpack");
        cy.get(".shopping_cart_badge").should("not.exist");
    });

    it("Remove product from the cart in the cart page", () => {
        PLP.openCart();
        cy.url().should("include", "cart.html");
        Cart.removeProductFromCart("sauce-labs-backpack");
        cy.get(".inventory_item_name").should("not.exist");
    });
});
