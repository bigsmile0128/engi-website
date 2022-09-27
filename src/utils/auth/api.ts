import { encryptMnemonic } from './encrypt';
import { useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { gql } from 'graphql-request';

// The payload required to register a user with Engi
type RegisterUser = {
  display: string;
  email: string;
  // This is encrypted to `encryptedPkcs8Key` before being sent in the request
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
          mutation RegisterUser(
            $display: String!
            $email: String!
            $encryptedPkcs8Key: String!
          ) {
            createUser(
              user: {
                display: $display
                email: $email
                encryptedPkcs8Key: $encryptedPkcs8Key
              }
            ) {
              address
            }
          }
        `,
        operationName: 'RegisterUser',
        variables: {
          display,
          email,
          encryptedPkcs8Key,
        },
      });

      console.log(response);
      return response?.data?.data?.registerUser?.address;
    }
  );
