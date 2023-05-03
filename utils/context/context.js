import React, { useContext } from 'react';

/** General purpose context */
const AppContext = React.createContext();

/** Returns app global shared state. */
export const useAppContext = () => useContext(AppContext);

export default AppContext;
