import React from 'react';
import CampaignForm from 'src/forms/CampaignForm';
import DragonImg from 'src/assets/dragon.png';
import { Box, Flex, Heading, Image, useToast } from '@chakra-ui/core/dist';
import { useHistory } from 'react-router-dom';
import urls from 'src/urls';
import { useCreateCampaign } from '../../graphql/campaign/createCampaign.generated';

export const campaignFormInitialValues = {
  name: '',
  dungeonMaster: '',
  players: [],
};

const CampaignCreationPage: React.FC = () => {
  const toast = useToast();
  const history = useHistory();
  const [createCampaign] = useCreateCampaign({
    onCompleted: () => history.push(urls.campaigns.list()),
    onError: error =>
      toast({
        title: 'Failed to create campaign',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      }),
  });

  return (
    <Flex justify="center" alignItems="center" minHeight="100%" direction={['column', 'row']}>
      <Image src={DragonImg} alt="Dragon Image" m={[0, 10]} width={['65%', 'auto']} />
      <Box m={5} width={['100%', 500]}>
        <Heading size="xl" mb={3}>
          Create a new campaign
        </Heading>
        <CampaignForm
          onSubmit={async values => createCampaign({ variables: values })}
          initialValues={campaignFormInitialValues}
        />
      </Box>
    </Flex>
  );
};

export default CampaignCreationPage;
