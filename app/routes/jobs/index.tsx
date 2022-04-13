import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios, { AxiosError } from 'axios';
import * as Sentry from '@sentry/react';

import TimeEstimate from '~/components/TimeEstimate';
import SearchFilterList from '~/components/JobDiscovery/SearchFilterList';
import SearchResultsHeader from '~/components/JobDiscovery/SearchResultsHeader';
import SearchResults from '~/components/JobDiscovery/SearchResults';

async function fetchJobs(searchParams: URLSearchParams) {
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

export default function JobDiscovery() {
  const [searchParams, setSearchParams] = useSearchParams();

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
    <div className="mx-auto flex max-w-7xl flex-col p-8 sm:p-16 md:p-24">
      <div className="items-start justify-between md:flex">
        <h1 className="font-grifter text-6xl text-white">
          <span className="md:block">Discover </span>
          <span className="md:block">jobs</span>
        </h1>
        <div className="mt-8 flex flex-col sm:items-start md:mt-0">
          <h3 className="mb-2 font-grifter text-white">Recommended for you</h3>
          <Link
            to={'/jobs/9fc31bfc-c615-4fe5-ad7e-ca6846f7efc2'}
            className="flex cursor-pointer flex-col bg-[#00000022] p-6 hover:bg-[#44444422]"
          >
            <div className="flex items-center justify-between">
              <span className="flex rounded-xl bg-red-400 px-4 py-1 text-xs text-white">
                Hot
              </span>
              <TimeEstimate duration="2 hours" />
            </div>
            <div className="mt-8 flex items-center justify-between gap-x-12">
              <span className="shrink-0 truncate text-sm font-semibold text-gray-300 sm:w-48">
                Job Details component
              </span>
              <span className="font-grifter text-xl text-white">$540</span>
            </div>
          </Link>
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-x-12 md:mt-12 lg:flex-row">
        <SearchFilterList
          className="mb-12 flex shrink-0 gap-x-12 md:mb-20 lg:block"
          filterClassName="w-32 md:w-48"
          searchParams={searchParams}
          onChange={setSearchParams}
        />
        <div className="flex flex-1 flex-col">
          <SearchResultsHeader
            className="mb-6 shrink-0"
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
