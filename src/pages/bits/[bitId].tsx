import * as Sentry from '@sentry/react';
import axios, { AxiosError } from 'axios';
import { Fragment, useState } from 'react';
import { useQuery } from 'react-query';

import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import { gql } from 'graphql-request';
import { useRouter } from 'next/router';
import BitDescription from '~/components/pages/bitDetails/BitDescription';
import BitHeader from '~/components/pages/bitDetails/BitHeader';
import BitTests from '~/components/pages/bitDetails/BitTests';
import { Bit } from '~/types';
import BitActivity from '~/components/pages/bitDetails/BitActivity';

export default function BitDetails() {
  const router = useRouter();
  const { bitId } = router.query;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { isLoading, isError, data } = useQuery<Bit>(
    ['bitDetails', bitId],
    () => {
      if (!bitId) {
        return null;
      }
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
    <div className="mt-4 tablet:mt-12 mb-24">
      <BitHeader isLoading={isLoading} data={data} />
      <div className="max-w-page flex flex-col desktop:flex-row mt-12 tablet:mt-8">
        <div className="flex-1">
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
                <BitDescription isLoading={isLoading} data={data} />
              </Tab.Panel>
              <Tab.Panel>
                <BitTests isLoading={isLoading} data={data} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
        <BitActivity
          className="hidden lg:flex lg:basis-[400px] xl:basis-[430px] shrink-0 ml-16"
          data={data}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

async function fetchBitDetails(bitId) {
  const response = await axios.post('/api/graphql', {
    query: gql`
      query BitDetails($bitId: UInt64!) {
        job(id: $bitId) {
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

  return response.data?.data?.job ?? null;
}