import { useCallback, useEffect } from 'react';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import Layout from '~/components/modules/layout';
import { ToastContainer } from 'react-toastify';

import UserContext from '~/utils/contexts/userContext';
import store from 'store2';
import { isProduction } from '~/utils';
import { usePersistedUserState } from '~/utils/auth/persisted';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import '~/utils/datetime/dayjs-extend';

Sentry.init({
  dsn: 'https://5d4976956f2341fcb8c719bcacb852a0@o1170825.ingest.sentry.io/6294237',
  integrations: [new BrowserTracing()],
  // range of 0.0 to 1.0 where 0.2 is 20% of transactions logged
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV ?? 'production',
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const [user, _setUser] = usePersistedUserState(null);

  // fetch user info from local storage since there is no actual login
  useEffect(() => {
    _setUser(store.get('user'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setUser = useCallback((user) => {
    _setUser(user);
    store.set('user', user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isProduction() && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          console.log('loading gtag manager for engi ${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}')
          gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
        `}
          </Script>
        </>
      )}
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={{ user, setUser }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ReactQueryDevtools initialIsOpen={false} />
          <ToastContainer />
        </UserContext.Provider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
