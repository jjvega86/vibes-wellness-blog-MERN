import React from "react";

const ClearStorageButton = () => {
  const handleClick = () => {
    console.log("Clicked!");
    localStorage.clear();
    console.log(localStorage);
  };

  return <button onClick={handleClick}>Clear Storage!</button>;
};

export default ClearStorageButton;
