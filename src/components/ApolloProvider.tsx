import React from 'react';
import { ApolloProvider as OriginalApolloProvider } from '@apollo/client';
import useAuth from '../hooks/useAuth';
import createApolloClient from '../client';

const ApolloProvider: React.FC = ({ children }) => {
  const { getAccessToken } = useAuth();

  const client = React.useMemo(() => createApolloClient(getAccessToken), [getAccessToken]);

  return <OriginalApolloProvider client={client}>{children}</OriginalApolloProvider>;
};

export default ApolloProvider;
