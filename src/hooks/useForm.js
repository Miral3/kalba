import { useState } from "react";

const useForm = ({ initialValues, onSubmit, validate }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nextValue = { ...values, [name]: value };
    setValues(nextValue);
    setErrors(validate(nextValue));
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      await onSubmit(values);
    }
    setIsLoading(false);
  };

  const checkEmptyValue = () => {
    return Object.values(values).some((value) => !value);
  };

  return {
    values,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    checkEmptyValue,
  };
};

export default useForm;
