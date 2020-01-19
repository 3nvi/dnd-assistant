import React from 'react';
import SpellGroup from 'src/components/SpellGroup';
import { Link } from 'react-router-dom';
import { Box, Button } from '@chakra-ui/core/dist';
import urls from 'src/urls';
import Campaigns from './subcomponents/Campaigns';

const HomePage: React.FC = () => {
  return (
    <Box>
      <SpellGroup />
      <Campaigns />

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
