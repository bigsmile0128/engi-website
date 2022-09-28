import { useQuery } from 'react-query';
import {
  QUERY_KEY_CONNECT_POLKADOT_EXTENSION,
  POLKADOT_APP_NAME,
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

      const {
        web3Accounts,
        web3Enable,
        web3FromAddress,
      } = require('@polkadot/extension-dapp');

      // this needs to be called first, before other requests
      // - unused returned list of enabled extensions such as 'talisman', 'polkadot-js'
      await web3Enable(POLKADOT_APP_NAME);

      // returns an array of { address, meta: { name, source } }
      // meta.source contains the name of the extension that provides this account
      return await web3Accounts();
    },
    {
      // Default hold extension connection
      // - invalidate the query to refresh
      staleTime: Infinity,
      cacheTime: Infinity,
      // Don't retry connection if user cancels request
      retry: 0,
      // Don't retry connection if user has canceled request before
      retryOnMount: false,
      // Don't refetch after closing the extension
      refetchOnWindowFocus: false,
    }
  );
