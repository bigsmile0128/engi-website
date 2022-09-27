import { useMutation, useQuery } from 'react-query';
import Web3 from 'web3';
import engiPurchaseAbi from './engiPurchaseAbi.json';
import {
  Web3Provider,
  PURCHASE_CONTRACT_ADDRESS,
  NO_GLOBAL_ETHEREUM_ERROR_MESSAGE,
} from './constants';

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
