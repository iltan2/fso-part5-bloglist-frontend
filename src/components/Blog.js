import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, blogs, setBlogs, currUser }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    console.log("blog", blog);
    setShowDetails(!showDetails);
  };

  const addLikeHandler = async () => {
    console.log("adding 1 like");
    const newLikes = blog.likes + 1;
    const updatedBlog = { ...blog, likes: newLikes };

    await blogService.update(updatedBlog);
    const updatedBlogs = blogs.map((blog) => {
      if (blog.id === updatedBlog.id) {
        return updatedBlog;
      } else {
        return blog;
      }
    });

    setBlogs(updatedBlogs);
  };

  const blogUserId = blog.user ? blog.user.id : null;
  const showDeleteButton = blogUserId === currUser.id;

  const deleteBlogHandler = async () => {
    const reply = window.confirm(
      `Are you sure you want to delete the blog "${blog.title}"?`
    );
    if (reply) {
      console.log("Deleting blog...");
      await blogService.deleteBlog(blog);
      const updatedBlogs = blogs.filter((currBlog) => currBlog.id !== blog.id);
      setBlogs(updatedBlogs);
      console.log("Blog deleted.");
    }
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
      {showDeleteButton && (
        <button onClick={deleteBlogHandler}>delete blog</button>
      )}
      <div style={shownWhenTrue}>
        <div>Author: {blog.author}</div>
        <div>URL: {blog.url}</div>
        <div>
          Likes: {blog.likes}
          <button onClick={addLikeHandler}>add like</button>
        </div>
        <div>User: {blogCreator}</div>
      </div>
    </div>
  );
};

export default Blog;
