import React from 'react';
import { useQuery } from 'react-query';
import axios, { AxiosError } from 'axios';
import * as Sentry from '@sentry/react';

import { useRouter } from 'next/router';
import { Job } from '~/types';
import JobHeader from '~/components/pages/jobDetails/JobHeader';
import JobDescription from '~/components/pages/jobDetails/JobDescription';
import JobActivity from '~/components/pages/jobDetails/JobActivity';
import { gql } from 'graphql-request';

export default function JobDetails() {
  const router = useRouter();
  const { jobId } = router.query;
  const { isLoading, isError, data } = useQuery<Job>(
    ['jobDetails', jobId],
    () => {
      if (!jobId) {
        return null;
      }
      return fetchJobDetails(jobId);
    },
    {
      onError: (error: AxiosError) => {
        Sentry.captureException(error, (scope) => {
          scope.clear();
          scope.setTransactionName('GET {jobId}');
          scope.setTag('jobId', jobId.toString());
          return scope;
        });
      },
    }
  );

  return isError ? (
    <div className="flex flex-col items-center justify-center py-24">
      <p className="font-grifter text-3xl text-center">
        Something went wrong...
      </p>
    </div>
  ) : !isLoading && !data ? (
    <div className="flex flex-col items-center justify-center py-24">
      <p className="font-grifter text-3xl text-center">Unable to find job...</p>
    </div>
  ) : (
    <div className="max-w-page mt-12 mb-24 flex flex-col lg:flex-row gap-16">
      <div className="flex flex-1 flex-col">
        <JobHeader isLoading={isLoading} data={data} />
        <JobDescription className="mt-8" isLoading={isLoading} data={data} />
      </div>
      <JobActivity
        className="lg:basis-[400px] xl:basis-[430px]"
        data={data}
        isLoading={isLoading}
      />
    </div>
  );
}

async function fetchJobDetails(jobId) {
  const response = await axios.post('/api/graphql', {
    query: gql`
      query JobDetails {
        job(id: ${jobId}) {
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

      fragment test on Test {
        id
        analysisResult
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
  });

  return response.data?.data?.job ?? null;
}
