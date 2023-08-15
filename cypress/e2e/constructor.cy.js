/* eslint-disable no-undef */

describe("products management works correctly", function () {
  before(function () {
    cy.visit("http://localhost:3000/");
  });

  beforeEach(() => {
    cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
    cy.intercept("POST", "api/orders", { fixture: "order.json" }).as(
      "postOrder"
    );

    window.localStorage.setItem(
      "accessToken",
      JSON.stringify("test-accessToken")
    );
    window.localStorage.setItem(
      "refreshToken",
      JSON.stringify("test-refreshToken")
    );
  });

  it("should open and close ingredient modal", () => {
    cy.get('[data-testid="ingr"]').as("ingredients");
    cy.get("@ingredients").each((ingredient) => {
      cy.get(ingredient).click();
      cy.get('[data-testid="modal"]').should("be.visible");
      cy.get("[data-testid='modal']").contains("Детали ингредиента");
      cy.get('[data-testid="modalCloseBtn"]').click();
    });
  });

  it("should drag and drop ingredient", () => {
    cy.get('[data-testid="ingr"]').first().as("ingredient");
    cy.get('[data-testid="constructor"]').as("constructor");
    cy.get('[data-testid="bun"]').first().as("bun");

    cy.get("@ingredient").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
    cy.get('[data-testid="counter"]').as("counter");
    cy.get("@counter").contains("1");

    cy.get("@bun").trigger("dragstart");
    cy.get("@constructor").trigger("drop");
    cy.get('[data-testid="counter"]').as("counter");
    cy.get("@counter").contains("2");
  });

  it("should create order", () => {
    cy.get('[data-testid="createOrderBtn"]').click();
    cy.get('[data-testid="modal"]').should("be.visible");
    cy.contains('Ваш заказ начали готовить');
    cy.contains('123');
    cy.get('[data-testid="modalCloseBtn"]').click();
  });
});
