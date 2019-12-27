import React from 'react';
import useAuth from '../hooks/useAuth';
import { Redirect } from 'react-router-dom';

const withAuthentication = <P extends Object>(Component: React.ComponentType<P>) => {
  const AuthProtectedComponent: React.FC<P> = props => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
      return <Redirect push={false} to="/" />;
    }
    return <Component {...props} />;
  };

  return AuthProtectedComponent;
};

export default withAuthentication;
