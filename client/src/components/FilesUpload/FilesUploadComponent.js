import React, { useState, useEffect } from "react";
import blog from "../../api/blog";
import { Button, Box } from "@mui/material";

//TODO: Refactor upload JSX to use MUI components and remove choose file button

const FilesUploadComponent = ({ description }) => {
  const [imageData, setImageData] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (imageData) {
      setImageUrl(URL.createObjectURL(imageData));
    }
  }, [imageData]);

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
    alert("Submit triggered!");
    const formData = new FormData();
    formData.append("image", imageData);
    formData.append("name", `profileImg_${Date.now()}`);
    postImage(formData);
  };

  return (
    <>
      <input
        accept="image/*"
        type="file"
        id="select-image"
        style={{ display: "none" }}
        onChange={(e) => setImageData(e.target.files[0])}
      />
      <label htmlFor="select-image">
        <Button variant="contained" color="primary" component="span">
          Upload Image
        </Button>
      </label>
      {imageUrl && imageData && (
        <Box
          mt={2}
          textAlign="center"
          component="form"
          noValidate
          onSubmit={handleSubmit}
        >
          <div>Image Preview:</div>
          <img src={imageUrl} alt={imageData.name} height="100px" />
          <br />
          <Button
            variant="contained"
            color="primary"
            component="span"
            type="submit"
            onClick={handleSubmit}
          >
            Submit Image
          </Button>
        </Box>
      )}
    </>
  );
};

export default FilesUploadComponent;
