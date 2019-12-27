import createAuth0Client from '@auth0/auth0-spa-js';

export const initializeAuth0 = () =>
  createAuth0Client({
    domain: process.env.REACT_APP_AUTH0_DOMAIN as string,
    client_id: process.env.REACT_APP_AUTH0_CLIENT_ID as string,
    redirect_uri: 'http://localhost:3000',
  });
