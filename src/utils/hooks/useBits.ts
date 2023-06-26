import {
  emitFoundBitsErrorAnalyticsEvent,
  emitFoundBitsAnalyticsEvent,
} from '../analytics/events';
import { gql } from 'graphql-request';
import { useQuery } from 'react-query';
import { BitsQueryArguments } from '~/types';
import * as Sentry from '@sentry/react';
import axios from 'axios';
import { useUser } from '../contexts/userContext';

export default function useBits(query: BitsQueryArguments) {
  const { user } = useUser();
  return useQuery<any, any>(
    ['bits', JSON.stringify(query)],
    () => fetchBits(query),
    {
      onError: (error) => {
        Sentry.captureException(error);
        emitFoundBitsErrorAnalyticsEvent(error);
      },
      onSuccess(data) {
        emitFoundBitsAnalyticsEvent(data?.result?.totalCount, user?.walletId);
      },
    }
  );
}

async function fetchBits(query: BitsQueryArguments) {
  let data;
  try {
    const response = await axios.post('/api/graphql', {
      query: gql`
        query BitSearch($query: JobsQueryArguments!) {
          jobs(query: $query) {
            result {
              totalCount
              items {
                id
                creator
                funding
                repository {
                  url
                  branch
                  commit
                }
                technologies
                name
                tests {
                  ...test
                }
                requirements {
                  isEditable
                  isAddable
                  isDeletable
                }
                solution {
                  solutionId
                  jobId
                  author
                  patchUrl
                  attempt {
                    attemptId
                    attempter
                    tests {
                      ...testAttempt
                    }
                  }
                }
                createdOn {
                  ...blockReference
                }
                updatedOn {
                  ...blockReference
                }
                status
                attemptCount
                solutionUserCount
                averageProgress {
                  numerator
                  denominator
                }
              }
            }
          }
        }

        fragment test on Test {
          id
          required
        }

        fragment testAttempt on TestAttempt {
          id
          result
          failedResultMessage
        }

        fragment blockReference on BlockReference {
          number
          dateTime
        }
      `,
      variables: {
        query,
      },
    });

    data = response.data;
  } catch (error) {
    // catch 400 from bad request
    throw new Error(
      error.response?.data?.errors?.[0]?.message ?? 'Unable to fetch bounties.'
    );
  }

  // catch error from a field failing to resolve
  if (data.errors?.length > 0) {
    throw new Error(data?.errors?.[0]?.message ?? 'Unable to fetch bounties.');
  }

  return data?.data?.jobs ?? {};
}
