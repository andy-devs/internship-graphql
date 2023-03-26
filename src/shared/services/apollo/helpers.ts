import unionBy from 'lodash/unionBy';

export const customMerge = (existing: any, incoming: any, { args }: any) => {
  const incomingResult = incoming ? incoming.items : [];
  const existingResult = existing ? existing.items : [];

  if (args) {
    const resultPagination = unionBy(existingResult, incomingResult, '__ref');

    return {
      ...incoming,
      items: resultPagination,
    };
  }
  return incoming;
};
