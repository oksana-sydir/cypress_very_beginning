///<reference types="cypress" />

class LoginPage {
    // Getters for selectors
    get usernameField() {
        return "input[name='user-name']";
    }

    get passwordField() {
        return "input[name='password']";
    }

    get loginButton() {
        return "input#login-button";
    }

    get crossIconForNameField() {
        return cy.get(`input#user-name + svg[data-icon='times-circle']`);
    }

    get crossIconForPasswordField() {
        return cy.get(`input#password + svg[data-icon='times-circle']`);
    }

    get errorMessageDuringLogin() {
        return cy.get("h3[data-test='error']");
    }

    visit() {
        cy.visit("/");
    }

    fillUsernameField(username) {
        cy.get(this.usernameField).should("be.visible").clear().type(username);
    }

    fillPasswordField(password) {
        cy.get(this.passwordField).should("be.visible").clear().type(password);
    }

    submit() {
        cy.get(this.loginButton).should("be.visible").click();
    }

    verifyValidation(errorMessage) {
        this.crossIconForNameField.should("be.visible");
        this.crossIconForPasswordField.should("be.visible");
        this.errorMessageDuringLogin.should("have.text", errorMessage);
    }
}

export default new LoginPage();
