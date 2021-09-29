import React from "react";

const setLoggedInState = (user) => {
  let loggedInState;

  if (user === "NONE") {
    loggedInState = (
      <a className="nav-link" href="/login" tabIndex="-1" aria-disabled="true">
        Login
      </a>
    );
  } else {
    loggedInState = (
      <a
        style={{ cursor: "pointer" }}
        className="nav-link"
        onClick={() => {
          localStorage.clear();
          window.location = "/";
        }}
        tabIndex="-1"
        aria-disabled="true"
      >
        Logout
      </a>
    );
  }

  return loggedInState;
};

const NavBar = ({ user }) => {
  let loggedInState = setLoggedInState(user);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand">{user && <div>{user.name}</div>}</a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="true"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="/allposts">
              All Posts
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">
              My Profile
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/addpost">
              Add New Post
            </a>
          </li>
          <li className="nav-item">{loggedInState}</li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
