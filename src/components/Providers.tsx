'use client';

import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

type ProvidersProps = {
  children?: React.ReactNode;
};

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

export default function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer />
    </QueryClientProvider>
  );
}
