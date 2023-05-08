import { InMemoryCacheConfig } from '@apollo/client';
import unionBy from 'lodash/unionBy';

export const cacheOptions: InMemoryCacheConfig = {
  typePolicies: {
    Query: {
      fields: {
        posts: {
          keyArgs: ['data', ['id'], 'pageInfo', ['afterCursor', 'count', 'perPage']],
          merge: (existing: any, incoming: any, { args }: any) => {
            const incomingResult = incoming ? incoming.data : [];
            const existingResult = existing ? existing.data : [];

            if (args) {
              const resultPagination = unionBy(existingResult, incomingResult, '__ref');

              return {
                ...incoming,
                data: resultPagination,
              };
            }
            return incoming;
          },
        },
        favouritePosts: {
          keyArgs: ['data', ['id'], 'pageInfo', ['afterCursor', 'count', 'perPage']],
          merge: (existing: any, incoming: any, { args }: any) => {
            const incomingResult = incoming ? incoming.data : [];
            const existingResult = existing ? existing.data : [];

            if (args) {
              const resultPagination = unionBy(existingResult, incomingResult, '__ref');

              return {
                ...incoming,
                data: resultPagination,
              };
            }
            return incoming;
          },
        },
        myPosts: {
          keyArgs: ['data', ['id'], 'pageInfo', ['afterCursor', 'count', 'perPage']],
          merge: (existing: any, incoming: any, { args }: any) => {
            const incomingResult = incoming ? incoming.data : [];
            const existingResult = existing ? existing.data : [];

            if (args) {
              const resultPagination = unionBy(existingResult, incomingResult, '__ref');

              return {
                ...incoming,
                data: resultPagination,
              };
            }
            return incoming;
          },
        },
      },
    },
  },
};
