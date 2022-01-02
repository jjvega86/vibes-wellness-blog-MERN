import React, { useState } from "react";
import blog from "../../api/blog";

//TODO: Refactor upload JSX to use MUI components and remove choose file button

const FilesUploadComponent = () => {
  const [imageData, setImageData] = useState("");

  const handleImage = (e) => {
    setImageData(e.target.files[0]);
  };

  const postImage = async (formData) => {
    const token = localStorage.getItem("token");
    try {
      let response = await blog.post("images/cloudUpload", formData, {
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
    formData.append("name", `profileImg_${Date.now()}`);
    postImage(formData);
  };

  return (
    <div className="container">
      <div className="row">
        <form onSubmit={handleSubmit}>
          <h3>Upload Profile Image</h3>
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
