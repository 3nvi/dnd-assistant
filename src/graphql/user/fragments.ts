import { gql } from '@apollo/client';

export const USER_SUMMARY_FRAGMENT = gql`
  fragment UserSummary on User {
    _id
    name
    email
    image
  }
`;
