import { gql } from 'graphql-request';
import { useQuery } from 'react-query';
import { UserGithubEnrollment } from '~/types';
import { useUser } from '../contexts/userContext';
import useAxios from './useAxios';

export default function useGithubEnrollments() {
  const axios = useAxios();
  const { user } = useUser();
  return useQuery<UserGithubEnrollment[]>(
    ['githubEnrollments', user?.accessToken],
    async () => {
      const { data } = await axios.post('/api/graphql', {
        query: gql`
          query GithubEnrollments {
            auth {
              currentUser {
                display
                email
                createdOn
                githubEnrollments {
                  installationId
                  createdOn
                  owner {
                    login
                    avatarUrl
                  }
                }
              }
            }
          }
        `,
      });

      if (data.errors?.length > 0) {
        throw new Error(
          data?.errors?.[0]?.message ?? 'Unable to get Github enrollments.'
        );
      }

      return data?.data?.auth?.currentUser?.githubEnrollments ?? [];
    }
  );
}
