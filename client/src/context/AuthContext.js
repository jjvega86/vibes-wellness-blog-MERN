import jwtDecode from "jwt-decode";
import { createContext, useState } from "react";
import blog from "../api/blog";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;

  const [user, setUser] = useState(decodedToken);

  const loginUser = async (formData) => {
    try {
      let response = await blog.post("auth/login", formData);
      console.log(response);
      localStorage.setItem("token", response.data);
      window.location = "/";
    } catch (error) {
      console.log(error.response.data);
      localStorage.removeItem("token");
      window.location = "/";
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location = "/";
  };

  let contextData = {
    user,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
