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
    // TODO: handle error
    <div className="max-w-7xl mx-auto flex flex-col p-24">
      <div className="flex items-start justify-between">
        <h1 className="text-white font-grifter text-6xl">
          <span className="md:block">Discover </span>
          <span className="md:block">jobs</span>
        </h1>
        <div className="flex flex-col items-start">
          <h3 className="font-grifter text-white mb-2">Recommended for you</h3>
          {/* TODO: change to Link component */}
          <div className="bg-[#00000022] hover:bg-[#44444422] cursor-pointer p-6 flex flex-col">
            <div className="flex items-center justify-between">
              <span className="bg-red-400 text-white rounded-xl text-xs px-4 py-1 flex">
                Hot
              </span>
              <TimeEstimate duration="2 hours" />
            </div>
            <div className="flex items-center justify-between mt-8">
              <span className="shrink-0 text-gray-300 mr-20 text-sm font-semibold">
                Job Details component
              </span>
              <span className="font-grifter text-xl text-white">$540</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-12 gap-x-12">
        <SearchFilterList
          className="basis-48 shrink-0"
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
          />
        </div>
      </div>
    </div>
  );
}
