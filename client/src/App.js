import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

const App = () => {
  const [currentToken, setCurrentToken] = useState(
    localStorage.getItem("token")
  );
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    setCurrentToken(localStorage.getItem("token"));
    const userfromToken = jwtDecode(currentToken);
    setCurrentUser(userfromToken);
    console.log(currentUser);
  }, []);

  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
    </Switch>
  );
};

export default App;
