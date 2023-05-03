import { useReducer } from 'react';
import AuthServices from '../../services/AuthServices';

const initialState = {
  loading: true, // True while fetching user info from session storage. False elsecase.
  isLoggedIn: false,
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return { ...state, loading: false, isLoggedIn: true, user: action.value };
    case 'logout':
      return { ...initialState, loading: false };
    case 'loaded':
      return { ...state, loading: false };
    default:
      return state;
  }
};

/**
 * Returns state and methods related to user auth.
 * @warn only use this hook in a context provider.
 * Otherwise you won't be able to share this state between screens or components.
 */
const useAuthState = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (payload) => {
    const { ok, data } = await AuthServices.login(payload);
    if (!ok) return { ok, data };
    dispatch({ type: 'login', value: data });
    sessionStorage.setItem('sessionToken', data.sessionToken);
    return { ok, data: 'Ingreso exitoso' };
  };

  const refreshUser = async () => {
    const token = sessionStorage.getItem('sessionToken');
    if (!token) return { ok: false };
    const { ok, data } = await AuthServices.refresh(token);
    if (ok) {
      dispatch({ type: 'login', value: data });
    }
    return { ok };
  };

  const logout = async () => {
    dispatch({ type: 'logout' });
    sessionStorage.removeItem('sessionToken');
  };

  const loaded = async () => {
    dispatch({ type: 'loaded' });
  };

  /** Returns true if current user has the provided role. */
  const userHasRole = (...roles) => {
    if (!state.isLoggedIn) return false;
    return roles.some((role) => state.user.userType === role);
  };

  const actions = {
    login,
    refreshUser,
    logout,
    loaded,
    userHasRole,
  };

  return { ...state, ...actions };
};

export default useAuthState;
