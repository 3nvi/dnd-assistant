import { gql } from '@apollo/client';
import { Campaign } from './schema';

export const CAMPAIGN_SUMMARY_FRAGMENT = gql`
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
`;

export interface ListCampaigns {
  campaigns: Campaign[];
}
