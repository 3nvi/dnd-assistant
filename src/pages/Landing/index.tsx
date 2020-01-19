import React from 'react';
import useAuth from 'src/hooks/useAuth';
import { Button } from '@chakra-ui/core/dist';

const LandingPage: React.FC = () => {
  const { login } = useAuth();
  return (
    <div>
      <Button role="link" onClick={login}>
        Login
      </Button>
    </div>
  );
};

export default LandingPage;
