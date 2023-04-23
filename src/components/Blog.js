import { useState } from "react";

const Blog = ({ blog, addLikeHandler, deleteBlogHandler, currUser, idx }) => {
  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => {
    console.log("blog", blog);
    setShowDetails(!showDetails);
  };
  const blogUserId = blog.user ? blog.user.id : null;
  const showDeleteButton = blogUserId === currUser.id;

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
      {showDeleteButton && (
        <button onClick={deleteBlogHandler} id={`delete-blog-${idx}`}>delete blog</button>
      )}
      <div style={shownWhenTrue}>
        <div>Author: {blog.author}</div>
        <div className="url" style={shownWhenTrue}>URL: {blog.url}</div>
        <div className="likes" style={shownWhenTrue}>
          Likes: {blog.likes}
          <button onClick={addLikeHandler}>add like</button>
        </div>
        <div>User: {blogCreator}</div>
      </div>
    </div>
  );
};

export default Blog;
