import { useState } from "react";

const useCustomForm = (callback) => {
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    event.persist();
    setFormData((formData) => ({
      ...formData,
      [event.target.name]: [event.target.value],
    }));
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    callback();
  };

  return { formData, handleChange, handleSubmit };
};

export default useCustomForm;
