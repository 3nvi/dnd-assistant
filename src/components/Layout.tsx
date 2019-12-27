import React from 'react';
import { Box } from '@chakra-ui/core';

const Layout: React.FC = ({ children }) => {
  return (
    <Box as="main" height="100vh">
      {children}
    </Box>
  );
};

export default Layout;
