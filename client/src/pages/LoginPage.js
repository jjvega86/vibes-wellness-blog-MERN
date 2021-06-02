import React, { useState } from "react";
import blog from "../api/blog";
import jwtDecode from "jwt-decode";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      email: email,
      password: password,
    };
    (async () => {
      await blog
        .post("auth/login", data)
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("token", res.data);
          const tokenFromStorage = localStorage.getItem("token"); // grabs token from local storage and saves to a variable
          const userfromToken = jwtDecode(tokenFromStorage); // passes token into jwtDecode() (from third party package) to get user data from token
          console.log(userfromToken);
          console.log(localStorage);
          window.location = "/";
        })
        .catch((ex) => console.log(ex));
    })();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="text"
          name="name"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </label>
      <label>
        Password:
        <input
          type="text"
          name="name"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default LoginPage;
