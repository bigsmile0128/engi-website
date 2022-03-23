import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import axios from 'axios';

import TimeEstimate from '../components/TimeEstimate';
import SearchFilterList from './SearchFilterList';
import SearchResultsHeader from './SearchResultsHeader';
import SearchResults from './SearchResults';

export default function Jobs() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchMutation = useMutation(async (searchParams: URLSearchParams) => {
    const response = await axios.get('/api/jobs', {
      params: searchParams,
    });

    return response.data;
  });

  useEffect(() => {
    searchMutation.mutate(searchParams);
  }, [searchParams]);

  return (
    // TODO: make responsive
    // TODO: log error to Sentry
    <div className="max-w-7xl mx-auto flex flex-col p-8 sm:p-16 md:p-24">
      <div className="md:flex items-start justify-between">
        <h1 className="text-white font-grifter text-6xl">
          <span className="md:block">Discover </span>
          <span className="md:block">jobs</span>
        </h1>
        <div className="flex flex-col sm:items-start mt-8 md:mt-0">
          <h3 className="font-grifter text-white mb-2">Recommended for you</h3>
          {/* TODO: change to Link component */}
          <div className="bg-[#00000022] hover:bg-[#44444422] cursor-pointer p-6 flex flex-col">
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
          </div>
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
            numResults={searchMutation.data?.numResults}
            isLoading={searchMutation.isLoading}
          />
          <SearchResults
            isLoading={searchMutation.isLoading}
            results={searchMutation.data?.results ?? []}
            numResults={searchMutation.data?.numResults ?? 0}
            error={searchMutation.error as Error}
            refresh={() => searchMutation.mutate(searchParams)}
          />
        </div>
      </div>
    </div>
  );
}
