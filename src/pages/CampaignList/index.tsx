import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { ReactComponent as WarningIllustration } from 'src/assets/warning-illustration.svg';
import { ReactComponent as EmptyIllustration } from 'src/assets/empty-box-illustration.svg';
import { CAMPAIGN_SUMMARY_FRAGMENT } from 'src/graphql/campaign';
import { Query } from 'src/graphql/schema';
import { Box, Button, Flex, Heading, Spinner, Text } from '@chakra-ui/core/dist';
import { Link } from 'react-router-dom';
import urls from 'src/urls';
import CampaignListItem from './subcomponents/CampaignListItem';

export const LIST_CAMPAIGNS = gql`
  query ListCampaigns {
    campaigns {
      ...CampaignSummary
    }
  }
  ${CAMPAIGN_SUMMARY_FRAGMENT}
`;

const CampaignListPage: React.FC = () => {
  const { data, loading, error } = useQuery<Pick<Query, 'campaigns'>>(LIST_CAMPAIGNS);

  if (loading) {
    return (
      <Flex width="100%" height="100vh" justify="center" align="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return <WarningIllustration />;
  }

  if (!data?.campaigns.length) {
    return (
      <Flex align="center" justify="center">
        <EmptyIllustration width={400} />
        <Heading size="md" mb={3}>
          You don't seem to have any campaigns
        </Heading>
        <Text fontSize="md" color="gray.100" mb={6}>
          Why don't you create one
        </Text>
        {/*
          // @ts-ignore */}
        <Button variantColor="teal" as={Link} to={urls.campaigns.list()}>
          Create a Campaign
        </Button>
      </Flex>
    );
  }

  return (
    <Box
      bg="white"
      borderRadius="lg"
      boxShadow="md"
      as="ol"
      border="1px"
      borderColor="gray.100"
      style={{ listStyle: 'none' }}
    >
      <Box as="li" borderBottom="1px" borderBottomColor="gray.100" p={5}>
        <Heading as="h2" size="md">
          Campaigns
        </Heading>
      </Box>
      {data.campaigns.map(campaign => (
        <Box as="li" borderBottom="1px" borderBottomColor="gray.100" p={5} key={campaign._id}>
          <CampaignListItem campaign={campaign} />
        </Box>
      ))}
    </Box>
  );
};

export default CampaignListPage;
