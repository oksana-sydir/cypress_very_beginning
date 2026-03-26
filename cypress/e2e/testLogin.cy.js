// import { describe } from "mocha";
// const { before } = require("mocha");

// describe("My First Test", () => {
//   it("Search field should be visible for Google.com", () => {
//     cy.visit("https://www.google.com/")
//     cy.get('textarea[name="q"]').should("be.visible")
//     cy.get('textarea[name="q"]').type("Cypress Testing{enter}", { force: true })
//   });
// });
import {standardUser, lockedOutUser} from "../fixtures/users";

describe("Test login", () => {
    beforeEach(() => {
        cy.visit("/");
    });
    it("Login with valid credentials", () => {
        cy.get("input#user-name").type(standardUser.username);
        cy.get("input#password").type(standardUser.password);
        cy.get("input#login-button").click();
        cy.url().should("include", "inventory.html");
        cy.get("span.title").should("have.text", "Products");
    });

    it("Try to login with typed spaces to login and password", () => {
        cy.get("input#user-name").type(" ");
        cy.get("input#password").type(" ");
        cy.get("input#login-button").click();
        cy.get("input#user-name + svg[data-icon='times-circle']").should("be.visible");
        cy.get("input#password + svg[data-icon='times-circle']").should("be.visible");
        cy.get("h3[data-test='error']").should(
            "have.text",
            "Epic sadface: Username and password do not match any user in this service"
        );
    });

    it("Try to login with empty login and password", () => {
        cy.get("input#login-button").click();
        cy.get("input#user-name + svg[data-icon='times-circle']").should("be.visible");
        cy.get("input#password + svg[data-icon='times-circle']").should("be.visible");
        cy.get("h3[data-test='error']").should("have.text", "Epic sadface: Username is required");
    });

    it("Try to login with empty password", () => {
        cy.get("input#user-name").type("pampam");
        cy.get("input#login-button").click();
        cy.get("input#user-name + svg[data-icon='times-circle']").should("be.visible");
        cy.get("input#password + svg[data-icon='times-circle']").should("be.visible");
        cy.get("h3[data-test='error']").should("have.text", "Epic sadface: Password is required");
    });

    it("Try to login with empty username", () => {
        cy.get("input#password").type("pampam");
        cy.get("input#login-button").click();
        cy.get("input#user-name + svg[data-icon='times-circle']").should("be.visible");
        cy.get("input#password + svg[data-icon='times-circle']").should("be.visible");
        cy.get("h3[data-test='error']").should("have.text", "Epic sadface: Username is required");
    });

    it("Try to login with valid login and invalid password", () => {
        cy.get("input#user-name").type(standardUser.username);
        cy.get("input#password").type(standardUser.password + "1");
        cy.get("input#login-button").click();
        cy.get("input#user-name + svg[data-icon='times-circle']").should("be.visible");
        cy.get("input#password + svg[data-icon='times-circle']").should("be.visible");
        cy.get("h3[data-test='error']").should(
            "have.text",
            "Epic sadface: Username and password do not match any user in this service"
        );
    });

    it("Try to login with invalid login and valid password", () => {
        cy.get("input#user-name").type(standardUser.username + "qw");
        cy.get("input#password").type(standardUser.password);
        cy.get("input#login-button").click();
        cy.get("input#user-name + svg[data-icon='times-circle']").should("be.visible");
        cy.get("input#password + svg[data-icon='times-circle']").should("be.visible");
        cy.get("h3[data-test='error']").should(
            "have.text",
            "Epic sadface: Username and password do not match any user in this service"
        );
    });

    it("Try to login with locked user", () => {
        cy.get("input#user-name").type(lockedOutUser.username);
        cy.get("input#password").type(lockedOutUser.password);
        cy.get("input#login-button").click();
        cy.get("input#user-name + svg[data-icon='times-circle']").should("be.visible");
        cy.get("input#password + svg[data-icon='times-circle']").should("be.visible");
        cy.get("h3[data-test='error']").should("have.text", "Epic sadface: Sorry, this user has been locked out.");
    });

    it("Try to login with locked user", () => {
        cy.get("input#user-name").type(lockedOutUser.username);
        cy.get("input#password").type(lockedOutUser.password);
        cy.get("input#login-button").click();
        cy.get("input#user-name + svg[data-icon='times-circle']").should("be.visible");
        cy.get("input#password + svg[data-icon='times-circle']").should("be.visible");
        cy.get("h3[data-test='error']").should("have.text", "Epic sadface: Sorry, this user has been locked out.");
    });
});
