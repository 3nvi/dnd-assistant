import React from 'react';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import queryString from 'query-string';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeAuth0 } from '../config';

export type User = {
  given_name: string;
  family_name: string;
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
  sub: string;
};
/*
  We intentionaly use `undefined` and `null` in the interface below to showcase the possible values
 */
interface AuthContextValue {
  isAuthenticated: boolean | undefined;
  user: User | null;
  login: () => void;
  logout: () => void;
  getAccessToken: () => Promise<string>;
  updateUserInfo: () => void;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

const AuthProvider: React.FC = ({ children }) => {
  // Stores the mutable (due to initialization) auth0 client that handles tokens/users/etc.
  const auth0Client = React.useRef<Auth0Client>();
  // Stores whether the system should consider the current user as logged-in or not. This can be
  // true without `user` being present, since `user` comes asynchronously from Auth0, thus
  // it's *always* initially `null`.
  const [isAuthenticated, setAuthenticated] = React.useState<boolean>();
  // Stores the currently authenticated user of the app
  const [user, setUser] = React.useState<User | null>(null);

  const location = useLocation();
  const history = useHistory();

  React.useEffect(() => {
    (async () => {
      auth0Client.current = await initializeAuth0();

      let userValue;
      let isAuthenticatedValue;

      const { code } = queryString.parse(location.search) as { code?: string };
      if (code) {
        try {
          await auth0Client.current.handleRedirectCallback();
          setAuthenticated(true);

          userValue = await auth0Client.current.getUser();
          setUser(userValue);
        } catch (e) {
          return history.push('/');
        }
      } else {
        isAuthenticatedValue = await auth0Client.current.isAuthenticated();
        if (isAuthenticatedValue) {
          setAuthenticated(isAuthenticatedValue);

          userValue = await auth0Client.current.getUser();
          setUser(userValue);
        }
      }
    })();
  }, []);

  /**
   * @public
   * Signs the user in our system
   *
   */
  const login = React.useCallback(async () => {
    if (!auth0Client.current) {
      throw new Error('Auth0 client is not initialized');
    }
    await auth0Client.current.loginWithRedirect({
      redirect_uri: window.location.href,
    });
  }, []);

  /**
   * @public
   * Signs the user out and redirects to the landing page
   *
   */
  const logout = React.useCallback(() => {
    if (!auth0Client.current) {
      throw new Error('Auth0 client is not initialized');
    }
    auth0Client.current.logout({ returnTo: '/' });
  }, []);

  /**
   * @public
   * Gets the current access token for the user or requests a new one through the refresh token
   * (if the existing access tokenn has expired)
   *
   */
  const getAccessToken = React.useCallback(async () => {
    if (!auth0Client.current) {
      throw new Error('Auth0 client is not initialized');
    }

    try {
      return await auth0Client.current.getTokenSilently();
    } catch (e) {
      alert(e);
    }
  }, []);

  /**
   *
   * @public
   * Updates the user's personal information
   *
   */
  const updateUserInfo = React.useCallback(() => {
    // TODO Implement through Auth0-js
  }, [user]);

  /**
   * @public
   * The `isAuthenticated` has an undefined value whenever we haven't yet figured out if the user
   * is or isn't authenticated cause we are on the process of examining his token. It has a boolean
   * value in any other case
   */
  const contextValue = React.useMemo(
    () => ({
      isAuthenticated,
      user,
      updateUserInfo,
      getAccessToken,
      login,
      logout,
    }),
    [isAuthenticated, user]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
