/* eslint-disable import/order, import/no-duplicates, @typescript-eslint/no-unused-vars */
import * as Types from '../schema';

import { CampaignSummary } from '../fragments/campaignSummary.generated';
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type GetCampaignSummaryVariables = {
  id: Types.Scalars['ID'];
};

export type GetCampaignSummary = { getCampaignDetails?: Types.Maybe<CampaignSummary> };

export const GetCampaignSummaryDocument = gql`
  query GetCampaignSummary($id: ID!) {
    getCampaignDetails(id: $id) {
      ...CampaignSummary
    }
  }
  ${CampaignSummary}
`;

/**
 * __useGetCampaignSummary__
 *
 * To run a query within a React component, call `useGetCampaignSummary` and pass it any options that fit your needs.
 * When your component renders, `useGetCampaignSummary` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCampaignSummary({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCampaignSummary(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetCampaignSummary, GetCampaignSummaryVariables>
) {
  return ApolloReactHooks.useQuery<GetCampaignSummary, GetCampaignSummaryVariables>(
    GetCampaignSummaryDocument,
    baseOptions
  );
}
export function useGetCampaignSummaryLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetCampaignSummary,
    GetCampaignSummaryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<GetCampaignSummary, GetCampaignSummaryVariables>(
    GetCampaignSummaryDocument,
    baseOptions
  );
}
export type GetCampaignSummaryHookResult = ReturnType<typeof useGetCampaignSummary>;
export type GetCampaignSummaryLazyQueryHookResult = ReturnType<
  typeof useGetCampaignSummaryLazyQuery
>;
export type GetCampaignSummaryQueryResult = ApolloReactCommon.QueryResult<
  GetCampaignSummary,
  GetCampaignSummaryVariables
>;
