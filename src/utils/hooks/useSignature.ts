import { stringToHex } from '@polkadot/util';
import { useMutation } from 'react-query';
import { useUser } from '../contexts/userContext';

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
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { web3FromSource } = require('@polkadot/extension-dapp');
      if (!source || !walletId) {
        throw new Error('User must first be logged in.');
      }
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
