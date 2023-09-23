import { gql } from 'graphql-request';
import { useMutation } from 'react-query';
import useAxios from './useAxios';

export default function useUpdateDraft() {
  const axios = useAxios();
  return useMutation<string, any, any>(['updateDraft'], async (args: any) => {
    const { data } = await axios.post('/api/graphql', {
      query: gql`
        mutation UpdateDraft($updateArgs: UpdateDraftArguments!) {
          draft {
            update(args: $updateArgs)
          }
        }
      `,
      variables: {
        updateArgs: args,
      },
    });

    if (data.errors?.length > 0) {
      throw new Error(data?.errors?.[0]?.message ?? 'Unable to update draft.');
    }
    return data?.data?.analysis?.update ?? '';
  });
}
