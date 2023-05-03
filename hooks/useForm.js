import { useEffect, useState } from 'react';

export const useForm = (initialForm = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [getIn, setGetIn] = useState(false);
  const [readyToSend, setReadyToSend] = useState(false);

  const { name, files } = formState;

  useEffect(() => {
    if ([name.length, files.length].includes(0)) {
      setReadyToSend(false);
      return;
    }

    setReadyToSend(true);
  }, [formState]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return {
    ...formState,
    formState,
    onInputChange,
    setFormState,

    getIn,
    setGetIn,
    readyToSend,
  };
};
