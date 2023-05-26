import React from "react";

import { mount } from "cypress/react";
import { usersMock } from "../src/utils/data";
import { AppProvider } from "../src/App";
import UserProfile from "../src/page/UserProfile";
import UsersPage from "../src/page/Users";

describe("UserProfile component", () => {
    const user = usersMock[0];

    beforeEach(() => {
        mount(
            <AppProvider
                value={{
                    users: [],
                    user: user,
                    showSnackBar: () => {
                        /* */
                    },
                    closeSnackBar: () => {
                        /* */
                    },
                    handleUserChange: () => {
                        /* */
                    },
                    logout: () => {
                        /* */
                    },
                }}>
                <UserProfile />
            </AppProvider>
        );
    });
    it("displays user profile information", () => {
        cy.get('[data-testid="user-name"]').should("contain", `${user.profile.firstName} ${user.profile.lastName}`);
        cy.get('[data-testid="profile-image"]').should("have.attr", "src", user.profile.avatar);
        cy.get("body").contains("Personal Information");
        cy.get("body").contains("Education and Employment");
        cy.get("body").contains("Socials");
        cy.get("body").contains("Guarantor");
    });

    it("displays user's tier with star images", () => {
        cy.get('img[src="icons/star_filled.png"]').should("have.length", 1);
        cy.get('img[src="icons/star.png"]').should("have.length", 2);
    });

    it("displays user's account balance and bank details", () => {
        cy.get(".page-title").contains(`₦ ${user.accountBalance}`);
        cy.get('[data-testid="account-details"]').contains(`${user.accountNumber}/Providus Bank`);
    });

    it("allows switching between profile pages", () => {
        cy.contains("General Details").click();
        cy.contains("Documents").click();
        cy.contains("Bank Details").click();
        cy.contains("Loans").click();
        cy.contains("Savings").click();
        cy.contains("App and System").click();
    });
});
