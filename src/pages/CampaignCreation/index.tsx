import React from 'react';
import CampaignForm from 'src/forms/CampaignForm';
import DragonImg from 'src/assets/dragon.png';
import { Box, Flex, Heading, Image } from '@chakra-ui/core/dist';

const CampaignCreationPage: React.FC = () => {
  return (
    <Flex justify="center" alignItems="center" minHeight="100%" direction={['column', 'row']}>
      <Image src={DragonImg} alt="Dragon Image" m={[0, 10]} width={['65%', 'auto']} />
      <Box m={5} width={['100%', 500]}>
        <Heading size="xl" mb={3}>
          Create a new campaign
        </Heading>
        <CampaignForm />
      </Box>
    </Flex>
  );
};

export default CampaignCreationPage;
