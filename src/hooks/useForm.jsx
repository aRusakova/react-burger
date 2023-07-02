import { useState } from "react";

function useForm(initial) {
  const [formValues, setFormValues] = useState(initial);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormValues({ ...formValues, [name]: value });
  };

  const resetForm = () => {
    setFormValues(initial);
  };

  const hidePassword = () => {
    setFormValues({ ...formValues, password: "" });
  };

  return { formValues, handleInputChange, resetForm, hidePassword };
}

export default useForm;
