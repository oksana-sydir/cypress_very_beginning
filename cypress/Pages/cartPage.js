///<reference types="cypress" />

class CartPage {
    // Getters
    get productName() {
        return ".inventory_item_name";
    }

    get pageTitle() {
        return "span.title";
    }

    get removeButton() {
        return (productName) => `[data-test="remove-${productName}"]`;
    }

    get continueShoppingButton() {
        return "button#continue-shopping";
    }

    get checkoutButton() {
        return "button#checkout";
    }

    verifyCartIsOpened() {
        cy.url().should("include", "cart.html");
        cy.get(this.pageTitle).should("have.text", "Your Cart");
    }

    verifyProductInCart(productName) {
        cy.get(this.productName).should("be.visible").and("have.text", productName);
    }

    verifyCounterAfterAddingProduct(productName,expectedCount) {
       cy.get(`[data-test="remove-${productName}"]`).should("have.text", "Remove");
        cy.get(".shopping_cart_badge").should("have.text", expectedCount);
        }

    removeProductFromCart(productName) {
        cy.get(this.removeButton(productName)).should("be.visible").click();
    }

    verifyCounterAfterRemovingProduct() {
        cy.get(".shopping_cart_badge").should("not.exist");
    }

    continueShopping() {
        cy.get(this.continueShoppingButton).should("be.visible").click();
    }

    proceedToCheckout() {
        cy.get(this.checkoutButton).should("be.visible").click();
    }
}

export default new CartPage();
