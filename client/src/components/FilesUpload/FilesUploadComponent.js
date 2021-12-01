import React, { useState } from "react";
import blog from "../../api/blog";

const FilesUploadComponent = () => {
  const [imageData, setImageData] = useState("");

  const handleImage = (e) => {
    setImageData(e.target.files[0]);
  };

  const postImage = async (formData) => {
    const token = localStorage.getItem("token");
    try {
      let response = await blog.post("images/upload", formData, {
        headers: {
          "x-auth-token": token,
        },
      });
      console.log(response.data);
      window.location = "/";
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", imageData);
    postImage(formData);
  };

  return (
    <div className="container">
      <div className="row">
        <form onSubmit={handleSubmit}>
          <h3>File Upload</h3>
          <div className="form-group">
            <input type="file" onChange={handleImage} />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" type="submit">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilesUploadComponent;
