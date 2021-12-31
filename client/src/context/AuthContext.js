import { createContext, useState } from "react";
import blog from "../api/blog";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const loginUser = async (formData) => {
    console.log(formData);
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

  let contextData = {
    user: "JJ",
    loginUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
