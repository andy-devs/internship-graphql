const path = require('path');

const dotenv = require('dotenv');

dotenv.config({
  path: '/.env',
});

const nextConfig = {
  reactStrictMode: true,
  env: {
    REACT_APP_GRAPHQL_API_URL: process.env.REACT_APP_GRAPHQL_API_URL,
    REACT_APP_AWS_API_URL: process.env.REACT_APP_AWS_API_URL,
  },
};

module.exports = nextConfig;
