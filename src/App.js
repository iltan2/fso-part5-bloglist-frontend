import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogAdder from "./components/BlogAdder";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [notifMessage, setNotifMessage] = useState(null);
  const [messageType, setMessageType] = useState("notif");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const logoutHandler = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log("Wrong credentials");
      setMessageType("error");
      setNotifMessage("Wrong credentials");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setNotifMessage(null);
    }, 2000);
    console.log("notifmessage", notifMessage);
  }, [notifMessage]);
  const loginForm = () => (
    <div>
      <h1>log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );

  const blogFormRef = useRef();

  const sortedBlogs = blogs.sort((a, b) => a.likes - b.likes);

  const addLikeHandler = (blog) => async () => {
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

  const deleteBlogHandler = (blog) => async () => {
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


  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <span>{user.name} logged in</span>
      <button onClick={logoutHandler}>logout</button>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogAdder
          blogs={blogs}
          setBlogs={setBlogs}
          setNotifMessage={setNotifMessage}
          setMessageType={setMessageType}
          blogFormRef={blogFormRef}
        />
      </Togglable>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          addLikeHandler={addLikeHandler(blog)}
          deleteBlogHandler={deleteBlogHandler(blog)}
          currUser={user}
        />
      ))}
    </div>
  );

  const Notification = ({ message, msgType }) => {
    if (message === null || message === "") {
      return null;
    }

    return <div className={msgType}>{message}</div>;
  };

  return (
    <div>
      <Notification message={notifMessage} msgType={messageType} />
      {user === null && loginForm()}
      {user !== null && blogForm()}
    </div>
  );
};

export default App;
