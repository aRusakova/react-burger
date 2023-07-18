import { useState, ChangeEvent } from "react";

export type TUseFormProps = {
  [name: string]: string;
}

function useForm(initial: TUseFormProps) {
  const [formValues, setFormValues] = useState<TUseFormProps>(initial);

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
