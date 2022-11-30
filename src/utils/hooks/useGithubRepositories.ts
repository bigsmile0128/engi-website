import { gql } from 'graphql-request';
import { useQuery } from 'react-query';
import { GithubRepositoryWithOwner } from '~/types';
import { useUser } from '../contexts/userContext';
import useAxios from './useAxios';

export default function useGithubRepositories() {
  const axios = useAxios();
  const { user } = useUser();
  return useQuery<GithubRepositoryWithOwner[]>(
    ['githubRepositories', user?.accessToken],
    async () => {
      const { data } = await axios.post('/api/graphql', {
        query: gql`
          query GithubRepositories {
            github {
              repositories {
                name
                fullName
                isPrivate
                owner {
                  login
                  avatarUrl
                }
              }
            }
          }
        `,
      });

      if (data.errors?.length > 0) {
        throw new Error(
          data?.errors?.[0]?.message ?? 'Unable to get Github repositories.'
        );
      }

      return data?.data?.github?.repositories ?? [];
    }
  );
}
