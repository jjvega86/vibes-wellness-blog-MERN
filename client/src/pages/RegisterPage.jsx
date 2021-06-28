import React, { useState } from "react";
import blog from "../api/blog";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      name: name,
      email: email,
      password: password,
    };
    (async () => {
      await blog
        .post("/auth/register", data)
        .then((res) => {
          localStorage.setItem("token", res.headers["x-auth-token"]);
        })
        .catch((err) => console.log(err));
    })();
    window.location = "/";
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </label>
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
    </>
  );
};

export default RegisterPage;
