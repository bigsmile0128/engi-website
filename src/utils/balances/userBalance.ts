import { gql } from 'graphql-request';
import { QUERY_KEY_ACCOUNT_BALANCE } from './constants';
import { useQuery } from 'react-query';
import axios from 'axios';

// get the free balance of an account ID
export const useBalance = (id: string) =>
  useQuery([QUERY_KEY_ACCOUNT_BALANCE, id], async () => {
    const response = await axios.post('/api/graphql', {
      query: gql`
        query WalletCheck($id: String!) {
          account(id: $id) {
            data {
              free
            }
          }
        }
      `,
      variables: {
        id,
      },
    });

    return response.data?.data?.account?.data?.free;
  });
