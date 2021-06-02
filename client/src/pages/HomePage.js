import React from "react";

const HomePage = ({ user }) => {
  return (
    <div>
      <h1> Hello, {user.name}!</h1>
      <h3>Your id is: {user._id}</h3>
    </div>
  );
};

export default HomePage;
