import { gql } from '@apollo/client';
import { Campaign, MutationResponse } from './schema';

const CAMPAIGN_SUMMARY_FRAGMENT = gql`
  fragment CampaignSummary on Campaign {
    _id
    name
    dungeonMaster {
      name
    }
    players {
      name
    }
  }
`;

export const LIST_CAMPAIGNS = gql`
  query ListCampaigns {
    campaigns {
      ...CampaignSummary
    }
  }
  ${CAMPAIGN_SUMMARY_FRAGMENT}
`;
export interface ListCampaigns {
  campaigns: Campaign[];
}

export const CREATE_CAMPAIGN = gql`
  mutation CreateCampaign($name: String!, $dungeonMaster: String!, $players: String!) {
    createCampaign(name: $name, dungeonMaster: $dungeonMaster, players: $players) {
      campaign {
        ...CampaignSummary
      }
    }
  }
  ${CAMPAIGN_SUMMARY_FRAGMENT}
`;
export type CreateCampaign = MutationResponse & { campaign: Campaign };
export type CreateCampaignInput = {
  name: string;
  dungeonMaster: string;
  players: string[];
};
