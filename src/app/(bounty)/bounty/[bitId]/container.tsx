'use client';

import * as Sentry from '@sentry/react';
import axios, { AxiosError } from 'axios';
import { Fragment, useState } from 'react';
import { useQuery } from 'react-query';

import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import { gql } from 'graphql-request';
import BitActivity from '~/app/(bounty)/bounty/[bitId]/BitActivity';
import BitDescription from '~/app/(bounty)/bounty/[bitId]/BitDescription';
import BitHeader from '~/app/(bounty)/bounty/[bitId]/BitHeader';
import BitSubmissions from '~/app/(bounty)/bounty/[bitId]/BitSubmissions';
import BitTests from '~/app/(bounty)/bounty/[bitId]/BitTests';
import GetStarted from '~/app/(bounty)/bounty/[bitId]/GetStarted';
import { Bit } from '~/types';

export default function BitDetailsContainer({ bitId }: { bitId: string }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { isLoading, isError, data } = useQuery<Bit>(
    ['bitDetails', bitId],
    () => {
      return fetchBitDetails(bitId);
    },
    {
      onError: (error: AxiosError) => {
        Sentry.captureException(error, (scope) => {
          scope.clear();
          scope.setTransactionName('GET {bitId}');
          scope.setTag('bitId', bitId.toString());
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
      <p className="font-grifter text-3xl text-center">Unable to find bit...</p>
    </div>
  ) : (
    <div className="relative mt-4 tablet:mt-12 mb-24">
      <BitHeader isLoading={isLoading} data={data} />
      <div className="max-w-page flex flex-col desktop:flex-row mt-8 tablet:mt-8">
        <div className="flex-1">
          <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
            <Tab.List className="flex w-full border-b border-white/30 gap-12 tablet:gap-16">
              {['Description', 'Tests', 'Submissions'].map((name) => (
                <Tab as={Fragment} key={name}>
                  {({ selected }) => (
                    <button
                      className={classNames(
                        'py-2 -mb-[1px]',
                        'text-lg focus-green-primary',
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
                <BitDescription isLoading={isLoading} data={data} />
              </Tab.Panel>
              <Tab.Panel>
                <BitTests isLoading={isLoading} data={data} />
              </Tab.Panel>
              <Tab.Panel>
                <BitSubmissions />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
        <BitActivity
          bitId={bitId?.toString()}
          className="hidden lg:flex lg:basis-[400px] xl:basis-[430px] shrink-0 ml-16"
          data={data}
          isLoading={isLoading}
        />
      </div>
      {/* TABLET "Get Started" fixed section on bottom */}
      <GetStarted
        className={classNames(
          'fixed bottom-0 w-full z-50 px-0',
          'hidden tablet:block desktop:hidden'
        )}
        bitId={bitId?.toString()}
      />
    </div>
  );
}

async function fetchBitDetails(bitId) {
  if (!bitId) {
    throw new Error('Bounty ID missing.');
  }
  const response = await axios.post('/api/graphql', {
    query: gql`
      query BitDetails($bitId: UInt64!) {
        job(id: $bitId) {
          job {
            id
            creator
            funding
            repository {
              url
              branch
              commit
              readme
              organization
              name
              fullName
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
          creatorUserInfo {
            address
            display
            profileImageUrl
            createdOn
            createdJobsCount
            solvedJobsCount
          }
        }
      }

      fragment test on Test {
        id
        result
        required
        failedResultMessage
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
      bitId,
    },
  });

  const data = response.data?.data?.job ?? {};

  const job = {
    ...data?.job,
    creatorUserInfo: {
      ...data?.creatorUserInfo,
    },
  };

  console.log('job', job);

  return job;
}
