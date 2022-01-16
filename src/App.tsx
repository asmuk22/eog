import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Wrapper from './components/Wrapper';
import ChartScreen from './Features/ChartScreen/ChartScreen';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});

const url = 'https://react.eogresources.com/graphql';

const httpLink = new HttpLink({
  uri: url,
});

const wsLink = new WebSocketLink({
  uri: url.replace('https', 'wss'),
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition'
      && definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Wrapper>
        <ChartScreen />
      </Wrapper>
    </MuiThemeProvider>
  </ApolloProvider>
);

export default App;
