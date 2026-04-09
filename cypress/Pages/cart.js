///<reference types="cypress" />

class Cart {
    checkProductInCart(productName) {
        cy.get(".inventory_item_name").should("have.text", productName);
    }

    removeProductFromCart(productName) {
        cy.get(`[data-test="remove-${productName}"]`).click();
    }

    continueShopping() {
        cy.get("button#continue-shopping").click();
    }

    proceedToCheckout() {
        cy.get("button#checkout").click();
    }
}

export default new Cart();
