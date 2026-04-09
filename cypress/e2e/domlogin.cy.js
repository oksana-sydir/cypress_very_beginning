///<reference types="cypress" />
import {standardUser, lockedOutUser} from "../fixtures/users";
import {
    passwordIsRequired,
    usernameIsRequired,
    invalidUsernameAndPassword,
    lockedOutUserError,
} from "../fixtures/errorMessages.json";
import LoginPage from "../Pages/LoginPage";

describe("Test login", () => {
   beforeEach(() => {
        LoginPage.visit();
    });
    it("Login with valid credentials", () => {
        LoginPage.fillUsername(standardUser.userName);
        LoginPage.fillPassword(standardUser.password);
        LoginPage.submit();
        cy.screenshot();
        cy.url().should("include", "inventory.html");
        cy.get("span.title").should("have.text", "Products");
    });

    it("Try to login with typed spaces to login and password", () => {
        LoginPage.fillUsername(" ");
        LoginPage.fillPassword(" ");
        LoginPage.submit();
        cy.get("input#user-name + svg[data-icon='times-circle']").should("be.visible");
        cy.get("input#password + svg[data-icon='times-circle']").should("be.visible");
        cy.get("h3[data-test='error']").should("have.text", invalidUsernameAndPassword);
    });

    it("Try to login with empty login and password", () => {
        LoginPage.submit();
        cy.get("input#user-name + svg[data-icon='times-circle']").should("be.visible");
        cy.get("input#password + svg[data-icon='times-circle']").should("be.visible");
        cy.get("h3[data-test='error']").should("have.text", usernameIsRequired);
    });

    it("Try to login with empty password", () => {
        LoginPage.fillUsername(standardUser.userName);
        LoginPage.submit();
        cy.get("input#user-name + svg[data-icon='times-circle']").should("be.visible");
        cy.get("input#password + svg[data-icon='times-circle']").should("be.visible");
        cy.get("h3[data-test='error']").should("have.text", passwordIsRequired);
    });

    it("Try to login with empty username", () => {
        LoginPage.fillPassword(standardUser.password);
        LoginPage.submit();
        cy.get("input#user-name + svg[data-icon='times-circle']").should("be.visible");
        cy.get("input#password + svg[data-icon='times-circle']").should("be.visible");
        cy.get("h3[data-test='error']").should("have.text", usernameIsRequired);
    });

    it("Try to login with valid login and invalid password", () => {
        LoginPage.fillUsername(standardUser.userName);
        LoginPage.fillPassword(standardUser.password + "1");
        LoginPage.submit();
        cy.get("input#user-name + svg[data-icon='times-circle']").should("be.visible");
        cy.get("input#password + svg[data-icon='times-circle']").should("be.visible");
        cy.get("h3[data-test='error']").should("have.text", invalidUsernameAndPassword);
    });

    it("Try to login with invalid login and valid password", () => {
        LoginPage.fillUsername(standardUser.userName + "qw");
        LoginPage.fillPassword(standardUser.password);
        LoginPage.submit();
        cy.get("input#user-name + svg[data-icon='times-circle']").should("be.visible");
        cy.get("input#password + svg[data-icon='times-circle']").should("be.visible");
        cy.get("h3[data-test='error']").should("have.text", invalidUsernameAndPassword);
    });

    it("Try to login with locked user", () => {
        LoginPage.fillUsername(lockedOutUser.userName);
        LoginPage.fillPassword(lockedOutUser.password);
        LoginPage.submit();
        cy.get("input#user-name + svg[data-icon='times-circle']").should("be.visible");
        cy.get("input#password + svg[data-icon='times-circle']").should("be.visible");
        cy.get("h3[data-test='error']").should("have.text", lockedOutUserError);
    });
});

