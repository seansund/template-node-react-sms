/// <reference types="Cypress" />

describe("Counter Page", () => {
  context("Given the user is on the counter page", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get("[data-testid=count]").as("count");
    });

    it("should have its counter at 0", () => {
      cy.get("@count").should("have.text", "0");
    });

    context("when they increment counter", () => {
      beforeEach(() => {
        cy.get("[data-testid=increment]").click();
      });

      it("should have its count at 1", () => {
        cy.get("@count").should("have.text", "1");
      });
    });

    context("when they decrement counter", () => {
      beforeEach(() => {
        cy.get("[data-testid=decrement]").click();
      });

      it("should have its count at -1", () => {
        cy.get("@count").should("have.text", "-1");
      });
    });

    context("when they reset counter from a non-default state", () => {
      beforeEach(() => {
        cy.get("[data-testid=decrement]").click(); // Could be anything that changes default state.
        cy.get("[data-testid=reset]").click();
      });

      it("should have its count at 0", () => {
        cy.get("@count").should("have.text", "0");
      });
    });

    describe("API requests", () => {
      beforeEach(() => {
        cy.server({ force404: true });
      });

      describe("with mocked server", () => {
        context("when they randomize the counter", () => {
          const expected = "100";

          beforeEach(() => {
            cy.randomize(expected);
          });

          it("should have its count set to the random number", () => {
            cy.get("@count").should("have.text", expected);
          });
        });
      });

      if (Cypress.env("E2E")) {
        describe("with real server", () => {
          context("when they randomize the counter", () => {
            let expected;

            beforeEach(() => {
              cy.randomize().then(result => (expected = result));
            });

            it("should have its count set to the random number", () => {
              cy.get("@count").should("have.text", expected);
            });
          });
        });
      }
    });
  });
});
