/* eslint-disable import/order, import/no-duplicates, @typescript-eslint/no-unused-vars */
import * as Types from '../schema';

import gql from 'graphql-tag';

export type CampaignSummary = Pick<Types.Campaign, '_id' | 'name' | 'createdAt' | 'updatedAt'> & {
  dungeonMaster: Pick<Types.User, '_id' | 'name'>;
  players: Array<Pick<Types.User, '_id' | 'name'>>;
};

export const CampaignSummary = gql`
  fragment CampaignSummary on Campaign {
    _id
    name
    createdAt
    updatedAt
    dungeonMaster {
      _id
      name
    }
    players {
      _id
      name
    }
  }
`;
