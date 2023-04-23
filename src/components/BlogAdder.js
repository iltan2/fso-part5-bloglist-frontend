import { useState } from "react";

const BlogAdder = ({ addBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlogHandler = (event) => {
    event.preventDefault();
    const newObj = { title: title, author: author, url: url };
    addBlog(newObj);
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
            placeholder="Input title here"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            placeholder="Input author here"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          URL:
          <input
            type="text"
            value={url}
            placeholder="Input URL here"
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
