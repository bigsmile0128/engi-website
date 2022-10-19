import {
  emitRegisterWalletAnalyticsEvent,
  emitLoginAnalyticsEvent,
  emitLoginErrorAnalyticsEvent,
  emitRegisterWalletErrorAnalyticsEvent,
  emitRegisterWalAnalyticsEvent,
} from './../analytics/events';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { gql } from 'graphql-request';
import { NO_POLKADOT_SOURCE_AVAILABLE_ERROR_MESSAGE } from '../polkadot/constants';
import { stringToHex } from '@polkadot/util';

// The payload required to register a user with Engi
type RegisterUser = {
  address: string;
  display: string;
  email: string;
  // The Web3 extension source ('polkadot-js', 'talisman') to generate the register signature
  source: string;
};

// User's create their private keys outside of Engi such as in Subwallet, Talisman, or on the Polkadot UI
// - users securely register their keys with Engi
// - errors if,
//   - API returns `DUPE_EMAIL` error code for a user that's already been registered
export const useRegisterUser = () =>
  useMutation<string, AxiosError, any>(
    async ({ address, display, email, source }: RegisterUser) => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { web3FromSource } = require('@polkadot/extension-dapp');

      const injector = await web3FromSource(source);

      const signRaw = injector?.signer?.signRaw;

      if (!signRaw) throw new Error(NO_POLKADOT_SOURCE_AVAILABLE_ERROR_MESSAGE);

      const time = new Date();

      // this opens the user's browser extension
      // - the request to sign the message can be rejected
      const { signature } = await signRaw({
        address,
        data: stringToHex(`${address}|${time.getTime()}`),
        type: 'bytes',
      });

      const response = await axios.post('/api/graphql', {
        query: gql`
          mutation RegisterUser(
            $user: CreateUserArguments!
            $signature: SignatureArguments!
          ) {
            auth {
              register(user: $user, signature: $signature)
            }
          }
        `,
        operationName: 'RegisterUser',
        variables: {
          user: {
            address,
            display,
            email,
          },
          signature: {
            signedOn: time.toISOString(),
            value: signature,
          },
        },
      });

      const errors = response?.data?.errors;

      if (errors?.length) throw new Error(errors[0].message);

      return response?.data?.data?.auth?.register ?? address;
    },
    {
      onSuccess(_, { address, display, email, source }) {
        emitRegisterWalletAnalyticsEvent(address, display, email, source);
      },
      onError(error, { address, display, email, source }) {
        emitRegisterWalletErrorAnalyticsEvent(
          error,
          address,
          display,
          email,
          source
        );
      },
    }
  );

type LoginUser = {
  address: string;
  display: string;
  // The Web3 extension source ('polkadot-js', 'talisman') used to sign a login payload
  // - this is retrieved from `account.meta.source` of a connected extension account
  // - see useConnectPolkadotExtension
  source: string;
};

export const useLoginUser = () =>
  useMutation<
    { accessToken: string; address: string; display: string },
    AxiosError,
    any
  >(
    async ({ address, source, display }: LoginUser) => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { web3FromSource } = require('@polkadot/extension-dapp');

      const injector = await web3FromSource(source);

      const signRaw = injector?.signer?.signRaw;

      if (!signRaw) throw new Error(NO_POLKADOT_SOURCE_AVAILABLE_ERROR_MESSAGE);

      const time = new Date();

      // this opens the user's browser extension
      // - the request to sign the message can be rejected
      const { signature } = await signRaw({
        address,
        data: stringToHex(`${address}|${time.getTime()}`),
        type: 'bytes',
      });

      const response = await axios.post('/api/graphql', {
        query: gql`
          mutation LoginUser($loginArgs: LoginArguments!) {
            auth {
              login(args: $loginArgs) {
                accessToken
              }
            }
          }
        `,
        operationName: 'LoginUser',
        variables: {
          loginArgs: {
            address,
            signature: {
              signedOn: time.toISOString(),
              value: signature,
            },
          },
        },
      });

      if (response?.data?.errors?.length) {
        throw new Error(response?.data?.errors?.[0]?.message);
      }

      return {
        address,
        accessToken: response?.data?.data?.auth?.login?.accessToken,
        display,
      };
    },
    {
      onSuccess({ accessToken }, { address, display, source }, context) {
        emitLoginAnalyticsEvent(accessToken, address, display, source);
      },
      onError(error, { address, display, source }) {
        emitLoginErrorAnalyticsEvent(error, address, display, source);
      },
    }
  );

type ConfirmEmail = {
  address: string;
  token: string;
};

export const useConfirmEmail = () =>
  useMutation<{ address: string; token: string }, AxiosError, any>(
    async ({ address, token }: ConfirmEmail) => {
      const response = await axios.post('/api/graphql', {
        query: gql`
          mutation ConfirmEmail($confirmEmailArgs: ConfirmEmailArguments!) {
            auth {
              confirmEmail(args: $confirmEmailArgs)
            }
          }
        `,
        operationName: 'ConfirmEmail',
        variables: {
          confirmEmailArgs: {
            address,
            token,
          },
        },
      });

      if (response?.data?.errors?.length) {
        throw new Error(response?.data?.errors?.[0]?.message);
      }

      return response?.data?.data?.auth?.confirmEmail;
    }
  );
