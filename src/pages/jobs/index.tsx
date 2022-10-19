import React from 'react';
import { useRouter } from 'next/router';
import qs from 'qs';

import SearchFilterList from '~/components/pages/jobs/SearchFilterList';
import SearchResultsHeader from '~/components/pages/jobs/SearchResultsHeader';
import SearchResults from '~/components/pages/jobs/SearchResults';
import useJobs from '~/utils/hooks/useJobs';

const PAGE_SIZE = 10;

export default function JobDiscovery() {
  const router = useRouter();
  const searchParams = new URLSearchParams(
    qs.stringify(router.query, { indices: false })
  );
  const setSearchParams = (query) => {
    router.push({ query });
  };

  const { isLoading, isError, data, refetch, error } = useJobs({
    skip: 0,
    limit: 25,
  });

  return (
    <div className="max-w-page flex flex-col mt-12">
      <div className="md:flex items-start justify-between gap-x-4">
        <h1 className="text-white font-grifter text-8xl">Jobs</h1>
        {/* <CurrentJobs className="mt-12 md:mt-0 md:w-1/2 md:max-w-md" /> */}
      </div>
      {/* <RecommendedJobs className="mt-12" /> */}
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
