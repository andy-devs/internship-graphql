import 'shared/styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { client } from 'shared/services/apollo/apollo-client';
import { ToasterProvider } from 'app/providers/toaster/toaster-provider';

import 'reset.css';
import 'fonts.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ToasterProvider>
        <Component {...pageProps} />
      </ToasterProvider>
    </ApolloProvider>
  );
}
