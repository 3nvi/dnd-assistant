/* eslint-disable import/order, import/no-duplicates, @typescript-eslint/no-unused-vars */
import * as Types from '../schema';

import gql from 'graphql-tag';

export type UserSummary = Pick<Types.User, '_id' | 'name' | 'email' | 'image'>;

export const UserSummary = gql`
  fragment UserSummary on User {
    _id
    name
    email
    image
  }
`;
