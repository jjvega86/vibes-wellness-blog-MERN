import { useState } from "react";

const useCustomForm = (initialValues = {}, onSubmit) => {
  const [formData, setFormValues] = useState(initialValues);

  const handleInputChange = (e) => {
    e.persist();
    setFormValues({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit triggered!");
    console.log(formData);
    onSubmit();
  };

  return [formData, handleInputChange, handleSubmit];
};

export default useCustomForm;
