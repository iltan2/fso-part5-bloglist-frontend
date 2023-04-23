import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogAdder from "../components/BlogAdder";

describe("Exercise 5.16", () => {
  let testBlog;
  beforeEach(() => {
    testBlog = {
      title: "Testing title 100",
      author: "Testing author 100",
      url: "Testing url 100",
    };
  });

  test("correct details are received when add blog is clicked", async () => {
    const addBlog = jest.fn();
    const user = userEvent.setup();

    render(<BlogAdder addBlog={addBlog} />);

    const inputTitle = screen.getByPlaceholderText("Input title here");
    const inputAuthor = screen.getByPlaceholderText("Input author here");
    const inputUrl = screen.getByPlaceholderText("Input URL here");
    const buttonAdd = screen.getByText("add to blogs");

    await user.type(inputTitle, testBlog.title);
    await user.type(inputAuthor, testBlog.author);
    await user.type(inputUrl, testBlog.url);
    await user.click(buttonAdd);

    expect(addBlog.mock.calls).toHaveLength(1);
    expect(addBlog.mock.calls[0][0].title).toBe(testBlog.title)
    expect(addBlog.mock.calls[0][0].author).toBe(testBlog.author)
    expect(addBlog.mock.calls[0][0].url).toBe(testBlog.url)
  });
});
