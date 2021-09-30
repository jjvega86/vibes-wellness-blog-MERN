import React from "react";
import FilesUploadComponent from "../components/FilesUploadComponent";

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

const ProfilePage = ({ user }) => {
  const imageRender = checkForProfileImage(user);
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
