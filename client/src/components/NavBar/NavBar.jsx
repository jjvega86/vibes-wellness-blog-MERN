import * as React from "react";
import {
  Toolbar,
  AppBar,
  IconButton,
  Box,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const setLoggedInState = (user) => {
  let loggedInState;

  if (user === "NONE") {
    loggedInState = (
      <Button color="inherit" href="/login">
        Login
      </Button>
    );
  } else {
    loggedInState = (
      <Button
        color="inherit"
        onClick={() => {
          localStorage.clear();
          window.location = "/";
        }}
      >
        Logout
      </Button>
    );
  }

  return loggedInState;
};

const NavBar = ({ user }) => {
  let loggedInState = setLoggedInState(user);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            VIBES
          </Typography>
          {loggedInState}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
