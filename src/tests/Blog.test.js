import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";

describe("Exercise 5.13", () => {
  let currUser;
  let blog;
  let container;
  beforeEach(() => {
    currUser = {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImlzcmFlbCIsImlkIjoiNjQ0MWY0Mzk1MTQyNjg3NThjZWViODk4IiwiaWF0IjoxNjgyMDkyMjI1fQ.M3n3JymjEunOyp_lflhGGPk9G1Ok_lLm2TUzkDzOCpM",
      username: "israel",
      name: "Admin User",
      id: "6441f439514268758ceeb898",
    };

    blog = {
      title: "Testing title",
      author: "Testing author",
      url: "Testing url",
      likes: 100,
    };

    container = render(<Blog blog={blog} currUser={currUser} />).container;
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
  let container;
  let user;
  let button;
  beforeEach(() => {
    currUser = {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImlzcmFlbCIsImlkIjoiNjQ0MWY0Mzk1MTQyNjg3NThjZWViODk4IiwiaWF0IjoxNjgyMDkyMjI1fQ.M3n3JymjEunOyp_lflhGGPk9G1Ok_lLm2TUzkDzOCpM",
      username: "israel",
      name: "Admin User",
      id: "6441f439514268758ceeb898",
    };

    blog = {
      title: "Testing title",
      author: "Testing author",
      url: "Testing url",
      likes: 100,
    };

    container = render(<Blog blog={blog} currUser={currUser} />).container;

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
  let mockHander;
  let container;
  let user;
  let button;

  beforeEach(() => {
    currUser = {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImlzcmFlbCIsImlkIjoiNjQ0MWY0Mzk1MTQyNjg3NThjZWViODk4IiwiaWF0IjoxNjgyMDkyMjI1fQ.M3n3JymjEunOyp_lflhGGPk9G1Ok_lLm2TUzkDzOCpM",
      username: "israel",
      name: "Admin User",
      id: "6441f439514268758ceeb898",
    };

    blog = {
      title: "Testing title",
      author: "Testing author",
      url: "Testing url",
      likes: 100,
    };

    mockHandler = jest.fn();
    container = render(
      <Blog blog={blog} currUser={currUser} addLikeHandler={mockHandler} />
    ).container;

    user = userEvent.setup();
    button = screen.getByText("add like");
  });

  test("clicking the button twice will make it be two events", async () => {
    await user.click(button);
    await user.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
