import React from "react";
import { mount } from "cypress/react";
import { AppProvider } from "../src/App";
import UsersPage from "../src/page/Users";
import { usersMock } from "../src/utils/data";

describe("UsersPage component", () => {
    const users = usersMock;


    beforeEach(() => {
        mount(
            <AppProvider
                value={{
                    users: users,
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
                <UsersPage />
            </AppProvider>
        );
    });

    

    it("displays user table with correct columns", () => {
        const columns = ["organization", "Username", "Email", "Phone number", "Date joined", "Status"];
        cy.get("table tr")
            .first()
            .find("th")
            .each(($th, index) => {
                const column = columns[index];
                cy.wrap($th).should("contain", column.toUpperCase());
            });
    });

    it("displays user data correctly in the table", () => {
        cy.get("table tbody tr").each(($row, index) => {
            const user = users[index];
            cy.wrap($row).should("contain", user.orgName);
            cy.wrap($row).should("contain", user.userName);
            cy.wrap($row).should("contain", user.email);
            cy.wrap($row).should("contain", user.phoneNumber);
            cy.wrap($row).should("contain", user.createdAt);
            // cy.wrap($row).should("contain", status(user.education.loanRepayment));
        });
    });

    it("navigates  and next page of users", () => {
        cy.get("#next").click(); // Go to previous page
        cy.get("table tbody tr").should("have.length", 10);
        cy.get("table").contains("tr", users[11].userName)
        
    });

});
