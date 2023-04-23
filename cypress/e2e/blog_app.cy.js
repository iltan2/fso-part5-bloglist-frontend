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
      cy.get("#username").type("israel");
      cy.get("#password").type("israel");
      cy.get("#login-button").click();

      cy.contains("Israel Tan logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("israel");
      cy.get("#password").type("random");
      cy.get("#login-button").click();

      cy.contains("Wrong credentials");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3003/api/login", {
        username: "israel",
        password: "israel",
      }).then((response) => {
        localStorage.setItem(
          "loggedBlogAppUser",
          JSON.stringify(response.body)
        );
        cy.visit("http://localhost:3000");
      });
    });

    it("A blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("input[placeholder='Input title here']").type(
        "a blog created by cypress"
      );
      cy.get("input[placeholder='Input author here']").type("Cypress");
      cy.get("input[placeholder='Input URL here']").type("http://sampleurl");
      cy.contains("add to blogs").click();

      cy.contains("a blog created by cypress");
    });

    it("User can like a blog", function () {
      cy.contains("new blog").click();
      cy.get("input[placeholder='Input title here']").type(
        "a blog created by cypress"
      );
      cy.get("input[placeholder='Input author here']").type("Cypress");
      cy.get("input[placeholder='Input URL here']").type("http://sampleurl");
      cy.contains("add to blogs").click();

      cy.contains("view details").click();
      cy.contains("add like").click()

      cy.contains("Likes: 1")

    })

  });
});
