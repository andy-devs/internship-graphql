export const REACT_APP_GRAPHQL_API_URL = process.env.REACT_APP_GRAPHQL_API_URL;
export const NODE_ENV = process.env.NODE_ENV;
export const IS_DEVELOPMENT = NODE_ENV === 'development';

export const FILE_ACCEPTS = {
  image: { 'image/*': ['.jpeg', '.png'] },
  pdf: { 'application/pdf': ['.pdf'] },
};
