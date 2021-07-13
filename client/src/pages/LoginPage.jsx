import React from "react";
import blog from "../api/blog";
import useCustomForm from "../hooks/useCustomForm";

const LoginPage = () => {
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    {
      email: "",
      password: "",
    },
    () => {
      (async () => {
        await blog
          .post("auth/login", formData)
          .then((res) => {
            localStorage.setItem("token", res.data);
            window.location = "/";
          })
          .catch((ex) => {
            console.log(ex);
            localStorage.removeItem("token");
            window.location = "/";
          });
      })();
    }
  );

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password:
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <a href="/register">Register</a>
    </React.Fragment>
  );
};

export default LoginPage;
