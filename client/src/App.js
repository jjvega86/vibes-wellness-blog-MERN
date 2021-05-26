import React from "react";
import ClearStorageButton from "./components/register/clearstorage";
import Register from "./components/register/register";

const App = () => {
  console.log(localStorage);
  return (
    <div>
      <Register />
      <ClearStorageButton />
    </div>
  );
};

export default App;
