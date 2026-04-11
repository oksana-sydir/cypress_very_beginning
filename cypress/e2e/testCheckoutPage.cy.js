///<reference types="cypress" />
import {standardUser} from "../fixtures/users";
import LoginPage from "../pages/loginPage";
import ProductListingPage from "../pages/productListingPage";
import CartPage from "../pages/cartPage";
import CheckoutPage from "../pages/checkoutPage";
import {firstNameIsRequired, lastNameIsRequired, postalCodeIsRequired} from "../fixtures/errorMessages.json";

describe("Test checkout", () => {
    beforeEach(() => {
        LoginPage.visit();
        LoginPage.fillUsernameField(standardUser.userName);
        LoginPage.fillPasswordField(standardUser.password);
        LoginPage.submit();
        ProductListingPage.verifyProductListingPage();
        ProductListingPage.addToCart("sauce-labs-backpack");
        ProductListingPage.openCart();
        CartPage.verifyCartIsOpened();
        CartPage.proceedToCheckout();
    });

    it("Proceed to the checkout first step", () => {
        CheckoutPage.verifyStepOne();
    });

    it("Try to proceed to the checkout second step with empty all fields", () => {
        CheckoutPage.continueToOverview();
        CheckoutPage.verifyShippingValidation(firstNameIsRequired);
    });

    it("Try to proceed to the checkout second step with empty last name and postal code", () => {
        CheckoutPage.fillFirstNameField(standardUser.userName);
        CheckoutPage.continueToOverview();
        CheckoutPage.verifyShippingValidation(lastNameIsRequired);
    });

    it("Try to proceed to the checkout second step with empty first name and postal code", () => {
        CheckoutPage.fillLastNameField(standardUser.lastName);
        CheckoutPage.continueToOverview();
        CheckoutPage.verifyShippingValidation(firstNameIsRequired);
    });

    it("Try to proceed to the checkout second step with empty first name and last name", () => {
        CheckoutPage.fillPostalCodeField("12345");
        CheckoutPage.continueToOverview();
        CheckoutPage.verifyShippingValidation(firstNameIsRequired);
    });

    it("Try to proceed to the checkout second step with empty postal code", () => {
        CheckoutPage.fillFirstNameField(standardUser.userName);
        CheckoutPage.fillLastNameField(standardUser.lastName);
        CheckoutPage.continueToOverview();
        CheckoutPage.verifyShippingValidation(postalCodeIsRequired);
    });

    it("Proceed to the checkout second step with valid data", () => {
        CheckoutPage.fillFirstNameField(standardUser.userName);
        CheckoutPage.fillLastNameField(standardUser.lastName);
        CheckoutPage.fillPostalCodeField("12345");
        CheckoutPage.continueToOverview();
        CheckoutPage.verifyStepTwo();
    });

    it("Cancel checkout first step and return to the cart", () => {
        CheckoutPage.cancelCheckout();
        CartPage.verifyCartIsOpened();
    });

    it("Cancel checkout second step and return to the PLP", () => {
        CheckoutPage.fillFirstNameField(standardUser.userName);
        CheckoutPage.fillLastNameField(standardUser.lastName);
        CheckoutPage.fillPostalCodeField("12345");
        CheckoutPage.continueToOverview();
        CheckoutPage.verifyStepTwo();
        CheckoutPage.cancelCheckout();
        ProductListingPage.verifyProductListingPage();
    });

    it("Finish checkout", () => {
        CheckoutPage.fillFirstNameField(standardUser.userName);
        CheckoutPage.fillLastNameField(standardUser.lastName);
        CheckoutPage.fillPostalCodeField("12345");
        CheckoutPage.continueToOverview();
        CheckoutPage.verifyStepTwo();
        CheckoutPage.finishCheckout();
        CheckoutPage.verifyCheckoutIsFinished();
    });
});
