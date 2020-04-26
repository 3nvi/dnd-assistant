import React from 'react';
import CampaignForm from 'src/forms/CampaignForm';
import DragonImg from 'src/assets/dragon.png';
import { Box, Flex, Heading, Image, useToast } from '@chakra-ui/core/dist';
import { useRouteMatch } from 'react-router-dom';
import { campaignFormInitialValues } from '../CampaignCreation';
import { useGetCampaignSummary } from '../../graphql/campaign/getCampaignSummary.generated';
import { useUpdateCampaign } from '../../graphql/campaign/updateCampaign.generated';

const CampaignUpdatePage: React.FC = () => {
  const toast = useToast();
  const {
    params: { id },
  } = useRouteMatch<{ id: string }>();

  const { data } = useGetCampaignSummary({
    variables: {
      id,
    },
    onError: () =>
      toast({
        title: 'Failed to fetch stored campaign',
        status: 'error',
        duration: 3000,
        isClosable: true,
      }),
  });

  const [updateCampaign] = useUpdateCampaign({
    onCompleted: data =>
      toast({
        title: data.updateCampaign.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      }),
    onError: error =>
      toast({
        title: 'Failed to update campaign',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      }),
  });

  const initialValues = React.useMemo(() => {
    if (!data || !data.getCampaignDetails) {
      return campaignFormInitialValues;
    }

    return {
      name: data.getCampaignDetails.name,
      dungeonMaster: data.getCampaignDetails.dungeonMaster._id,
      players: data.getCampaignDetails.players.map(player => player._id),
    };
  }, [data]);

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
