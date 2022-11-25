import { gql } from 'graphql-request';
import { useQuery } from 'react-query';
import { Commit } from '~/types';
import useAxios from './useAxios';

export default function useGithubBranchCommits(repositoryFullName, branch) {
  const axios = useAxios();
  return useQuery<Commit[]>(
    ['githubBranchCommits', repositoryFullName, branch],
    async () => {
      if (!repositoryFullName || !branch) {
        return [];
      }
      const { data } = await axios.post('/api/graphql', {
        query: gql`
          query GithubBranchCommits($repositoryUrl: String!, $branch: String!) {
            github {
              commits(repositoryUrl: $repositoryUrl, branch: $branch) {
                sha
                message
                author
                committer
              }
            }
          }
        `,
        variables: {
          repositoryUrl: `https://github.com/${repositoryFullName}`,
          branch,
        },
      });

      if (data.errors?.length > 0) {
        throw new Error(
          data?.errors?.[0]?.message ??
            'Unable to get Github repository branches.'
        );
      }

      return data?.data?.github?.commits ?? [];
    }
  );
}
