import { useState, ChangeEvent } from "react";

export interface IUseFormProps {
  [name: string]: string;
}

function useForm(initial: IUseFormProps) {
  const [formValues, setFormValues] = useState<IUseFormProps>(initial);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  
    const value = (e.target as HTMLInputElement).value;
    const name = (e.target as HTMLInputElement).name;

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
