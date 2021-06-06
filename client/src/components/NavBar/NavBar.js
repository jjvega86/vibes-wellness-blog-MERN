import React from "react";

const NavBar = ({ user }) => {
  console.log(user);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        {user && <div>{user.name}</div>}
      </a>
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
            <a className="nav-link" href="#">
              All Posts <span className="sr-only">(current)</span>
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
          <li className="nav-item">
            <a
              className="nav-link"
              href="/login"
              tabIndex="-1"
              aria-disabled="true"
            >
              Login/Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
