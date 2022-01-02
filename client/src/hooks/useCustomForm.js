import { useState } from "react";

const useCustomForm = (initialValues = {}, onSubmit) => {
  const [formData, setFormValues] = useState(initialValues);

  //TODO: Refactor to utilize FormData as content-type for POST request
  //TODO: utilize a conditional check to see if image present, call function to process
  //TODO: image upload as formdata to send as part of requst
  //TODO: Refactor backend to accept formdata and save image to database

  const handleInputChange = (e) => {
    e.persist();
    if (e.target.name.includes("image")) {
      setFormValues({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormValues({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const appendFormData = (rawData) => {
    let formData = new FormData();

    for (let [key, value] of Object.entries(rawData)) {
      formData.append(String(key), String(value));
    }

    return formData;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(appendFormData(formData));
  };

  return [formData, handleInputChange, handleSubmit];
};

export default useCustomForm;
