import { gql } from '@apollo/client';

export const CAMPAIGN_SUMMARY_FRAGMENT = gql`
  fragment CampaignSummary on Campaign {
    _id
    name
    createdAt
    updatedAt
    dungeonMaster {
      name
    }
    players {
      _id
      name
    }
  }
`;