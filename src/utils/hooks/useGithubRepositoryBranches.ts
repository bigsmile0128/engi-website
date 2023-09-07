import { gql } from 'graphql-request';
import { useQuery } from 'react-query';
import useAxios from './useAxios';

export default function useGithubRepositoryBranches(repositoryFullName) {
  const axios = useAxios();
  return useQuery<string[]>(
    ['githubRepositoryBranches', repositoryFullName],
    async () => {
      if (!repositoryFullName) {
        return [];
      }
      const { data } = await axios.post('/api/graphql', {
        query: gql`
          query GithubRepositoryBranches($repositoryUrl: String!) {
            github {
              branches(repositoryUrl: $repositoryUrl)
            }
          }
        `,
        variables: {
          repositoryUrl: `https://github.com/${repositoryFullName}`,
        },
      });

      if (data.errors?.length > 0) {
        throw new Error(
          data?.errors?.[0]?.message ??
            'Unable to get Github repository branches.'
        );
      }

      return data?.data?.github?.branches ?? [];
    }
  );
}
