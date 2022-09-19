import { useMutation, useQuery } from 'react-query';
import Web3 from 'web3';
import engiPurchaseAbi from './engiPurchaseAbi.json';
const uc = require('@polkadot/util-crypto');

// Exact selector for fetching connected provider accounts
// - https://docs.metamask.io/guide/rpc-api.html#restricted-methods
const ETHEREUM_REQUEST_ACCOUNTS_METHOD = 'eth_requestAccounts';
const QUERY_KEY_CONNECT_ETHEREUM_EXTENSION = 'CONNECT_ETHEREUM_EXTENSION';
const NO_GLOBAL_ETHEREUM_ERROR_MESSAGE =
  'Cannot query extension connection without ethereum global.';

const Web3Provider = new Web3(Web3.givenProvider);

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

// The Ethereum-for-Engi purchase contract requires users' substrate addresses to be hex
const substrateToHex = (address) => {
  const ar = uc.decodeAddress(address);

  return (
    '0x' +
    Array.from(ar, function (byte: any) {
      return ('0' + (byte & 0xff).toString(16)).slice(-2);
    }).join('')
  );
};

// - Mainnet:
// - Goerli: https://goerli.etherscan.io/address/0xF7150Be741157ef36EFF47D5464028b950a0df1C
const PURCHASE_CONTRACT_ADDRESS = '0xF7150Be741157ef36EFF47D5464028b950a0df1C';

const EngiPurchaseContract = new Web3Provider.eth.Contract(
  // @ts-ignore
  engiPurchaseAbi,
  PURCHASE_CONTRACT_ADDRESS
);

// Ask the user to sign a transaction of the purchase contract's `deposit` method
export const useBuyEngiWithEth = () =>
  useMutation(
    async ({
      account,
      from,
      amount,
    }: {
      // the user's Engi wallet that will receive tokens
      account: string;
      // the user's Ethereum wallet that must have funds > `amount`
      from: string;
      // the amount of ETH to withdraw in exchange for ENGI
      amount: number;
    }) => {
      if (!window.ethereum) throw new Error(NO_GLOBAL_ETHEREUM_ERROR_MESSAGE);

      return await Web3Provider.eth.sendTransaction({
        from,
        to: PURCHASE_CONTRACT_ADDRESS,
        value: amount,
        data: EngiPurchaseContract.methods
          .deposit(substrateToHex(account))
          .encodeABI(),
      });
    }
  );
