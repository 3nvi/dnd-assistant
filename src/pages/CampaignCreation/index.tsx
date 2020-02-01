import React from 'react';
import CampaignForm from 'src/forms/CampaignForm';
import DragonImg from 'src/assets/dragon.png';
import { Box, Flex, Heading, Image, useToast } from '@chakra-ui/core/dist';
import { useHistory } from 'react-router';
import { gql, useMutation } from '@apollo/client';
import { CampaignCreationResponse, MutationCreateCampaignArgs } from 'src/graphql/schema';
import urls from 'src/urls';
import { CAMPAIGN_SUMMARY_FRAGMENT } from 'src/graphql/campaign';

export const CREATE_CAMPAIGN = gql`
  mutation CreateCampaign($name: String!, $dungeonMaster: String!, $players: [String]!) {
    createCampaign(name: $name, dungeonMaster: $dungeonMaster, players: $players) {
      campaign {
        ...CampaignSummary
      }
    }
  }
  ${CAMPAIGN_SUMMARY_FRAGMENT}
`;

export const campaignFormInitialValues = {
  name: '',
  dungeonMaster: '',
  players: [],
};

const CampaignCreationPage: React.FC = () => {
  const toast = useToast();
  const history = useHistory();
  const [createCampaign, { data, error }] = useMutation<
    { createCampaign: CampaignCreationResponse },
    MutationCreateCampaignArgs
  >(CREATE_CAMPAIGN);

  React.useEffect(() => {
    if (error) {
      toast({
        title: 'Failed to create campaign',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [error]);

  React.useEffect(() => {
    if (data) {
      history.push(urls.campaigns.list());
    }
  }, [data]);

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
