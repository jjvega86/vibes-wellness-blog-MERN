import React from "react";

const ProfilePage = ({ user }) => {
  return (
    <>
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
