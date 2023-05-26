import { mount } from "cypress/react";
import Login from "../src/page/Login";

describe("Login component", () => {
    beforeEach(() => {
        mount(<Login />);
    });

    it("renders without errors", () => {
        cy.get('input[placeholder="Email"]').should("exist");
        cy.get('input[placeholder="Password"]').should("exist");
        cy.contains("LOGIN").should("exist");
    });

    it("handles email change correctly", () => {
        cy.get('input[placeholder="Email"]').type("test@example.com").should("have.value", "test@example.com");
    });

    it("handles password change correctly", () => {
        cy.get('input[placeholder="Password"]').type("Test123!").should("have.value", "Test123!");
    });

    it('toggles password visibility on "SHOW" button click', () => {
        cy.contains("SHOW").click();
        cy.get('input[placeholder="Password"]').should("have.attr", "type", "text");

        cy.contains("SHOW").click();
        cy.get('input[placeholder="Password"]').should("have.attr", "type", "password");
    });

    it("handles form submission with valid credentials", () => {
        mount(<Login />);

        cy.get('input[placeholder="Email"]').type("test@example.com");
        cy.get('input[placeholder="Password"]').type("Test123!");
        cy.contains("LOGIN").click();
    });

    it("displays error message for invalid credentials", () => {
        mount(<Login />);
        cy.get('input[placeholder="Email"]').type("invalid@example.com");
        cy.get('input[placeholder="Password"]').type("InvalidPassword123!");
        cy.contains("LOGIN").click();
    });
});
