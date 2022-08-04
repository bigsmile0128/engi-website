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
      <div className="md:flex items-start justify-between gap-x-4 md:mb-8">
        <h1 className="text-white font-grifter text-8xl">Jobs</h1>
        <CurrentJobs className="mt-12 md:mt-0 md:w-1/2 md:max-w-md" />
      </div>
      <div className="flex mt-8 md:mt-12 gap-x-12 flex-col lg:flex-row">
        <SearchFilterList
          className="shrink-0 mb-12 md:mb-20 flex gap-x-12 lg:block"
          filterClassName="w-32 md:w-48"
          searchParams={searchParams}
          onChange={setSearchParams}
        />
        <div className="flex-1 flex flex-col">
          <SearchResultsHeader
            className="shrink-0 mb-6"
            numResults={data?.numResults}
            isLoading={isLoading}
          />
          <SearchResults
            isLoading={isLoading}
            results={data?.results ?? []}
            numResults={data?.numResults ?? 0}
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
