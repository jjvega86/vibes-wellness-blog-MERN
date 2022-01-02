import React, { useContext } from "react";
import FilesUploadComponent from "../components/FilesUpload/FilesUploadComponent";
import AuthContext from "../context/AuthContext";
import blog from "../api/blog";
import { encode } from "base64-arraybuffer";

import { Typography, Container, Box, Paper } from "@mui/material";

const fetchProfilePicture = async () => {
  try {
    let response = await blog.get("images/profileImage", {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    localStorage.setItem("profile", JSON.stringify(response.data.img));
    window.location = "/";
  } catch (error) {
    console.log(error);
  }
};

const checkForProfileImageCloud = (user) => {
  let imageData = JSON.parse(localStorage.getItem("profile"));
  if (user.hasProfileImage && imageData === null) {
    fetchProfilePicture();
  }

  if (imageData === undefined || imageData === null) {
    return <FilesUploadComponent />;
  } else {
    console.log(imageData);
    const base64String = encode(imageData.data.data);
    return (
      <img
        src={`data:image/jpg;base64,${base64String}`}
        alt="profile for user"
        style={{ maxWidth: "200px", maxHeight: "200px" }}
      />
    );
  }
};

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const imageRender = checkForProfileImageCloud(user);
  return (
    <Container>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h3">Hello, {user.name}!</Typography>
        <Paper variant="outlined" sx={{ mt: 5 }}>
          {imageRender}{" "}
        </Paper>
      </Box>
    </Container>
  );
};

export default ProfilePage;
