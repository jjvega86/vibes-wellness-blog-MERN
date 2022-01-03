import jwtDecode from "jwt-decode";
import { createContext, useState } from "react";
import { useHistory } from "react-router-dom";
import blog from "../api/blog";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const currentToken = localStorage.getItem("token");
  const decodedToken = currentToken ? jwtDecode(currentToken) : null;

  const [user, setUser] = useState(decodedToken);

  const registerUser = async (formData) => {
    try {
      let response = await blog.post("/auth/register", formData);
      localStorage.setItem("token", response.headers["x-auth-token"]);
      window.location = "/";
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const logUser = () => {
    console.log(user);
  };

  const loginUser = async (formData) => {
    try {
      let response = await blog.post("auth/login", formData);
      localStorage.setItem("token", response.data);
      logUser();
      window.location = "/";
    } catch (error) {
      console.log(error.response.data);
      localStorage.removeItem("token");
      window.location = "/";
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    setUser(null);
    window.location = "/";
  };

  let contextData = {
    user,
    loginUser,
    logoutUser,
    registerUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
