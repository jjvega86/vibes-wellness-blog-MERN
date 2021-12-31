import React, { useContext } from "react";
import FilesUploadComponent from "../components/FilesUpload/FilesUploadComponent";

import { Typography, Container, Box, Paper } from "@mui/material";
import AuthContext from "../context/AuthContext";

const checkForProfileImage = (user) => {
  if (user.profileImage === null || user.profileImage === undefined) {
    return <FilesUploadComponent />;
  } else {
    let stringifiedImage = user.profileImage.toString().split("/");
    let imagePath = stringifiedImage[4];
    return (
      <img
        src={`http://localhost:8000/${imagePath}`}
        alt="profile for user"
        style={{ maxWidth: "200px" }}
      />
    );
  }
};

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const imageRender = checkForProfileImage(user);
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
