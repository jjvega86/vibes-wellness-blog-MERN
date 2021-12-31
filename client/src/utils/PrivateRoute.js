import { Redirect } from "react-router-dom";

import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

export const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Redirect to="/login" />;
};
