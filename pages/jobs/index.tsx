import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import axios, { AxiosError } from 'axios';
import * as Sentry from '@sentry/react';
import qs from 'qs';

import SearchFilterList from '../../components/jobs/SearchFilterList';
import SearchResultsHeader from '../../components/jobs/SearchResultsHeader';
import SearchResults from '../../components/jobs/SearchResults';
import CurrentJobs from 'components/jobs/CurrentJobs';
import RecommendedJobs from 'components/jobs/RecommendedJobs';

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
    () => fetchJobs(searchParams),
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
            numResults={data?.numResults}
            isLoading={isLoading}
          />
          <SearchResults
            isLoading={isLoading}
            results={data?.results ?? []}
            numPages={data?.numPages ?? 0}
            isError={isError}
            refresh={refetch}
          />
        </div>
      </div>
    </div>
  );
}

async function fetchJobs(searchParams) {
  const searchParamsObj = Object.fromEntries(searchParams);

  // convert 1-based indexing to 0-based indexing
  if (searchParamsObj.page) {
    const page = Number(searchParamsObj.page);
    searchParamsObj.page = (page - 1).toString();
  }

  const response = await axios.get('/api/jobs', {
    params: searchParamsObj,
  });

  return response.data;
}
