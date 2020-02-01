import React from 'react';
import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/core/dist';
import { Link } from 'react-router-dom';
import urls from 'src/urls';
import { formatDatetime, isRecent } from 'src/utils/time';
import {
  Campaign,
  CampaignDeletionResponse,
  MutationDeleteCampaignArgs,
  Query,
} from 'src/graphql/schema';
import { gql, useMutation, defaultDataIdFromObject } from '@apollo/client';
import { LIST_CAMPAIGNS } from '../index';

export const DELETE_CAMPAIGN = gql`
  mutation DeleteCampaign($id: ID!) {
    deleteCampaign(id: $id) {
      message
    }
  }
`;

interface CampaignListItemProps {
  campaign: Campaign;
}

const CampaignListItem: React.FC<CampaignListItemProps> = ({ campaign }) => {
  const toast = useToast();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [deleteCampaign, { data, loading, error }] = useMutation<
    { deleteCampaign: CampaignDeletionResponse },
    MutationDeleteCampaignArgs
  >(DELETE_CAMPAIGN, {
    variables: {
      id: campaign._id,
    },
    optimisticResponse: () => ({
      deleteCampaign: {
        code: 'CampaignDeletionSuccess',
        message: 'Campaign deleted successfully',
        success: true,
      },
    }),
    update: cache => {
      const { campaigns } = cache.readQuery<Pick<Query, 'campaigns'>>({ query: LIST_CAMPAIGNS })!;
      cache.writeQuery({
        query: LIST_CAMPAIGNS,
        data: { campaigns: campaigns.filter(c => c._id !== campaign._id) },
      });
    },
    onCompleted: data => {
      toast({
        title: data.deleteCampaign.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
  });

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

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={6}>
      <Flex w="100%" align="center">
        <Button
          variant="link"
          variantColor="teal"
          as={Link}
          // @ts-ignore
          to={urls.campaigns.get(campaign._id)}
        >
          {campaign.name}
        </Button>
        {isRecent(campaign.createdAt) && (
          <Badge variantColor="teal" variant="subtle" ml={1} mt={1}>
            New
          </Badge>
        )}
      </Flex>
      <Box w="100%">
        <Text fontSize="xs" color="gray.400" fontWeight={500}>
          Lead by
        </Text>
        <Text fontSize="md" color="gray.500" fontWeight={500}>
          {campaign.dungeonMaster.name}
        </Text>
      </Box>
      <Box w="100%">
        <Box as="ul" style={{ listStyle: 'none' }}>
          <Text fontSize="xs" color="gray.400" fontWeight={500}>
            Featuring
          </Text>
          {campaign.players.map(player => (
            <Text fontSize="md" color="gray.500" fontWeight={500} key={player._id}>
              {player.name}
            </Text>
          ))}
        </Box>
      </Box>
      <Box w="100%">
        <Text fontSize="xs" color="gray.400" fontWeight={500}>
          Created at
        </Text>
        <Text fontSize="md" color="gray.500" fontWeight={500}>
          {formatDatetime(campaign.createdAt)}
        </Text>
      </Box>
      <Box w="100%">
        <Menu>
          {/*
                // @ts-ignore */}
          <MenuButton as={IconButton} icon="moon" aria-label="Options" isRound>
            Actions
          </MenuButton>
          <MenuList>
            <MenuItem py={3} px={6}>
              <Link to={urls.campaigns.edit(campaign._id)}>Edit Campaign</Link>
            </MenuItem>
            <MenuItem py={3} px={6} onClick={onOpen}>
              Delete Campaign
            </MenuItem>
          </MenuList>
        </Menu>
        {isOpen && (
          <Modal isOpen onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Delete Campaign</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text color="gray.500" mb={2}>
                  Are you sure you want to delete <b>{campaign.name}</b>?
                </Text>
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button variantColor="red" onClick={() => deleteCampaign()} isLoading={loading}>
                  Delete
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </Box>
    </Grid>
  );
};

export default CampaignListItem;
