import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import AddPostPage from "./pages/AddPostPage";
import AllPostsPage from "./pages/AllPostsPage";

import NavBar from "./components/NavBar/NavBar";

const App = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    let jwt = localStorage.getItem("token");
    if (!jwt) {
      setCurrentUser("NONE");
      return;
    }
    try {
      let jwt = localStorage.getItem("token");
      const userfromToken = jwtDecode(jwt);
      setCurrentUser(userfromToken);
    } catch (ex) {
      setCurrentUser("NONE");
      console.log(ex);
    }
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <NavBar user={currentUser} />
        <br />
      </div>
      <div className="row mt-5">
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              if (currentUser === "NONE") {
                return <Redirect to="/login" />;
              } else {
                return <ProfilePage user={currentUser} />;
              }
            }}
          />
          <Route path="/login" component={LoginPage} />
          <Route
            path="/addpost"
            render={() => {
              return <AddPostPage user={currentUser} />;
            }}
          />
          <Route path="/register" component={RegisterPage} />
          <Route path="/allposts" component={AllPostsPage} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
