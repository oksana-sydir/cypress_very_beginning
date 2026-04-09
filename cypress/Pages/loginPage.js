///<reference types="cypress" />

class LoginPage {
    visit() {
        cy.visit("/");
    }

    fillUsername(username) {
        cy.get("input[name='user-name']").type(username);
    }

    fillPassword(password) {
        cy.get("input[name='password']").type(password);
    }

    submit() {
        cy.get("input#login-button").click();
    }
}

export default new LoginPage();
