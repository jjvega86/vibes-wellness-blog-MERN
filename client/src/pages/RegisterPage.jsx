import * as React from "react";
import blog from "../api/blog";
import useCustomForm from "../hooks/useCustomForm";

const RegisterPage = () => {
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    {
      name: "",
      email: "",
      password: "",
    },
    () => {
      (async () => {
        await blog
          .post("/auth/register", formData)
          .then((res) => {
            localStorage.setItem("token", res.headers["x-auth-token"]);
          })
          .catch((err) => console.log(err));
      })();
      window.location = "/";
    }
  );

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
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
    </>
  );
};

export default RegisterPage;
