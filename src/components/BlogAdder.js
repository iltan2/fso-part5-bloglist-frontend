import { useState } from "react";
import blogService from "../services/blogs";

const BlogAdder = ({ blogs, setBlogs }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlogHandler = async (event) => {
    event.preventDefault();
    console.log("adding to blogs");
    const newObj = { title: title, author: author, url: url };
    const newBlog = await blogService.create(newObj);

    const newBlogs = [...blogs, newBlog];
    setBlogs(newBlogs);
  };

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={addBlogHandler}>
        <div>
          title:
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          URL:
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          <button type="submit">add to blogs</button>
        </div>
      </form>
    </div>
  );
};

export default BlogAdder;
