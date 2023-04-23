import { useState } from "react";

const BlogAdder = ({ addBlog, blogFormRef }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlogHandler = (event) => {
    event.preventDefault();
    const newObj = { title: title, author: author, url: url };
    console.log("newObj", newObj);
    addBlog(newObj);
    console.log("done with adding")
    blogFormRef.current.toggleVisibility();
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
