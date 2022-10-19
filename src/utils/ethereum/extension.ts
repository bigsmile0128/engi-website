import { emitConnectedEthereumExtensionAnalyticsEvent } from './../analytics/events';
import { useQuery } from 'react-query';
import {
  QUERY_KEY_CONNECT_ETHEREUM_EXTENSION,
  NO_GLOBAL_ETHEREUM_ERROR_MESSAGE,
  ETHEREUM_REQUEST_ACCOUNTS_METHOD,
} from './constants';

// Connect to the window's provider by retrieving accounts
// - if not previously connected, calling this query will open the users metamask extension.
//   otherwise, the connected account(s) will be returned "silently"
// - user rejection from within their extension causes `ethereum.request` to throw an error.
//   the error is propagated in { `isError`, `error` }
// - invalidate query on [account] disconnection
export const useConnectEthereumExtension = () =>
  useQuery(
    [QUERY_KEY_CONNECT_ETHEREUM_EXTENSION],
    async () => {
      if (!window.ethereum) throw new Error(NO_GLOBAL_ETHEREUM_ERROR_MESSAGE);

      return await window.ethereum.request({
        method: ETHEREUM_REQUEST_ACCOUNTS_METHOD,
      });
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
      onSuccess(data) {
        emitConnectedEthereumExtensionAnalyticsEvent();
      },
    }
  );
