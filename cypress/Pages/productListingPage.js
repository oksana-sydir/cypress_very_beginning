///<reference types="cypress" />

class ProductListingPage {
    // Getters for selectors
    get pageTitle() {
        return "span.title";
    }

    get addToCartButton() {
        return '[data-test="add-to-cart-';
    }

    get cartLink() {
        return ".shopping_cart_link";
    }

    get productNameLink() {
        return ".inventory_item_name";
    }

    get removeFromCartButton() {
        return '[data-test="remove-';
    }

    get sortContainer() {
        return ".product_sort_container";
    }

    get burgerMenuButton() {
        return "button#react-burger-menu-btn";
    }

    get priceOfFirstProduct() {
        return ':nth-child(1) > [data-test="inventory-item-description"] > .pricebar > [data-test="inventory-item-price"]';
    }

    get priceOfLastProduct() {
        return ':nth-child(6) > [data-test="inventory-item-description"] > .pricebar > [data-test="inventory-item-price"]';
    }

    get logoutLink() {
        return "#logout_sidebar_link";
    }

    get aboutLink() {
        return "#about_sidebar_link";
    }

    addToCart(productName) {
        cy.get(`${this.addToCartButton}${productName}"`).should("be.visible").click();
    }

    openCart() {
        cy.get(this.cartLink).should("be.visible").click();
    }

    openProductDetails(productName) {
        cy.get(this.productNameLink).contains(productName).should("be.visible").click();
    }

    removeFromCart(productName) {
        cy.get(`${this.removeFromCartButton}${productName}"]`).should("be.visible").click();
    }

    filterBy(filterName) {
        cy.get(this.sortContainer).should("be.visible").select(filterName);
    }

    openBurgerMenu() {
        cy.get(this.burgerMenuButton).should("be.visible").click();
    }

    verifyItemsInBurgerMenuAreVisible() {
        cy.get("#inventory_sidebar_link").should("be.visible");
        cy.get("#about_sidebar_link").should("be.visible");
        cy.get("#logout_sidebar_link").should("be.visible");
        cy.get("#reset_sidebar_link").should("be.visible");
    }

    logout() {
        this.openBurgerMenu();
        cy.get(this.logoutLink).should("be.visible").click();
    }

    openAboutPage() {
        this.openBurgerMenu();
        cy.get(this.aboutLink).should("be.visible").click();
    }

    verifyProductListingPage() {
        cy.url().should("include", "inventory.html");
        cy.get(this.pageTitle).should("have.text", "Products");
    }

    verifyProductPrice(productPosition, price) {
        if (productPosition === 1) {
            cy.get(this.priceOfFirstProduct).should("have.text", price);
        } else if (productPosition === 6) {
            cy.get(this.priceOfLastProduct).should("have.text", price);
        }
    }
}

export default new ProductListingPage();
