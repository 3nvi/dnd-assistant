import { ApolloClient, HttpLink, InMemoryCache, ApolloLink } from '@apollo/client';
import { setContext } from 'apollo-link-context';
import { Campaign, QueryCampaignArgs } from 'src/graphql/schema';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/',
});

// We need a function to retrieve the access token. The auth client that returns them lives in the
// "React world", so we can't directly import and access it
const createAuthLink = (getAccessToken: () => Promise<string>) =>
  (setContext(async (_, { headers }) => {
    // get the authentication token
    const accessToken = await getAccessToken();
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    };
  }) as unknown) as ApolloLink;

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        campaign: (existing, { args, toReference }) =>
          existing ||
          toReference({
            __typename: 'Campaign',
            _id: (args as QueryCampaignArgs).id,
          } as Pick<Campaign, '__typename' | '_id'>),
      },
    },
  },
});

const createApolloClient = (getAccessToken: () => Promise<string>) => {
  const authLink = createAuthLink(getAccessToken);

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
  });
};

export default createApolloClient;
