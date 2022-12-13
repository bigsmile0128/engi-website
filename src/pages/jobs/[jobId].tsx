import * as Sentry from '@sentry/react';
import axios, { AxiosError } from 'axios';
import { Fragment, useState } from 'react';
import { useQuery } from 'react-query';

import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import { gql } from 'graphql-request';
import { useRouter } from 'next/router';
import JobDescription from '~/components/pages/jobDetails/JobDescription';
import JobHeader from '~/components/pages/jobDetails/JobHeader';
import JobTests from '~/components/pages/jobDetails/JobTests';
import { Job } from '~/types';
import JobActivity from '~/components/pages/jobDetails/JobActivity';

export default function JobDetails() {
  const router = useRouter();
  const { jobId } = router.query;
  const [selectedIndex, setSelectedIndex] = useState(0);
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
      <div className="flex flex-1 flex-col overflow-hidden">
        <JobHeader className="mb-8" isLoading={isLoading} data={data} />
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab.List className="flex w-full border-b border-white/30">
            {['Description', 'Tests'].map((name, i) => (
              <Tab as={Fragment} key={name}>
                {({ selected }) => (
                  <button
                    className={classNames(
                      'py-2 -mb-[1px] mr-16',
                      'text-xl',
                      'outline-none focus-visible:ring-1 focus-visible:ring-green-primary',
                      selected && !isLoading
                        ? 'text-green-primary font-bold border-green-primary border-b-[3px]'
                        : 'text-white/80',
                      isLoading ? 'children:skeleton' : ''
                    )}
                  >
                    <span>{name}</span>
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-8">
            <Tab.Panel>
              <JobDescription isLoading={isLoading} data={data} />
            </Tab.Panel>
            <Tab.Panel>
              <JobTests isLoading={isLoading} data={data} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      <JobActivity
        className="hidden lg:flex lg:basis-[400px] xl:basis-[430px] shrink-0"
        data={data}
        isLoading={isLoading}
      />
    </div>
  );
}

async function fetchJobDetails(jobId) {
  const response = await axios.post('/api/graphql', {
    query: gql`
      query JobDetails($jobId: UInt64!) {
        job(id: $jobId) {
          id
          creator
          funding
          repository {
            url
            branch
            commit
            readme
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
        result
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
      jobId,
    },
  });

  return response.data?.data?.job ?? null;
}
