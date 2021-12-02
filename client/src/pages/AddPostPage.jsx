import React from "react";
import blog from "../api/blog";
import useCustomForm from "../hooks/useCustomForm";

const AddPostPage = ({ user }) => {
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    {
      title: "",
      content: "",
    },
    () => {
      const jwt = localStorage.getItem("token");
      (async () => {
        await blog
          .post(
            `/posts/`,
            { ...formData, createdBy: user._id },
            {
              headers: { "x-auth-token": jwt },
            }
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => console.log(err));
      })();
    }
  );

  return (
    <>
      <form className="form-group" onSubmit={handleSubmit}>
        <label>
          Post Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Post Text:
          <textarea
            type="text"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};

export default AddPostPage;
