import { encryptMnemonic } from './encrypt';
import { useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { gql } from 'graphql-request';
import { NO_POLKADOT_SOURCE_AVAILABLE_ERROR_MESSAGE } from '../polkadot/constants';

// The payload required to register a user with Engi
type RegisterUser = {
  display: string;
  email: string;
  // This is encrypted to `encryptedPkcs8Key` before being sent in the request
  mnemonic: string;
};

type RegisterUserMutationArguments = {
  display: string;
  email: string;
  mnemonic: string;
};

// User's create their private keys outside of Engi such as in Subwallet, Talisman, or on the Polkadot UI
// - users securely register their keys with Engi
export const useRegisterUser = () =>
  useMutation<any, AxiosError, any>(
    async ({ display, email, mnemonic }: RegisterUser) => {
      const encryptedPkcs8Key = await encryptMnemonic(mnemonic);

      const response = await axios.post('/api/graphql', {
        query: gql`
          mutation RegisterUser($user: CreateUserArguments!) {
            auth {
              register(user: $user)
            }
          }
        `,
        operationName: 'RegisterUser',
        variables: {
          user: {
            display,
            email,
            encryptedPkcs8Key,
          },
        },
      });

      return response?.data?.data?.registerUser?.address;
    }
  );

type LoginUser = {
  address: string;
  // The Web3 extension source ('polkadot-js', 'talisman') used to sign a login payload
  // - this is retrieved from `account.meta.source` of a connected extension account
  // - see useConnectPolkadotExtension
  source: string;
};

export const useLoginUser = () =>
  useMutation<any, AxiosError, any>(async ({ address, source }: LoginUser) => {
    const { web3FromSource } = require('@polkadot/extension-dapp');

    const injector = await web3FromSource(source);

    const signRaw = injector?.signer?.signRaw;

    if (!signRaw) throw new Error(NO_POLKADOT_SOURCE_AVAILABLE_ERROR_MESSAGE);

    const { signature } = await signRaw({
      address,
      type: 'bytes',
    });

    const response = await axios.post('/api/graphql', {
      query: gql`
        mutation LoginUser(
          $address: String!
          $signature: String!
          $signedOn: String!
        ) {
          login(
            args: {
              address: $address
              signature: { signedOn: $signedOn, value: $signature }
            }
          ) {
            address
          }
        }
      `,
      operationName: 'LoginUser',
      variables: {
        address,
        signedOn: Date.now(),
        signature,
      },
    });

    return response?.data?.data?.loginUser?.address;
  });
