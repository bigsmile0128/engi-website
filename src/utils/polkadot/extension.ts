import { emitConnectedPolkadotExtensionAnalyticsEvent } from './../analytics/events';
/* eslint-disable @typescript-eslint/no-var-requires */
import { useQuery } from 'react-query';
import {
  QUERY_KEY_CONNECT_POLKADOT_EXTENSION,
  POLKADOT_APP_NAME,
  NO_EXTENSIONS_CONNECTED_ERROR_MESSAGE,
} from './constants';

// Connect to the window's Polkadot provider by retrieving accounts
// - if not previously connected, calling this query will open the users substrate extension.
//   otherwise, the connected account(s) will be returned "silently"
// - rejecting `web3Enable` does not throw an error, the returned accounts will just be empty
// - invalidate query on account disconnection
export const useConnectPolkadotExtension = () =>
  useQuery(
    [QUERY_KEY_CONNECT_POLKADOT_EXTENSION],
    async () => {
      if (typeof window === 'undefined') return;

      const { web3Accounts, web3Enable } = require('@polkadot/extension-dapp');

      // this needs to be called first, before other requests
      const enabledExtensions = await web3Enable(POLKADOT_APP_NAME);

      if (!enabledExtensions.length)
        throw new Error(NO_EXTENSIONS_CONNECTED_ERROR_MESSAGE);

      // returns an array of { address, meta: { name, source } }
      // meta.source contains the name of the extension that provides this account
      return await web3Accounts();
    },
    {
      // Default hold extension connection
      // - invalidate the query to refresh
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      retry: 0,
      retryOnMount: false,
      staleTime: Infinity,
      // Don't retry connection if user cancels request
      // Don't retry connection if user has canceled request before
      // Don't refetch after closing the extension
      onSuccess() {
        emitConnectedPolkadotExtensionAnalyticsEvent();
      },
    }
  );
