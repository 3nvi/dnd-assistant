import React from 'react';
import Logo from 'src/assets/logo.png';
import { Box, Flex, Image } from '@chakra-ui/core/dist';

const SplashScreenPage: React.FC = () => {
  return (
    <Box as="main">
      <Flex width="100vw" height="100vh" align="center" justify="center">
        <Image
          src={Logo}
          alt="Dnd Assistant Logo"
          htmlWidth={250}
          htmlHeight={250}
          ignoreFallback
        />
      </Flex>
    </Box>
  );
};

export default SplashScreenPage;
