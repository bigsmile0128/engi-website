import { gql } from 'graphql-request';
import { useMutation } from 'react-query';
import useAxios from './useAxios';
import useSignature from './useSignature';

export default function useAnalyzeRepository() {
  const axios = useAxios();
  const signatureMutation = useSignature();
  return useMutation<string, any, any>(
    ['analyzeRepository'],
    async ({ repository, branch, commit }) => {
      const signature = await signatureMutation.mutateAsync(null);
      const { data } = await axios.post('/api/graphql', {
        query: gql`
          mutation AnalyzeRepo(
            $submitArgs: SubmitDraftArguments!
            $signatureArgs: SignatureArguments!
          ) {
            draft {
              submit(args: $submitArgs, signature: $signatureArgs)
            }
          }
        `,
        variables: {
          submitArgs: {
            url: `https://github.com/${repository}`,
            branch,
            commit,
            name: 'test job',
            isAddable: '.*',
            isEditable: '.*',
            isDeletable: '.*',
            funding: 100000000,
            tests: [],
          },
          signatureArgs: signature,
        },
      });

      if (data.errors?.length > 0) {
        throw new Error(
          data?.errors?.[0]?.message ?? 'Unable to analyze Github repository.'
        );
      }
      return data?.data?.analysis?.submit ?? '';
    }
  );
}
