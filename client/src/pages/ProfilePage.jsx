import React from "react";
import FilesUploadComponent from "../components/FilesUploadComponent";

const checkForProfileImage = () => {
  // runs when ProfilePage renders
  // checks for profileImage in localStorage
  // if it exists, render the image
  // if it doesn't, render the FilesUploadComponent instead
  const image = localStorage.getItem("profileImage");
  if (image === null) {
    return <FilesUploadComponent />;
  } else {
    return <img src={image} alt="profile for user" />;
  }
};

const ProfilePage = ({ user }) => {
  //TODO: Add image upload for profile picture
  const imageRender = checkForProfileImage();
  return (
    <>
      <div className="col-md-3"></div>
      <div className="col-md-6">
        <h1> Hello, {user.name}!</h1>
        <h3>Your id is: {user._id}</h3>
      </div>
      <div className="col-md-3">{imageRender} </div>
    </>
  );
};

export default ProfilePage;
