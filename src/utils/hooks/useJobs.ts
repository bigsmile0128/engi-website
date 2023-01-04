import {
  emitFoundJobsErrorAnalyticsEvent,
  emitFoundJobsAnalyticsEvent,
} from './../analytics/events';
import { gql } from 'graphql-request';
import { useQuery } from 'react-query';
import { JobsQueryArguments } from '~/types';
import * as Sentry from '@sentry/react';
import axios from 'axios';
import { useUser } from '../contexts/userContext';

export default function useJobs(query: JobsQueryArguments) {
  const { user } = useUser();
  return useQuery<any, any>(
    ['jobs', JSON.stringify(query)],
    () => fetchJobs(query),
    {
      onError: (error) => {
        Sentry.captureException(error);
        emitFoundJobsErrorAnalyticsEvent(error);
      },
      onSuccess(data) {
        emitFoundJobsAnalyticsEvent(data?.result?.totalCount, user?.walletId);
      },
    }
  );
}

async function fetchJobs(query: JobsQueryArguments) {
  let data;
  try {
    const response = await axios.post('/api/graphql', {
      query: gql`
        query JobSearch($query: JobsQueryArguments!) {
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
                language
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
      error.response?.data?.errors?.[0]?.message ?? 'Unable to fetch jobs.'
    );
  }

  // catch error from a field failing to resolve
  if (data.errors?.length > 0) {
    throw new Error(data?.errors?.[0]?.message ?? 'Unable to fetch jobs.');
  }

  return data?.data?.jobs ?? {};
}
