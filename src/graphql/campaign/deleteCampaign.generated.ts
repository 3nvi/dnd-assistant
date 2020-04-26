/* eslint-disable import/order, import/no-duplicates, @typescript-eslint/no-unused-vars */
import * as Types from '../schema';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type DeleteCampaignVariables = {
  id: Types.Scalars['ID'];
};

export type DeleteCampaign = { deleteCampaign: Pick<Types.CampaignDeletionResponse, 'message'> };

export const DeleteCampaignDocument = gql`
  mutation DeleteCampaign($id: ID!) {
    deleteCampaign(id: $id) {
      message
    }
  }
`;
export type DeleteCampaignMutationFn = ApolloReactCommon.MutationFunction<
  DeleteCampaign,
  DeleteCampaignVariables
>;

/**
 * __useDeleteCampaign__
 *
 * To run a mutation, you first call `useDeleteCampaign` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCampaign` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCampaign, { data, loading, error }] = useDeleteCampaign({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCampaign(
  baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteCampaign, DeleteCampaignVariables>
) {
  return ApolloReactHooks.useMutation<DeleteCampaign, DeleteCampaignVariables>(
    DeleteCampaignDocument,
    baseOptions
  );
}
export type DeleteCampaignHookResult = ReturnType<typeof useDeleteCampaign>;
export type DeleteCampaignMutationResult = ApolloReactCommon.MutationResult<DeleteCampaign>;
export type DeleteCampaignMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteCampaign,
  DeleteCampaignVariables
>;
