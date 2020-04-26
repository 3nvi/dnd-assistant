export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date scalar type */
  Date: any;
  /** The `Upload` scalar type represents a file upload. */
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

export type CampaignUpdateResponse = MutationResponse & {
  __typename?: 'CampaignUpdateResponse';
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
  campaign?: Maybe<Campaign>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _placeholder?: Maybe<Scalars['String']>;
  createCampaign: CampaignCreationResponse;
  updateCampaign: CampaignCreationResponse;
  deleteCampaign: CampaignDeletionResponse;
};

export type MutationCreateCampaignArgs = {
  name: Scalars['String'];
  dungeonMaster: Scalars['String'];
  players: Array<Scalars['String']>;
};

export type MutationUpdateCampaignArgs = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  players?: Maybe<Array<Scalars['String']>>;
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
  _placeholder?: Maybe<Scalars['String']>;
  listUserSummaries: Array<User>;
  getCampaignDetails?: Maybe<Campaign>;
  listCampaignSummaries: Array<Campaign>;
};

export type QueryGetCampaignDetailsArgs = {
  id: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  campaigns: Array<Maybe<Campaign>>;
};
