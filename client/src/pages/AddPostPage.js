import React, { useState } from "react";
import blog from "../api/blog";

const HomePage = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
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
              value={postBody}
              onChange={(e) => {
                setPostBody(e.target.value);
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

export default HomePage;
