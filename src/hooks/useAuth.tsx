import React from 'react';
import { AuthContext } from '../context/auth-context';

const useAuth = () => {
  const authContext = React.useContext(AuthContext);
  if (!authContext) {
    throw new Error('`AuthContext` was not found in parent scope');
  }
  return authContext;
};

export default useAuth;
