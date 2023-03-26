import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache } from '@apollo/client';
import { IS_DEVELOPMENT, REACT_APP_GRAPHQL_API_URL } from 'shared/constants/common';

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

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(cacheOptions),
  connectToDevTools: IS_DEVELOPMENT,
  name: 'web',
});
