import '@app/assets/styles/reset.css';
import '@app/assets/styles/fonts.css';
import '@app/assets/styles/globals.css';

import { ApolloProvider } from '@apollo/client';
import { ToasterProvider } from '@app/providers/toaster/toaster-provider';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { client } from '@shared/services/apollo/apollo-client';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import { ModalProvider } from 'react-modal-hook';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Head>
        <title>My Feed</title>
        <meta name="description" content="Blog application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <script
          dangerouslySetInnerHTML={{
            __html: `
          if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }

          `,
          }}
        />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ModalProvider>
          <ApolloProvider client={client}>
            <ToasterProvider>
              <Component {...pageProps} />
            </ToasterProvider>
          </ApolloProvider>
        </ModalProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
