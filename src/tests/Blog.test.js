import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";

describe("Exercise 5.13", () => {
  let currUser;
  let blog;
  beforeEach(() => {
    currUser = {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImlzcmFlbCIsImlkIjoiNjQ0NGM3YzQxNmEwOWExNDM0ZWIwYTAzIiwiaWF0IjoxNjgyMjI5MjI3fQ.qbICqKtO99gGD3boOjqgQQKm4rqttz1cnYB3YUVMuu8",
      username: "israel",
      name: "Admin User",
      id: "6444c7c416a09a1434eb0a03",
    };

    blog = {
      title: "Testing title",
      author: "Testing author",
      url: "Testing url",
      likes: 100,
    };

    render(<Blog blog={blog} currUser={currUser} />);
  });

  test("renders content", () => {
    const element = screen.getByText("Title: Testing title");
    expect(element).toBeDefined();
  });

  test("at start does not show url", () => {
    const element = screen.getByText("URL: Testing url");
    expect(element).toHaveStyle("display: none");
  });

  test("at start does not show likes", () => {
    const element = screen.getByText("Likes: 100");
    expect(element).toHaveStyle("display: none");
  });
});

describe("Exercise 5.14", () => {
  let currUser;
  let blog;
  let user;
  let button;
  beforeEach(() => {
    currUser = {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImlzcmFlbCIsImlkIjoiNjQ0NGM3YzQxNmEwOWExNDM0ZWIwYTAzIiwiaWF0IjoxNjgyMjI5MjI3fQ.qbICqKtO99gGD3boOjqgQQKm4rqttz1cnYB3YUVMuu8",
      username: "israel",
      name: "Admin User",
      id: "6444c7c416a09a1434eb0a03",
    };

    blog = {
      title: "Testing title",
      author: "Testing author",
      url: "Testing url",
      likes: 100,
    };

    render(<Blog blog={blog} currUser={currUser} />);

    user = userEvent.setup();
    button = screen.getByText("view details");
  });

  test("clicking the button shows the URL", async () => {
    await user.click(button);

    const element = screen.getByText("URL: Testing url");
    expect(element).not.toHaveStyle("display: none");
  });

  test("clicking the button shows the likes", async () => {
    await user.click(button);

    const element = screen.getByText("Likes: 100");
    expect(element).not.toHaveStyle("display: none");
  });
});

describe("Exercise 5.15", () => {
  let currUser;
  let blog;
  let mockHandler;
  let user;
  let button;

  beforeEach(() => {
    currUser = {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImlzcmFlbCIsImlkIjoiNjQ0NGM3YzQxNmEwOWExNDM0ZWIwYTAzIiwiaWF0IjoxNjgyMjI5MjI3fQ.qbICqKtO99gGD3boOjqgQQKm4rqttz1cnYB3YUVMuu8",
      username: "israel",
      name: "Admin User",
      id: "6444c7c416a09a1434eb0a03",
    };

    blog = {
      title: "Testing title",
      author: "Testing author",
      url: "Testing url",
      likes: 100,
    };

    mockHandler = jest.fn();
    render(
      <Blog blog={blog} currUser={currUser} addLikeHandler={mockHandler} />
    );

    user = userEvent.setup();
    button = screen.getByText("add like");
  });

  test("clicking the button twice will make it be two events", async () => {
    await user.click(button);
    await user.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
