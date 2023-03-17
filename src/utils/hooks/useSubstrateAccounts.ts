import { useQuery } from 'react-query';
import { AccountExistenceResult, SubstrateAccount } from '~/types';
import pMinDelay from 'p-min-delay';
import { emitConnectedPolkadotExtensionAnalyticsEvent } from '../analytics/events';
import useAccountExistence from './useAccountExistence';

// Connect to the window's Polkadot provider by retrieving accounts
// - if not previously connected, calling this query will open the users substrate extension.
//   otherwise, the connected account(s) will be returned "silently"
// - rejecting `web3Enable` does not throw an error, the returned accounts will just be empty
// - invalidate query on account disconnection
export default function useSubstrateAccounts() {
  const existMutation = useAccountExistence();

  return useQuery<SubstrateAccount[], any>(
    ['polkadotAccounts'],
    async () => {
      if (typeof window === 'undefined') return;

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { web3Accounts, web3Enable } = require('@polkadot/extension-dapp');

      // this needs to be called first, before other requests
      // add 1 sec min delay to prevent flash of loader
      const enabledExtensions: any = await pMinDelay(web3Enable('Engi'), 1000);

      if (!enabledExtensions.length)
        throw new Error('No connected extension found');

      // returns an array of { address, meta: { name, source } }
      // meta.source contains the name of the extension that provides this account
      const accounts: SubstrateAccount[] = await web3Accounts();

      const addresses = accounts.map((account) => account.address);

      let accountExistence: Record<string, AccountExistenceResult> = {};
      try {
        accountExistence = await existMutation.mutateAsync(addresses);
        accounts.forEach((account) => {
          account.exists =
            accountExistence[account.address] ?? AccountExistenceResult.NO;
        });
        accounts.sort((a, b) => Number(b.exists) - Number(a.exists));
      } catch (error) {
        console.warn(error?.message || 'Failed to check account existence.');
      }

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
