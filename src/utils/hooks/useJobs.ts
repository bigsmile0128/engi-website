import {
  emitFoundJobsErrorAnalyticsEvent,
  emitFoundJobsAnalyticsEvent,
} from './../analytics/events';
import { gql, request } from 'graphql-request';
import { useQuery } from 'react-query';
import { JobsQueryArguments } from '~/types';
import * as Sentry from '@sentry/react';
import axios from 'axios';

export default function useJobs(query: JobsQueryArguments) {
  return useQuery(['jobs', JSON.stringify(query)], () => fetchJobs(query), {
    onError: (error) => {
      Sentry.captureException(error);
      emitFoundJobsErrorAnalyticsEvent(error);
    },
    onSuccess(data) {
      emitFoundJobsAnalyticsEvent(data?.jobs?.results?.items);
    },
  });
}

async function fetchJobs(query: JobsQueryArguments) {
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
  return response.data?.data?.jobs ?? {};
}
