import React from 'react';
import useAuth from 'src/hooks/useAuth';

const LandingPage: React.FC = () => {
  const { login } = useAuth();
  return (
    <div>
      <button role="link" aria-roledescription="Login" onClick={login}>
        Login
      </button>
    </div>
  );
};

export default LandingPage;
