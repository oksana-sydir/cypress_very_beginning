///<reference types="cypress" />

import {standardUser} from "../fixtures/users";
import LoginPage from "../pages/loginPage";
import ProductListingPage from "../pages/productListingPage";
import AboutPage from "../pages/aboutPage";
import ProductDetailsPage from "../pages/productDetailsPage";

describe("PDP test", () => {
    beforeEach(() => {
        LoginPage.visit();
        LoginPage.fillUsernameField(standardUser.userName);
        LoginPage.fillPasswordField(standardUser.password);
        LoginPage.submit();
    });

    it("Sort by Price (low to high)", () => {
        ProductListingPage.filterBy("Price (low to high)");
        ProductListingPage.verifyProductPrice(1, "$7.99");
        ProductListingPage.verifyProductPrice(6, "$49.99");
    });

    it("Sort by Price (high to low)", () => {
        ProductListingPage.filterBy("Price (high to low)");
        ProductListingPage.verifyProductPrice(1, "$49.99");
        ProductListingPage.verifyProductPrice(6, "$7.99");
    });

    it("Sort by Name (Z to A)", () => {
        ProductListingPage.filterBy("Name (Z to A)");
        ProductListingPage.verifyProductPrice(1, "$15.99");
    });

    it("Open the burger menu", () => {
        ProductListingPage.openBurgerMenu();
        ProductListingPage.verifyItemsInBurgerMenuAreVisible();
    });

    it("Open the About page", () => {
        ProductListingPage.openAboutPage();
        AboutPage.verifyAboutPage();
    });

    it("Check product details", () => {
        ProductListingPage.openProductDetails("Sauce Labs Backpack");
        ProductDetailsPage.verifyProductDetails("Sauce Labs Backpack", "$29.99");
    });
});
