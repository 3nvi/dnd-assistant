import React from 'react';
import CampaignForm from 'src/forms/CampaignForm';
import DragonImg from 'src/assets/dragon.png';
import pick from 'lodash/pick';
import { Box, Flex, Heading, Image, useToast } from '@chakra-ui/core/dist';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { gql, useMutation, useQuery } from '@apollo/client';
import {
  CampaignUpdateResponse,
  MutationUpdateCampaignArgs,
  Query,
  QueryCampaignArgs,
} from 'src/graphql/schema';
import urls from 'src/urls';
import { CAMPAIGN_SUMMARY_FRAGMENT } from 'src/graphql/campaign';
import { campaignFormInitialValues } from '../CampaignCreation';

export const GET_CAMPAIGN = gql`
  query Campaign($id: ID!) {
    campaign(id: $id) {
      ...CampaignSummary
    }
  }
  ${CAMPAIGN_SUMMARY_FRAGMENT}
`;

export const UPDATE_CAMPAIGN = gql`
  mutation UpdateCampaign($id: ID!, $name: String!, $players: [String!]) {
    updateCampaign(id: $id, name: $name, players: $players) {
      campaign {
        ...CampaignSummary
      }
      message
    }
  }
  ${CAMPAIGN_SUMMARY_FRAGMENT}
`;

const CampaignUpdatePage: React.FC = () => {
  const toast = useToast();
  const history = useHistory();
  const {
    params: { id },
  } = useRouteMatch<{ id: string }>();

  const { data: campaignData, error: campaignFetchError } = useQuery<
    Pick<Query, 'campaign'>,
    QueryCampaignArgs
  >(GET_CAMPAIGN, {
    variables: {
      id,
    },
  });

  const [updateCampaign, { data: updateCampaignData, error: updateCampaignError }] = useMutation<
    { updateCampaign: CampaignUpdateResponse },
    MutationUpdateCampaignArgs
  >(UPDATE_CAMPAIGN);

  React.useEffect(() => {
    if (campaignFetchError) {
      toast({
        title: 'Failed to fetch stored campaign',
        description: campaignFetchError.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [campaignFetchError]);

  React.useEffect(() => {
    if (updateCampaignError) {
      toast({
        title: 'Failed to update campaign',
        description: updateCampaignError.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [updateCampaignError]);

  React.useEffect(() => {
    if (updateCampaignData) {
      toast({
        title: updateCampaignData.updateCampaign.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      history.push(urls.campaigns.list());
    }
  }, [updateCampaignData]);

  const initialValues = React.useMemo(() => {
    if (!campaignData || !campaignData.campaign) {
      return campaignFormInitialValues;
    }

    return {
      name: campaignData.campaign.name,
      dungeonMaster: campaignData.campaign.dungeonMaster._id,
      players: campaignData.campaign.players.map(player => player._id),
    };
  }, [campaignData]);

  return (
    <Flex justify="center" alignItems="center" minHeight="100%" direction={['column', 'row']}>
      <Image src={DragonImg} alt="Dragon Image" m={[0, 10]} width={['65%', 'auto']} />
      <Box m={5} width={['100%', 500]}>
        <Heading size="xl" mb={3}>
          Update your campaign
        </Heading>
        <CampaignForm
          onSubmit={async values => updateCampaign({ variables: { id, ...values } })}
          initialValues={initialValues as typeof campaignFormInitialValues}
        />
      </Box>
    </Flex>
  );
};

export default CampaignUpdatePage;
