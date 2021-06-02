import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

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
      <Route path="/register" component={RegisterPage} />
    </Switch>
  );
};

export default App;
