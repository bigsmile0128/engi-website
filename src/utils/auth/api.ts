import {
  emitLoginAnalyticsEvent,
  emitLoginErrorAnalyticsEvent,
  emitRegisterWalletAnalyticsEvent,
  emitRegisterWalletErrorAnalyticsEvent,
} from './../analytics/events';
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from 'axios';
import { gql } from 'graphql-request';
import { useMutation } from 'react-query';
import { User } from '../contexts/userContext';
import useSignature from '../hooks/useSignature';

// The payload required to register a user with Engi
type RegisterUserArgs = {
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
export const useRegisterUser = () => {
  const signatureMutation = useSignature();
  return useMutation<string, AxiosError, RegisterUserArgs>(
    async ({ address, display, email, source }: RegisterUserArgs) => {
      const signature = await signatureMutation.mutateAsync({
        source,
        walletId: address,
      });

      const { data } = await axios.post('/api/graphql', {
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
          signature,
        },
      });

      const errors = data.errors;

      if (errors?.length) throw new Error(errors[0].message);

      return data.data?.auth?.register ?? address;
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
};

type LoginUser = {
  address: string;
  display: string;
  // The Web3 extension source ('polkadot-js', 'talisman') used to sign a login payload
  // - this is retrieved from `account.meta.source` of a connected extension account
  // - see useSubstrateAccounts
  source: string;
};

export const useLoginUser = () => {
  const signatureMutation = useSignature();
  return useMutation<User, AxiosError, any>(
    [],
    async ({ address, source, display }: LoginUser) => {
      const signature = await signatureMutation.mutateAsync({
        source,
        walletId: address,
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
            signature,
          },
        },
      });

      if (response?.data?.errors?.length) {
        throw new Error(response?.data?.errors?.[0]?.message);
      }

      return {
        walletId: address,
        accessToken: response?.data?.data?.auth?.login?.accessToken,
        display,
        source,
      };
    },
    {
      onSuccess({ accessToken }, { address, display, source }) {
        emitLoginAnalyticsEvent(accessToken, address, display, source);
      },
      onError(error, { address, display, source }) {
        emitLoginErrorAnalyticsEvent(error, address, display, source);
      },
    }
  );
};

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
