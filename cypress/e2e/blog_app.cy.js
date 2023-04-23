describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Israel Tan",
      username: "israel",
      password: "israel",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);

    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("log in to application");
    cy.contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("israel")
      cy.get("#password").type("israel")
      cy.get("#login-button").click()

      cy.contains("Israel Tan logged in")
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("israel")
      cy.get("#password").type("random")
      cy.get("#login-button").click()

      cy.contains("Wrong credentials")
    });
  });
});
