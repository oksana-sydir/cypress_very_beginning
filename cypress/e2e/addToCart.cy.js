import {standardUser} from "../fixtures/users";

describe("Product details test", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.get("input[name='user-name']").type(standardUser.username);
        cy.get("input[name='password']").type(standardUser.password);
        cy.get("input[type='submit']").click();
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    });
    it("Check the counter near the cart", () => {
        cy.get('[data-test="remove-sauce-labs-backpack"]').should("have.text", "Remove");
        cy.get(".shopping_cart_badge").should("have.text", "1");
    });

    it("Open the cart and check the product", () => {
        cy.get(".shopping_cart_link").click();
        cy.url().should("include", "cart.html");
        cy.get(".inventory_item_name").should("have.text", "Sauce Labs Backpack");
    });

    it("Remove product from the cart in the pdp", () => {
        cy.get('[data-test="remove-sauce-labs-backpack"]').click();
        cy.get(".shopping_cart_badge").should("not.exist");
    });

    it("Remove product from the cart in the cart page", () => {
        cy.get(".shopping_cart_link").click();
        cy.url().should("include", "cart.html");
        cy.get('[data-test="remove-sauce-labs-backpack"]').click();
        cy.get(".inventory_item_name").should("not.exist");
    });
});
