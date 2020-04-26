/* eslint-disable import/order, import/no-duplicates, @typescript-eslint/no-unused-vars */
import * as Types from '../schema';

import { CampaignSummary } from '../fragments/campaignSummary.generated';
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type UpdateCampaignVariables = {
  id: Types.Scalars['ID'];
  name: Types.Scalars['String'];
  players?: Types.Maybe<Array<Types.Scalars['String']>>;
};

export type UpdateCampaign = {
  updateCampaign: Pick<Types.CampaignCreationResponse, 'message'> & {
    campaign?: Types.Maybe<CampaignSummary>;
  };
};

export const UpdateCampaignDocument = gql`
  mutation UpdateCampaign($id: ID!, $name: String!, $players: [String!]) {
    updateCampaign(id: $id, name: $name, players: $players) {
      campaign {
        ...CampaignSummary
      }
      message
    }
  }
  ${CampaignSummary}
`;
export type UpdateCampaignMutationFn = ApolloReactCommon.MutationFunction<
  UpdateCampaign,
  UpdateCampaignVariables
>;

/**
 * __useUpdateCampaign__
 *
 * To run a mutation, you first call `useUpdateCampaign` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCampaign` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCampaign, { data, loading, error }] = useUpdateCampaign({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      players: // value for 'players'
 *   },
 * });
 */
export function useUpdateCampaign(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateCampaign, UpdateCampaignVariables>
) {
  return ApolloReactHooks.useMutation<UpdateCampaign, UpdateCampaignVariables>(
    UpdateCampaignDocument,
    baseOptions
  );
}
export type UpdateCampaignHookResult = ReturnType<typeof useUpdateCampaign>;
export type UpdateCampaignMutationResult = ApolloReactCommon.MutationResult<UpdateCampaign>;
export type UpdateCampaignMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateCampaign,
  UpdateCampaignVariables
>;
