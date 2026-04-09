///<reference types="cypress" />

class PLP {
    addToCart(productName) {
        cy.get(`[data-test="add-to-cart-${productName}"]`).click();
    }

    openCart() {
        cy.get(".shopping_cart_link").click();
    }

    openProductDetails(productName) {
        cy.get(`.inventory_item_name`).contains(productName).click();
    }

    removeFromCart(productName) {
        cy.get(`[data-test="remove-${productName}"]`).click();
    }

    filterBy(filterName) {
        cy.get(".product_sort_container").select(filterName);
    }

    openBurgerMenu() {
        cy.get("button#react-burger-menu-btn").click();
    }

    logout() {
        this.openBurgerMenu();
        cy.get("#logout_sidebar_link").click();
    }

    openAboutPage() {
        this.openBurgerMenu();
        cy.get('#about_sidebar_link').click();
    }
}

export default new PLP();
