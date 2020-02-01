import React from 'react';
import { Box } from '@chakra-ui/core';

const Layout: React.FC = ({ children }) => {
  return (
    <Box bg="gray.50">
      <Box
        as="main"
        minHeight="100vh"
        padding={5}
        width={['100%', '30em', '48em', '62em', '80em']}
        mx="auto"
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
