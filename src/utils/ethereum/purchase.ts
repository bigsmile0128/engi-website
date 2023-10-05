import { useMutation } from 'react-query';
import {
  emitBoughtEngiAnalyticsEvent,
  emitBoughtEngiErrorAnalyticsEvent,
} from './../analytics/events';
import {
  NO_GLOBAL_ETHEREUM_ERROR_MESSAGE,
  PURCHASE_CONTRACT_ADDRESS,
  Web3Provider,
} from './constants';
import engiPurchaseAbi from './engiPurchaseAbi.json';
import { substrateToHex } from './substrate';

const EngiPurchaseContract = new Web3Provider.eth.Contract(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  engiPurchaseAbi,
  PURCHASE_CONTRACT_ADDRESS
);

// Ask the user to sign a transaction of the purchase contract's `deposit` method
export const useBuyEngiWithEth = () =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useMutation<any, Error, any>(
    async ({
      account,
      from,
      amount,
    }: {
      // the user's Engi wallet that will receive tokens
      account: string;
      // the amount of ETH to withdraw in exchange for ENGI
      amount: number;
      // the user's Ethereum wallet that must have funds > `amount`
      from: string;
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
    },
    {
      onSuccess(_, { account, amount }) {
        emitBoughtEngiAnalyticsEvent(account, amount);
      },
      onError(error, { account, amount }) {
        emitBoughtEngiErrorAnalyticsEvent(error, account, amount);
      },
    }
  );
