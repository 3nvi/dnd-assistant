import React from 'react';
import { Router } from 'react-router-dom';
import { ThemeProvider, ColorModeProvider, CSSReset, theme } from '@chakra-ui/core';
import Routes from './Routes';
import { AuthProvider } from './context/auth-context';
import history from './history';
import ApolloProvider from './components/ApolloProvider';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider value="light">
        <CSSReset />
        <Router history={history}>
          <AuthProvider>
            <ApolloProvider>
              <Routes />
            </ApolloProvider>
          </AuthProvider>
        </Router>
      </ColorModeProvider>
    </ThemeProvider>
  );
};

export default App;
