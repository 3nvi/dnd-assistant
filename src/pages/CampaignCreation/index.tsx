import React from 'react';
import CampaignForm from 'src/forms/CampaignForm';
import { Box, Heading } from '@chakra-ui/core/dist';

const CampaignCreationPage: React.FC = () => {
  return (
    <Box borderRadius="md" boxShadow="md" bg="white" p={4} m="auto" width={500}>
      <Heading color="gray.300" size="xl" mb={3}>
        Create a new campaign
      </Heading>
      <CampaignForm />
    </Box>
  );
};

export default CampaignCreationPage;
