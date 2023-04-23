import React from "react";
//import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "../components/Blog";

test("renders content", () => {
  const currUser = {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImlzcmFlbCIsImlkIjoiNjQ0MWY0Mzk1MTQyNjg3NThjZWViODk4IiwiaWF0IjoxNjgyMDkyMjI1fQ.M3n3JymjEunOyp_lflhGGPk9G1Ok_lLm2TUzkDzOCpM",
    username: "israel",
    name: "Admin User",
    id: "6441f439514268758ceeb898",
  };

  const blog = {
    title: "Testing title",
    author: "Testing author",
    url: "Testing url",
    likes: 100,
  };

  render(<Blog blog={blog} currUser={currUser} />);

  const element = screen.getByText("Title: Testing title");
  expect(element).toBeDefined();
});
