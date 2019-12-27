import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/Landing';
import Page404 from './pages/404';
import HomePage from './pages/Home';
import CampaignCreationPage from './pages/CampaignCreation';
import useAuth from './hooks/useAuth';
import SplashScreenPage from './pages/Splash';
import withAuthentication from './hoc/withAuthentication';
import urls from './urls';

const Routes: React.FC = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated === undefined) {
    return <SplashScreenPage />;
  }

  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={isAuthenticated ? HomePage : LandingPage} />
        <Route
          exact
          path={urls.campaigns.new()}
          component={withAuthentication(CampaignCreationPage)}
        />
        <Route component={Page404} />
      </Switch>
    </Layout>
  );
};

export default Routes;
