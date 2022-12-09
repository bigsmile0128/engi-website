import { useQuery } from 'react-query';
import { SubstrateAccount } from '~/types';
import { emitConnectedPolkadotExtensionAnalyticsEvent } from '../analytics/events';
import useAccountExistence from './useAccountExistence';

// Connect to the window's Polkadot provider by retrieving accounts
// - if not previously connected, calling this query will open the users substrate extension.
//   otherwise, the connected account(s) will be returned "silently"
// - rejecting `web3Enable` does not throw an error, the returned accounts will just be empty
// - invalidate query on account disconnection
export default function useSubstrateAccounts() {
  const existMutation = useAccountExistence();

  return useQuery<SubstrateAccount[]>(
    ['polkadotAccounts'],
    async () => {
      if (typeof window === 'undefined') return;

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { web3Accounts, web3Enable } = require('@polkadot/extension-dapp');

      // this needs to be called first, before other requests
      const enabledExtensions = await web3Enable('Engi');

      if (!enabledExtensions.length)
        throw new Error('No connected extension found');

      // returns an array of { address, meta: { name, source } }
      // meta.source contains the name of the extension that provides this account
      const accounts: SubstrateAccount[] = await web3Accounts();

      const addresses = accounts.map((account) => account.address);

      // TODO: remove try/catch when ENGIN-805 is fixed to not require auth
      let accountExistence: Record<string, boolean> = {};
      try {
        accountExistence = await existMutation.mutateAsync(addresses);
      } catch (error) {
        console.warn(error?.message || 'Failed to check existence.');
      }

      console.log('accountExistence', accountExistence);

      return accounts;
    },
    {
      // Default hold extension connection
      // - invalidate the query to refresh
      cacheTime: Infinity,
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
}
