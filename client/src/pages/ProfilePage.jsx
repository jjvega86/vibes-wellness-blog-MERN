import React from "react";
import FilesUploadComponent from "../components/FilesUploadComponent";

const ProfilePage = ({ user }) => {
  //TODO: Add image upload for profile picture
  return (
    <>
      <FilesUploadComponent />
      <div className="col-md-3"></div>
      <div className="col-md-6">
        <h1> Hello, {user.name}!</h1>
        <h3>Your id is: {user._id}</h3>
      </div>
      <div className="col-md-3"></div>
    </>
  );
};

export default ProfilePage;
