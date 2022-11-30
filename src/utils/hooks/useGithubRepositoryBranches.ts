import { gql } from 'graphql-request';
import { useQuery } from 'react-query';
import { useUser } from '../contexts/userContext';
import useAxios from './useAxios';

export default function useGithubRepositoryBranches(repositoryFullName) {
  const axios = useAxios();
  const { user } = useUser();
  return useQuery<string[]>(
    ['githubRepositoryBranches', user?.accessToken, repositoryFullName],
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
