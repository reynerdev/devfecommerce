import React, { useState } from 'react';

const TYPEFORM = {
  signUp: 'signUp',
  logIn: 'logIN',
};

const initialValue = (value) => {
  if (value === TYPEFORM.logIn) {
    return {
      user: '',
      password: '',
    };
  } else {
    return {
      user: '',
      password: '',
      name: '',
      lastname: '',
      password_confirmation: '',
    };
  }
};

const useForm = (value) => {
  const [inputs, setInputs] = useState(initialValue());

  const handleInputs = (event) => {
    console.log(event.target.id);
    setInputs({
      ...inputs,
      [event.target.id]: event.target.value,
    });
  };

  return [inputs, handleInputs];
};

export { TYPEFORM };
export default useForm;
