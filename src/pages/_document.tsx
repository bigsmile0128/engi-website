import { Html, Head, Main, NextScript } from 'next/document';
import { isDev } from '~/utils';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="color-scheme" content="dark" />
      </Head>
      <body className={isDev() ? 'debug-screens' : ''}>
        <Main />
        <div id="portal" />
        <NextScript />
      </body>
    </Html>
  );
}
