import React, { useState } from "react";
import blog from "../../api/blog";
import jwtDecode from "jwt-decode";
//TODO: Move JWT storage and decoding logic to app.js and refactor register.js accordingly
//TODO: Refresh the page after storing token and route accordingly
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.clear();
    console.log(localStorage.getItem("token"));
    let data = {
      name: name,
      email: email,
      password: password,
    };
    (async () => {
      await blog
        .post("/auth/register", data)
        .then((res) => {
          localStorage.setItem("token", res.headers["x-auth-token"]); // gets JWT token from headers and saves to local storage
          const tokenFromStorage = localStorage.getItem("token"); // grabs token from local storage and saves to a variable
          const userfromToken = jwtDecode(tokenFromStorage); // passes token into jwtDecode() (from third party package) to get user data from token
          console.log(userfromToken);
          console.log(localStorage);
        })
        .catch((err) => console.log(err));
    })();
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

export default Register;
