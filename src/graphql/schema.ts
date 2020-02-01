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
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
};

export type CampaignCreationResponse = MutationResponse & {
  __typename?: 'CampaignCreationResponse';
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
  campaign?: Maybe<Campaign>;
};

export type CampaignDeletionResponse = MutationResponse & {
  __typename?: 'CampaignDeletionResponse';
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCampaign: CampaignCreationResponse;
  deleteCampaign: CampaignDeletionResponse;
};

export type MutationCreateCampaignArgs = {
  name: Scalars['String'];
  dungeonMaster: Scalars['String'];
  players: Array<Maybe<Scalars['String']>>;
};

export type MutationDeleteCampaignArgs = {
  id: Scalars['ID'];
};

export type MutationResponse = {
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  campaigns: Array<Campaign>;
  users: Array<User>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  campaigns: Array<Maybe<Campaign>>;
};
