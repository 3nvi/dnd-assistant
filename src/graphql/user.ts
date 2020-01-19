import { gql } from '@apollo/client';
import { User } from './schema';

export const USER_SUMMARY_FRAGMENT = gql`
  fragment UserSummary on User {
    _id
    name
    email
    image
  }
`;

export const LIST_USERS = gql`
  query ListUsers {
    users {
      ...UserSummary
    }
  }
`;

export interface ListUsers {
  users: User[];
}
