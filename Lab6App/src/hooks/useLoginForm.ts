import {useState} from 'react';

const mayusRgx = /[A-Z]/;
const minusRgx = /[a-z]/;
const numberRgx = /[0-9]/;
const specialCharRgx = /[^\w\d\s]/;

export const useLoginForm = () => {
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState<
    {
      type: string;
      msg: string;
    }[]
  >([]);

  const handleUserChange = (text: string) => {
    setFormValues(preValues => ({
      ...preValues,
      username: text,
    }));
  };

  const handlePasswordChange = (text: string) => {
    setFormValues(preValues => ({
      ...preValues,
      password: text,
    }));
  };

  const validateUsername = (): boolean => {
    if (formValues.username.length < 4) {
      setFormErrors(prevValues => [
        ...prevValues,
        {
          type: 'length',
          msg: 'Username must be at least 6 characters long',
        },
      ]);
      return false;
    }
    return true;
  };

  const validatePassword = (): boolean => {
    let _passWordErrors = [];

    if (formValues.password.length < 6) {
      _passWordErrors.push({
        type: 'length',
        msg: 'Password must be at least 6 characters long',
      });
    }

    if (!mayusRgx.test(formValues.password)) {
      _passWordErrors.push({
        type: 'uppercase',
        msg: 'Password must contain at least one uppercase',
      });
    }

    if (!minusRgx.test(formValues.password)) {
      _passWordErrors.push({
        type: 'lowercase',
        msg: 'Password must contain at least one lowercase',
      });
    }

    if (!numberRgx.test(formValues.password)) {
      _passWordErrors.push({
        type: 'number',
        msg: 'Password must contain at least one number',
      });
    }

    if (!specialCharRgx.test(formValues.password)) {
      _passWordErrors.push({
        type: 'specialChar',
        msg: 'Password must contain at least one special character',
      });
    }

    if (_passWordErrors.length > 0) {
      setFormErrors(prevValues => [...prevValues, ..._passWordErrors]);

      return false;
    }

    return true;
  };

  return {
    formValues,
    formErrors,
    setFormErrors,
    handleUserChange,
    handlePasswordChange,
    validateUsername,
    validatePassword,
  };
};
