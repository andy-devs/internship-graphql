import '@app/assets/styles/reset.css';
import '@app/assets/styles/fonts.css';
import '@app/assets/styles/globals.css';

import { ApolloProvider } from '@apollo/client';
import { ToasterProvider } from '@app/providers/toaster/toaster-provider';
import { client } from '@shared/services/apollo/apollo-client';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>My Feed</title>
        <meta name="description" content="Blog application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ApolloProvider client={client}>
        <ToasterProvider>
          <Component {...pageProps} />
        </ToasterProvider>
      </ApolloProvider>
    </>
  );
}
