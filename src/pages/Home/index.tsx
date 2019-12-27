import React from 'react';
import useAuth from 'src/hooks/useAuth';
import SpellGroup from 'src/components/SpellGroup';
import { Link } from 'react-router-dom';
import { Box, Button } from '@chakra-ui/core/dist';
import urls from 'src/urls';

const HomePage: React.FC = () => {
  const { user } = useAuth();
  return (
    <Box>
      <SpellGroup />

      <Button
        as={Link}
        // @ts-ignore
        to={urls.campaigns.new()}
        variantColor="teal"
        variant="solid"
        leftIcon="add"
        size="lg"
      >
        Create new Campaign
      </Button>
    </Box>
  );
};

export default HomePage;
