import { stringToHex } from '@polkadot/util';
import { useMutation } from 'react-query';
import { useUser } from '../contexts/userContext';
import pMinDelay from 'p-min-delay';

export type Signature = {
  signedOn: string;
  value: string;
};

type SignatureArgs = {
  source?: string;
  walletId?: string;
} | null;

export default function useSignature() {
  const { user } = useUser();

  return useMutation<Signature | null, any, SignatureArgs>(
    ['signature', user?.source, user?.walletId],
    async (args: SignatureArgs) => {
      const source = args?.source || user?.source;
      const walletId = args?.walletId || user?.walletId;
      const {
        web3FromSource,
        web3Enable,
        // eslint-disable-next-line @typescript-eslint/no-var-requires
      } = require('@polkadot/extension-dapp');
      if (!source || !walletId) {
        throw new Error('User must first be logged in.');
      }

      await pMinDelay(web3Enable('Engi'), 1000);
      const injector = await web3FromSource(source);

      const signRaw = injector?.signer?.signRaw;

      if (!signRaw) {
        throw new Error('Cannot sign message without extension.');
      }

      const time = new Date();

      // this opens the user's browser extension
      // - the request to sign the message can be rejected
      const { signature: value } = await signRaw({
        address: walletId,
        data: stringToHex(`${walletId}|${time.getTime()}`),
        type: 'bytes',
      });

      return {
        signedOn: time.toISOString(),
        value,
      };
    }
  );
}
