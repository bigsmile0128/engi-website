import { gql } from 'graphql-request';
import { useMutation } from 'react-query';
import { AccountExistenceResult } from '~/types';
import useAxios from './useAxios';

export default function useAccountExistence() {
  const axios = useAxios();
  return useMutation(['accountExistence'], async (addresses: string[]) => {
    const { data } = await axios.post('/api/graphql', {
      query: gql`
        query AccountExistence($addresses: [String]!) {
          accounts {
            existence(addresses: $addresses) {
              address
              exists
            }
          }
        }
      `,
      variables: {
        addresses,
      },
    });

    if (data.errors?.length > 0) {
      throw new Error(
        data?.errors?.[0]?.message ?? 'Unable to check if accounts exist.'
      );
    }

    const accountExistence: Record<string, AccountExistenceResult> = {};
    (data?.data?.accounts?.existence ?? [])
      .filter(Boolean)
      .forEach(({ address, exists }) => {
        accountExistence[address.Id] = exists;
      });

    return accountExistence;
  });
}
