import axios from 'axios';
import { gql } from 'graphql-request';
import { useQuery } from 'react-query';
import { JobSubmissionsDetailsPagedQueryArguments } from '~/types';

export default function useBountySubmissions(
  query: JobSubmissionsDetailsPagedQueryArguments
) {
  return useQuery<any, any>(['bountySubmissions', JSON.stringify(query)], () =>
    fetchBountySubmissions(query)
  );
}

async function fetchBountySubmissions(
  query: JobSubmissionsDetailsPagedQueryArguments
) {
  let data;
  try {
    // TODO: pass in bounty ID as variable after gql schema is updated to support taking in string ID
    const response = await axios.post('/api/graphql', {
      query: gql`
        query BountySubmissions($skip: Int!, $limit: Int!) {
          submissions(query: { skip: $skip, limit: $limit, jobId: ${query.jobId} }) {
            items {
              status
              userInfo {
                address
                display
                profileImageUrl
                createdOn
                createdJobsCount
                solvedJobsCount
              }
              attemptId
              attempt {
                status
                results {
                  identifier
                  stdout
                  stderr
                  returnCode
                }
              }
              solve {
                status
                results {
                  solutionId
                  resultHash
                }
              }
            }
            totalCount
          }
        }
      `,
      variables: {
        skip: query.skip,
        limit: query.limit,
      },
    });

    data = response.data;
  } catch (error) {
    // catch 400 from bad request
    throw new Error(
      error.response?.data?.errors?.[0]?.message ??
        'Unable to fetch submissions.'
    );
  }

  // catch error from a field failing to resolve
  if (data.errors?.length > 0) {
    throw new Error(
      data?.errors?.[0]?.message ?? 'Unable to fetch submissions.'
    );
  }

  return data?.data?.submissions ?? {};
}
