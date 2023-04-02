import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { IS_DEVELOPMENT, REACT_APP_GRAPHQL_API_URL } from '@shared/constants/common';

import { StorageService } from '../utils/storage-service';
import { cacheOptions } from './cache-options';

const httpLink = new HttpLink({
  uri: REACT_APP_GRAPHQL_API_URL,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = StorageService.getAccessToken();

  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  });
  return forward(operation);
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const client = new ApolloClient({
  link: from([authMiddleware, errorLink.concat(httpLink)]),
  cache: new InMemoryCache(cacheOptions),
  connectToDevTools: IS_DEVELOPMENT,
  name: 'web',
});
