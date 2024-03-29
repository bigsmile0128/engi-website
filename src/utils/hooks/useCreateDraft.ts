import { gql } from 'graphql-request';
import { useMutation } from 'react-query';
import useAxios from './useAxios';
import useSignature from './useSignature';
import { SubstrateAccount } from '~/types';

export default function useCreateDraft() {
  const axios = useAxios();
  const signatureMutation = useSignature();
  return useMutation<string, any, any>(
    ['startDraft'],
    async ({
      repository,
      branch,
      commit,
      substrateAccount,
    }: {
      branch: string;
      commit: string;
      repository: string;
      substrateAccount: SubstrateAccount;
    }) => {
      const signature = await signatureMutation.mutateAsync({
        source: substrateAccount.meta.source,
        walletId: substrateAccount.address,
      });
      const { data } = await axios.post('/api/graphql', {
        query: gql`
          mutation CreateDraft(
            $createArgs: CreateDraftArguments!
            $signatureArgs: SignatureArguments!
          ) {
            draft {
              create(args: $createArgs, signature: $signatureArgs)
            }
          }
        `,
        variables: {
          createArgs: {
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
