import { response } from 'express';
import { gql } from 'graphql-request';
import { useMutation } from 'react-query';
import { useUser } from '../contexts/userContext';
import useAxios from './useAxios';
import useSignature from './useSignature';

type AnalyzeRepositoryArgs = {
  branch: string;
  commit: string;
  repository: string;
};

export default function useAnalyzeRepository({
  repository,
  branch,
  commit,
}: AnalyzeRepositoryArgs) {
  const axios = useAxios();
  const { user } = useUser();
  const signatureMutation = useSignature();
  return useMutation(
    ['analyzeRepository', user?.accessToken, repository, branch, commit],
    async () => {
      const signature = await signatureMutation.mutateAsync();
      const { data } = await axios.post('/api/graphql', {
        query: gql`
          mutation AnalyzeRepo(
            $submitArgs: SubmitAnalysisArguments!
            $signatureArgs: SignatureArguments!
          ) {
            analysis {
              submit(args: $submitArgs, signature: $signatureArgs)
            }
          }
        `,
        variables: {
          submitArgs: {
            url: `https://github.com/${repository}`,
            branch,
            commit,
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
