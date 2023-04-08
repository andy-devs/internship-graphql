import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="dark:bg-grayscale-800 bg-grayscale300">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
