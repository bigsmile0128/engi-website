import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import axios, { AxiosError } from 'axios';
import * as Sentry from '@sentry/react';
import qs from 'qs';

import SearchFilterList from '~/components/pages/jobs/SearchFilterList';
import SearchResultsHeader from '~/components/pages/jobs/SearchResultsHeader';
import SearchResults from '~/components/pages/jobs/SearchResults';
import CurrentJobs from '~/components/pages/jobs/CurrentJobs';
import RecommendedJobs from '~/components/pages/jobs/RecommendedJobs';
import { gql } from 'graphql-request';
import { Language } from '~/types';

const PAGE_SIZE = 10;

export default function JobDiscovery() {
  const router = useRouter();
  const searchParams = new URLSearchParams(
    qs.stringify(router.query, { indices: false })
  );
  const setSearchParams = (query) => {
    router.push({ query });
  };

  const { isLoading, isError, data, refetch } = useQuery(
    ['fetchJobs', searchParams.toString()],
    () =>
      fetchJobs({
        skip: 0,
        limit: 25,
      }),
    {
      onError: (error: AxiosError) => {
        Sentry.captureException(error, (scope) => {
          scope.clear();
          scope.setTransactionName('GET /jobs');
          scope.setTag('searchParams', searchParams.toString());
          return scope;
        });
      },
    }
  );

  return (
    <div className="max-w-page flex flex-col mt-12">
      <div className="md:flex items-start justify-between gap-x-4">
        <h1 className="text-white font-grifter text-8xl">Jobs</h1>
        <CurrentJobs className="mt-12 md:mt-0 md:w-1/2 md:max-w-md" />
      </div>
      <RecommendedJobs className="mt-12" />
      <div className="flex mt-12 gap-x-12 flex-col lg:flex-row">
        <SearchFilterList
          className="hidden lg:block"
          filterClassName="w-32 md:w-48"
          searchParams={searchParams}
          onChange={setSearchParams}
        />
        <div className="flex-1 flex flex-col">
          <SearchResultsHeader
            className="shrink-0 mb-8 md:mb-6 mt-4 md:mt-0"
            numResults={data?.result?.totalCount}
            isLoading={isLoading}
          />
          <SearchResults
            isLoading={isLoading}
            results={data?.result?.items ?? []}
            numPages={Math.ceil((data?.result?.totalCount ?? 0) / PAGE_SIZE)}
            isError={isError}
            refresh={refetch}
          />
        </div>
      </div>
    </div>
  );
}

type JobsQueryArguments = {
  creator?: string;
  language?: Language;
  limit: number;
  maxFunding?: number;
  minFunding?: number;
  orderByDirection?: 'ASC' | 'DESC';
  orderByProperty?: 'CREATED_ON' | 'FUNDING';
  search?: string;
  skip: number;
  status?: string;
};

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
              attemptCount
              createdOn {
                ...blockReference
              }
              updatedOn {
                ...blockReference
              }
              status
            }
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
    variables: {
      query,
    },
  });
  return response.data?.data?.jobs ?? {};
}
