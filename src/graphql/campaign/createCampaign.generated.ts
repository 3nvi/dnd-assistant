/* eslint-disable import/order, import/no-duplicates, @typescript-eslint/no-unused-vars */
import * as Types from '../schema';

import { CampaignSummary } from '../fragments/campaignSummary.generated';
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type CreateCampaignVariables = {
  name: Types.Scalars['String'];
  dungeonMaster: Types.Scalars['String'];
  players: Array<Types.Scalars['String']>;
};

export type CreateCampaign = { createCampaign: { campaign?: Types.Maybe<CampaignSummary> } };

export const CreateCampaignDocument = gql`
  mutation CreateCampaign($name: String!, $dungeonMaster: String!, $players: [String!]!) {
    createCampaign(name: $name, dungeonMaster: $dungeonMaster, players: $players) {
      campaign {
        ...CampaignSummary
      }
    }
  }
  ${CampaignSummary}
`;
export type CreateCampaignMutationFn = ApolloReactCommon.MutationFunction<
  CreateCampaign,
  CreateCampaignVariables
>;

/**
 * __useCreateCampaign__
 *
 * To run a mutation, you first call `useCreateCampaign` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCampaign` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCampaign, { data, loading, error }] = useCreateCampaign({
 *   variables: {
 *      name: // value for 'name'
 *      dungeonMaster: // value for 'dungeonMaster'
 *      players: // value for 'players'
 *   },
 * });
 */
export function useCreateCampaign(
  baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCampaign, CreateCampaignVariables>
) {
  return ApolloReactHooks.useMutation<CreateCampaign, CreateCampaignVariables>(
    CreateCampaignDocument,
    baseOptions
  );
}
export type CreateCampaignHookResult = ReturnType<typeof useCreateCampaign>;
export type CreateCampaignMutationResult = ApolloReactCommon.MutationResult<CreateCampaign>;
export type CreateCampaignMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateCampaign,
  CreateCampaignVariables
>;
