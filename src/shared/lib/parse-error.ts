import { ApolloError } from '@apollo/client';
import { ERROR_TEXTS } from '@shared/constants/error-texts';

export const parseError = ({ message, networkError }: ApolloError) => {
  if (networkError) return ERROR_TEXTS.unknownError;

  if (message) return message;

  return ERROR_TEXTS.unknownError;
};
