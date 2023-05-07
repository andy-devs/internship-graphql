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
  images: {
    domains: ['internship-social-media-files.s3.us-east-1.amazonaws.com'],
  },
  async redirects() {
    return [
      {
        source: '/profile',
        destination: '/',
        permanent: false,
      },
      {
        source: '/ui-kit',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
