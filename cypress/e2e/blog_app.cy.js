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
      cy.contains("add like").click();

      cy.contains("Likes: 1");
    });
  });
});

describe("With many blogs from different users", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    // add users
    const user = {
      name: "Israel Tan",
      username: "israel",
      password: "israel",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);

    const user2 = {
      name: "Israel Tan2",
      username: "israel2",
      password: "israel2",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user2);

    // login as user1, then add blogs
    const testBlogs = [
      {
        title: "Test title 1",
        author: "Test author 1",
        url: "Test author 1",
        likes: 1,
      },
      {
        title: "Test title 2",
        author: "Test author 2",
        url: "Test author 2",
        likes: 2,
      },
      {
        title: "Test title 3",
        author: "Test author 3",
        url: "Test author 3",
        likes: 3,
      },
      {
        title: "Test title 4",
        author: "Test author 4",
        url: "Test author 4",
        likes: 4,
      },
    ];

    cy.request("POST", "http://localhost:3003/api/login", {
      username: "israel",
      password: "israel",
    }).then((response) => {
      localStorage.setItem("loggedBlogAppUser", JSON.stringify(response.body));
      const myToken = `Bearer ${response.body.token}`;

      cy.request({
        method: "POST",
        url: "http://localhost:3003/api/blogs",
        headers: {
          Authorization: myToken,
          "Content-Type": "application/json",
        },
        body: testBlogs[0],
      });
      cy.request({
        method: "POST",
        url: "http://localhost:3003/api/blogs",
        headers: {
          Authorization: myToken,
          "Content-Type": "application/json",
        },
        body: testBlogs[1],
      });
    });

    cy.request("POST", "http://localhost:3003/api/login", {
      username: "israel2",
      password: "israel2",
    }).then((response) => {
      localStorage.setItem("loggedBlogAppUser", JSON.stringify(response.body));
      const myToken = `Bearer ${response.body.token}`;

      cy.request({
        method: "POST",
        url: "http://localhost:3003/api/blogs",
        headers: {
          Authorization: myToken,
          "Content-Type": "application/json",
        },
        body: testBlogs[2],
      });
      cy.request({
        method: "POST",
        url: "http://localhost:3003/api/blogs",
        headers: {
          Authorization: myToken,
          "Content-Type": "application/json",
        },
        body: testBlogs[3],
      });
    });

    cy.visit("http://localhost:3000");
  });

  it("Blogs are added", function () {
    cy.contains("Test title 1");
    cy.contains("Test title 2");
    cy.contains("Test title 3");
    cy.contains("Test title 4");
  });

  it("User who created the blog can delete it", function () {
    cy.get("#delete-blog-1").click(); // note that these are sorted descending by likes
    cy.contains("Test title 3").should("not.exist");
  });

  it("Only the creator can see the delete button", function () {
    cy.get("#delete-blog-2").should("not.exist"); // note that these are sorted descending by likes
    cy.get("#delete-blog-1"); // note that these are sorted descending by likes
  });

  it("Only the creator can see the delete button", function () {
    cy.get("#delete-blog-2").should("not.exist"); // note that these are sorted descending by likes
    cy.get("#delete-blog-1"); // note that these are sorted descending by likes
  });

  it("Blogs are sorted descending by likes ", function () {
    cy.get(".blog").eq(0).should("contain", "Test title 4");
    cy.get(".blog").eq(1).should("contain", "Test title 3");
    cy.get(".blog").eq(2).should("contain", "Test title 2");
    cy.get(".blog").eq(3).should("contain", "Test title 1");
  });
});
