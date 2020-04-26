/* eslint-disable import/order, import/no-duplicates, @typescript-eslint/no-unused-vars */
import * as Types from '../schema';

import { UserSummary } from '../fragments/userSummary.generated';
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type ListUsersVariables = {};

export type ListUsers = { listUserSummaries: Array<UserSummary> };

export const ListUsersDocument = gql`
  query ListUsers {
    listUserSummaries {
      ...UserSummary
    }
  }
  ${UserSummary}
`;

/**
 * __useListUsers__
 *
 * To run a query within a React component, call `useListUsers` and pass it any options that fit your needs.
 * When your component renders, `useListUsers` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListUsers({
 *   variables: {
 *   },
 * });
 */
export function useListUsers(
  baseOptions?: ApolloReactHooks.QueryHookOptions<ListUsers, ListUsersVariables>
) {
  return ApolloReactHooks.useQuery<ListUsers, ListUsersVariables>(ListUsersDocument, baseOptions);
}
export function useListUsersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ListUsers, ListUsersVariables>
) {
  return ApolloReactHooks.useLazyQuery<ListUsers, ListUsersVariables>(
    ListUsersDocument,
    baseOptions
  );
}
export type ListUsersHookResult = ReturnType<typeof useListUsers>;
export type ListUsersLazyQueryHookResult = ReturnType<typeof useListUsersLazyQuery>;
export type ListUsersQueryResult = ApolloReactCommon.QueryResult<ListUsers, ListUsersVariables>;
