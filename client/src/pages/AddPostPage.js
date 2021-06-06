import React, { useState } from "react";
import blog from "../api/blog";

const AddPostPage = ({ user }) => {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user._id);
    const jwt = localStorage.getItem("token");
    let data = {
      title: postTitle,
      content: postContent,
      createdBy: user._id,
    };
    (async () => {
      blog
        .post(`/users/${user._id}/posts`, data, {
          headers: { "x-auth-token": jwt },
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    })();
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <form className="form-group" onSubmit={handleSubmit}>
          <label>
            Post Title:
            <input
              type="text"
              name="name"
              value={postTitle}
              onChange={(e) => {
                setPostTitle(e.target.value);
              }}
            />
          </label>
          <br />
          <label>
            Post Text:
            <textarea
              type="text"
              name="name"
              value={postContent}
              onChange={(e) => {
                setPostContent(e.target.value);
              }}
            />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default AddPostPage;
