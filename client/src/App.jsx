import React from "react";
import { Route, Switch } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import AddPostPage from "./pages/AddPostPage";
import AllPostsPage from "./pages/AllPostsPage";

import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

import { PrivateRoute } from "./utils/PrivateRoute";

import { Container, Grid } from "@mui/material";

const App = () => {
  return (
    <AuthProvider>
      <Container maxWidth="lg">
        <Grid container>
          <NavBar />
        </Grid>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return (
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              );
            }}
          />
          <Route path="/login" component={LoginPage} />
          <Route
            path="/addpost"
            render={() => {
              return <AddPostPage />;
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
    </AuthProvider>
  );
};

export default App;
