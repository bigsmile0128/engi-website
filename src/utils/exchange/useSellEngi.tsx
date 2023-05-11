/// sell
import pMinDelay from 'p-min-delay';
import { useMutation } from 'react-query';
import { User } from '../contexts/userContext';
import { engiToWoz } from '../currency/conversion';
import chainAPI from '../polkadot/chainAPI';
import {
  emitSoldEngiAnalyticsEvent,
  emitSoldEngiErrorAnalyticsEvent,
} from './../analytics/events';

// Ask the user to sign a native extrinsic to sell ENGI for ETH
export const useSellEngiForEth = () =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useMutation<any, Error, any>(
    async ({
      fromUser,
      toAccount,
      amount,
    }: {
      // the amount of ENGI to sell in exchange for ETH
      amount: number;
      // the user's Engi wallet that will sell ENGI
      fromUser: NonNullable<User>;
      // the user's Ethereum wallet that will receive ETH
      toAccount: string;
    }) => {
      console.log('Selling Engi:', fromUser, toAccount, amount);

      if (typeof window === 'undefined') return;

      const {
        web3FromSource,
        web3Enable,
        // eslint-disable-next-line @typescript-eslint/no-var-requires
      } = require('@polkadot/extension-dapp');

      const chain = await chainAPI();

      // this needs to be called first, before other requests
      // add 1 sec min delay to prevent flash of loader
      const _: any = await pMinDelay(web3Enable('Engi'), 1000);

      const injector = await web3FromSource(fromUser.source);
      return chain.tx.exchange
        .sell(toAccount, engiToWoz(amount))
        .signAndSend(fromUser.walletId, { signer: injector.signer });
    },
    {
      onSuccess(_, { fromUser, toAccount, amount }) {
        emitSoldEngiAnalyticsEvent(fromUser, toAccount, amount);
      },
      onError(error, { fromUser, toAccount, amount }) {
        emitSoldEngiErrorAnalyticsEvent(error, fromUser, toAccount, amount);
      },
    }
  );
