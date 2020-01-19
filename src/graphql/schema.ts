export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Upload: any;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

export type Campaign = {
  __typename?: 'Campaign';
  _id: Scalars['ID'];
  name: Scalars['String'];
  dungeonMaster: User;
  players: Array<User>;
};

export type MutationResponse = {
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  campaigns: Array<Maybe<Campaign>>;
  users: Array<Maybe<User>>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  image?: Maybe<Scalars['String']>;
};
