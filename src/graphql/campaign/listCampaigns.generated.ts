/* eslint-disable import/order, import/no-duplicates, @typescript-eslint/no-unused-vars */
import * as Types from '../schema';

import { CampaignSummary } from '../fragments/campaignSummary.generated';
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type ListCampaignsVariables = {};

export type ListCampaigns = { listCampaignSummaries: Array<CampaignSummary> };

export const ListCampaignsDocument = gql`
  query ListCampaigns {
    listCampaignSummaries {
      ...CampaignSummary
    }
  }
  ${CampaignSummary}
`;

/**
 * __useListCampaigns__
 *
 * To run a query within a React component, call `useListCampaigns` and pass it any options that fit your needs.
 * When your component renders, `useListCampaigns` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListCampaigns({
 *   variables: {
 *   },
 * });
 */
export function useListCampaigns(
  baseOptions?: ApolloReactHooks.QueryHookOptions<ListCampaigns, ListCampaignsVariables>
) {
  return ApolloReactHooks.useQuery<ListCampaigns, ListCampaignsVariables>(
    ListCampaignsDocument,
    baseOptions
  );
}
export function useListCampaignsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ListCampaigns, ListCampaignsVariables>
) {
  return ApolloReactHooks.useLazyQuery<ListCampaigns, ListCampaignsVariables>(
    ListCampaignsDocument,
    baseOptions
  );
}
export type ListCampaignsHookResult = ReturnType<typeof useListCampaigns>;
export type ListCampaignsLazyQueryHookResult = ReturnType<typeof useListCampaignsLazyQuery>;
export type ListCampaignsQueryResult = ApolloReactCommon.QueryResult<
  ListCampaigns,
  ListCampaignsVariables
>;
