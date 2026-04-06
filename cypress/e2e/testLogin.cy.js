import {standardUser, lockedOutUser} from "../fixtures/users";
import {
    passwordIsRequired,
    usernameIsRequired,
    invalidUsernameAndPassword,
    lockedOutUserError,
} from "../fixtures/errorMessages.json";
describe("Test login", () => {
    beforeEach(() => {
        cy.visit("/");
    });
    it("Login with valid credentials", () => {
        cy.get("input#user-name").type(standardUser.username);
        cy.get("input#password").type(standardUser.password);
        cy.get("input#login-button").click();
        cy.screenshot();
        cy.url().should("include", "inventory.html");
        cy.get("span.title").should("have.text", "Products");
    });

    it("Try to login with typed spaces to login and password", () => {
        cy.get("input#user-name").type(" ");
        cy.get("input#password").type(" ");
        cy.get("input#login-button").click();
        cy.get("input#user-name + svg[data-icon='times-circle']").should("be.visible");
        cy.get("input#password + svg[data-icon='times-circle']").should("be.visible");
        cy.get("h3[data-test='error']").should("have.text", invalidUsernameAndPassword);
    });

    it("Try to login with empty login and password", () => {
        cy.get("input#login-button").click();
        cy.get("input#user-name + svg[data-icon='times-circle']").should("be.visible");
        cy.get("input#password + svg[data-icon='times-circle']").should("be.visible");
        cy.get("h3[data-test='error']").should("have.text", usernameIsRequired);
    });

    it("Try to login with empty password", () => {
        cy.get("input#user-name").type("pampam");
        cy.get("input#login-button").click();
        cy.get("input#user-name + svg[data-icon='times-circle']").should("be.visible");
        cy.get("input#password + svg[data-icon='times-circle']").should("be.visible");
        cy.get("h3[data-test='error']").should("have.text", passwordIsRequired);
    });

    it("Try to login with empty username", () => {
        cy.get("input#password").type("pampam");
        cy.get("input#login-button").click();
        cy.get("input#user-name + svg[data-icon='times-circle']").should("be.visible");
        cy.get("input#password + svg[data-icon='times-circle']").should("be.visible");
        cy.get("h3[data-test='error']").should("have.text", usernameIsRequired);
    });

    it("Try to login with valid login and invalid password", () => {
        cy.get("input#user-name").type(standardUser.username);
        cy.get("input#password").type(standardUser.password + "1");
        cy.get("input#login-button").click();
        cy.get("input#user-name + svg[data-icon='times-circle']").should("be.visible");
        cy.get("input#password + svg[data-icon='times-circle']").should("be.visible");
        cy.get("h3[data-test='error']").should("have.text", invalidUsernameAndPassword);
    });

    it("Try to login with invalid login and valid password", () => {
        cy.get("input#user-name").type(standardUser.username + "qw");
        cy.get("input#password").type(standardUser.password);
        cy.get("input#login-button").click();
        cy.get("input#user-name + svg[data-icon='times-circle']").should("be.visible");
        cy.get("input#password + svg[data-icon='times-circle']").should("be.visible");
        cy.get("h3[data-test='error']").should("have.text", invalidUsernameAndPassword);
    });

    it("Try to login with locked user", () => {
        cy.get("input#user-name").type(lockedOutUser.username);
        cy.get("input#password").type(lockedOutUser.password);
        cy.get("input#login-button").click();
        cy.get("input#user-name + svg[data-icon='times-circle']").should("be.visible");
        cy.get("input#password + svg[data-icon='times-circle']").should("be.visible");
        cy.get("h3[data-test='error']").should("have.text", lockedOutUserError);
    });
});
