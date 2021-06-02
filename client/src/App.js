import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

const App = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    let jwt = localStorage.getItem("token");
    const userfromToken = jwtDecode(jwt);
    setCurrentUser(userfromToken);
  }, []);

  return (
    <Switch>
      <Route exact path="/" render={() => <HomePage user={currentUser} />} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
    </Switch>
  );
};

export default App;
