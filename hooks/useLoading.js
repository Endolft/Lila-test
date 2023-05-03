import { useState } from 'react';
import Loading from '../components/Loading';

/**
 * Returns a stateful Loading component and functions to update it.
 * @param {boolean} initialState init component on a visible state.
 * @returns Loading Component and methods to show and hide it.
 */
const useLoading = (initialState = false) => {
  const [show, setShow] = useState(initialState);

  const showLoadingSpinner = () => {
    setShow(true);
  };

  const hideLoadingSpinner = () => {
    setShow(false);
  };

  const LoadingComponent = (props) => <Loading {...props} show={show} />;

  return {
    showLoadingSpinner,
    hideLoadingSpinner,
    Loading: LoadingComponent,
  };
};

export default useLoading;
