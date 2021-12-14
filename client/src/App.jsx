import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import AddPostPage from "./pages/AddPostPage";
import AllPostsPage from "./pages/AllPostsPage";

import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

import { Container, Grid } from "@mui/material";

const App = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    let jwt = localStorage.getItem("token");
    if (!jwt) {
      setCurrentUser("NONE");
      return;
    }
    try {
      const userfromToken = jwtDecode(jwt);
      setCurrentUser(userfromToken);
    } catch (ex) {
      setCurrentUser("NONE");
      console.log(ex);
    }
  }, []);

  return (
    <Container maxWidth="lg">
      <Grid container>
        <NavBar user={currentUser} />
      </Grid>
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
      <Grid
        item
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%",
          textAlign: "center",
          marginTop: "-50px",
        }}
      >
        <Footer />
      </Grid>
    </Container>
  );
};

export default App;
