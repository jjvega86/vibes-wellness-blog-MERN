import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AddPostPage from "./pages/AddPostPage";

import NavBar from "./components/NavBar/NavBar";

const App = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
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
      <NavBar user={currentUser} />
      <br />
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            if (currentUser === "NONE") {
              return <Redirect to="/login" />;
            } else {
              return <HomePage user={currentUser} />;
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
      </Switch>
    </div>
  );
};

export default App;
