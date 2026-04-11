///<reference types="cypress" />
import {standardUser} from "../fixtures/users";
import LoginPage from "../pages/loginPage";
import ProductListingPage from "../pages/productListingPage";
import CartPage from "../pages/cartPage";
import cartPage from "../pages/cartPage";

describe("Add Product to Cart test", () => {
    beforeEach(() => {
        LoginPage.visit();
        LoginPage.fillUsernameField(standardUser.userName);
        LoginPage.fillPasswordField(standardUser.password);
        LoginPage.submit();
        ProductListingPage.verifyProductListingPage();
        ProductListingPage.addToCart("sauce-labs-backpack");
    });

    it("Check the counter near the cart", () => {
        CartPage.verifyCounterAfterAddingProduct("sauce-labs-backpack", 1)
    });

    it("Open the cart and check the product", () => {
        ProductListingPage.openCart();
        CartPage.verifyCartIsOpened();
        CartPage.verifyProductInCart("Sauce Labs Backpack");
    });

    it("Remove product from the cart in the pdp", () => {
        ProductListingPage.removeFromCart("sauce-labs-backpack");
        CartPage.verifyCounterAfterRemovingProduct();
    });

    it("Remove product from the cart in the cart page", () => {
        ProductListingPage.openCart();
        cartPage.verifyCartIsOpened();
        CartPage.removeProductFromCart("sauce-labs-backpack");
        CartPage.verifyCounterAfterRemovingProduct();
    });
});
