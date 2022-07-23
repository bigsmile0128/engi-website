import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import axios, { AxiosError } from 'axios';
import * as Sentry from '@sentry/react';
import qs from 'qs';

import TimeEstimate from '../../components/TimeEstimate';
import SearchFilterList from '../../components/jobs/SearchFilterList';
import SearchResultsHeader from '../../components/jobs/SearchResultsHeader';
import SearchResults from '../../components/jobs/SearchResults';

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
    <div className="max-w-7xl mx-auto flex flex-col p-8 sm:p-16 md:p-24">
      <div className="md:flex items-start justify-between">
        <h1 className="text-white font-grifter text-6xl">
          <span className="md:block">Discover </span>
          <span className="md:block">jobs</span>
        </h1>
        <div className="flex flex-col sm:items-start mt-8 md:mt-0">
          <h3 className="font-grifter text-white mb-2">Recommended for you</h3>
          <Link href={'/jobs/9fc31bfc-c615-4fe5-ad7e-ca6846f7efc2'} passHref>
            <a className="bg-[#00000022] hover:bg-[#44444422] cursor-pointer p-6 flex flex-col">
              <div className="flex items-center justify-between">
                <span className="bg-red-400 text-white rounded-xl text-xs px-4 py-1 flex">
                  Hot
                </span>
                <TimeEstimate duration="2 hours" />
              </div>
              <div className="flex items-center justify-between mt-8 gap-x-12">
                <span className="shrink-0 text-gray-300 text-sm font-semibold truncate sm:w-48">
                  Job Details component
                </span>
                <span className="font-grifter text-xl text-white">$540</span>
              </div>
            </a>
          </Link>
        </div>
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
