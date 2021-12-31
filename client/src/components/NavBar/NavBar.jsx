import React, { useContext } from "react";
import {
  Toolbar,
  AppBar,
  IconButton,
  Box,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AuthContext from "../../context/AuthContext";

const setLoggedInState = (user, logoutUser) => {
  let loggedInState;

  if (user === "NONE") {
    loggedInState = (
      <Button color="inherit" href="/login">
        Login
      </Button>
    );
  } else {
    loggedInState = (
      <Button color="inherit" onClick={logoutUser}>
        Logout
      </Button>
    );
  }

  return loggedInState;
};

const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  let loggedInState = setLoggedInState(user, logoutUser);
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
