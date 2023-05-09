'use client';

import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastContainer } from 'react-toastify';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { usePersistedUserState } from '~/utils/auth/persisted';
import UserContext, { User } from '~/utils/contexts/userContext';

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
  const [persistedUser, setUser] = usePersistedUserState(null);
  // to prevent SSR hydration mismatch, store user in state to handle initial render
  const [user, setStateUser] = useState<User>(null);

  // keep state user updated with persisted user
  useEffect(() => {
    setStateUser(persistedUser);
  }, [persistedUser]);
  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ user, setUser }}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
        <ToastContainer />
      </UserContext.Provider>
    </QueryClientProvider>
  );
}
