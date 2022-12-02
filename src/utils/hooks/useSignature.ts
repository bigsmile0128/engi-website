import { stringToHex } from '@polkadot/util';
import { useMutation } from 'react-query';
import { useUser } from '../contexts/userContext';

export type Signature = {
  signedOn: string;
  value: string;
};

export default function useSignature() {
  const { user } = useUser();

  return useMutation<Signature | null>(
    ['signature', user?.source, user?.walletId],
    async () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { web3FromSource } = require('@polkadot/extension-dapp');
      if (!user.source || !user.walletId) {
        throw new Error('User must first be logged in.');
      }
      const injector = await web3FromSource(user.source);

      const signRaw = injector?.signer?.signRaw;

      if (!signRaw)
        throw new Error('Cannot sign message with non-existent extension');

      const time = new Date();

      // this opens the user's browser extension
      // - the request to sign the message can be rejected
      const { signature: value } = await signRaw({
        address: user?.walletId,
        data: stringToHex(`${user.walletId}|${time.getTime()}`),
        type: 'bytes',
      });

      return {
        signedOn: time.toISOString(),
        value,
      };
    }
  );
}
