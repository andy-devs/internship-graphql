import { InMemoryCacheConfig } from '@apollo/client';

import { customMerge } from './helpers';

export const cacheOptions: InMemoryCacheConfig = {
  typePolicies: {
    Query: {
      fields: {
        searchOrganizations: {
          keyArgs: ['items', ['id'], 'page', 'perPage'],
          merge: customMerge,
        },
      },
    },
  },
};
