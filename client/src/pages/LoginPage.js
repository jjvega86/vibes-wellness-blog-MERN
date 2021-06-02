import React, { useState } from "react";
import blog from "../api/blog";

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
          localStorage.setItem("token", res.data);
          window.location = "/";
        })
        .catch((ex) => {
          console.log(ex);
          localStorage.removeItem("token");
          window.location = "/";
        });
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
