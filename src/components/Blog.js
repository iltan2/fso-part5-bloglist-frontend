import { useState } from "react";

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const blogCreator = blog.user ? blog.user.name : null;

  const shownWhenFalse = { display: showDetails ? "none" : "" };
  const shownWhenTrue = { display: showDetails ? "" : "none" };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      Title: {blog.title}
      <button onClick={toggleDetails} style={shownWhenFalse}>
        view details
      </button>
      <button onClick={toggleDetails} style={shownWhenTrue}>
        hide details
      </button>
      <div style={shownWhenTrue}>
        <div>Author: {blog.author}</div>
        <div>URL: {blog.url}</div>
        <div>Likes: {blog.likes}</div>
        <div>User: {blogCreator}</div>
      </div>
    </div>
  );
};

export default Blog;
