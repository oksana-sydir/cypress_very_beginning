///<reference types="cypress" />
import {standardUser, lockedOutUser} from "../fixtures/users";
import {
    passwordIsRequired,
    usernameIsRequired,
    invalidUsernameAndPassword,
    lockedOutUserError,
} from "../fixtures/errorMessages.json";
import loginPage from "../pages/loginPage";
import productListingPage from "../pages/productListingPage";

describe("Test login", () => {
   beforeEach(() => {
        loginPage.visit();
    });
    
    it("Login with valid credentials", () => {
        loginPage.fillUsernameField(standardUser.userName);
        loginPage.fillPasswordField(standardUser.password);
        loginPage.submit();
        productListingPage.verifyProductListingPage();
        //cy.screenshot();
    
    });

    it("Try to login with typed spaces to login and password", () => {
        loginPage.fillUsernameField(" ");
        loginPage.fillPasswordField(" ");
        loginPage.submit();
        loginPage.verifyValidation(invalidUsernameAndPassword);
    });

    it("Try to login with empty login and password", () => {
        loginPage.submit();
        loginPage.verifyValidation(usernameIsRequired);
    });

    it("Try to login with empty password", () => {
        loginPage.fillUsernameField(standardUser.userName);
        loginPage.submit();
        loginPage.verifyValidation(passwordIsRequired);
    });

    it("Try to login with empty username", () => {
        loginPage.fillPasswordField(standardUser.password);
        loginPage.submit();
        loginPage.verifyValidation(usernameIsRequired);
    });

    it("Try to login with valid login and invalid password", () => {
        loginPage.fillUsernameField(standardUser.userName);
        loginPage.fillPasswordField(standardUser.password + "1");
        loginPage.submit();
        loginPage.verifyValidation(invalidUsernameAndPassword);
    });

    it("Try to login with invalid login and valid password", () => {
        loginPage.fillUsernameField(standardUser.userName + "qw");
        loginPage.fillPasswordField(standardUser.password);
        loginPage.submit();
        loginPage.verifyValidation(invalidUsernameAndPassword);
    });

    it("Try to login with locked user", () => {
        loginPage.fillUsernameField(lockedOutUser.userName);
        loginPage.fillPasswordField(lockedOutUser.password);
        loginPage.submit();
        loginPage.verifyValidation(lockedOutUserError);
    });
});

