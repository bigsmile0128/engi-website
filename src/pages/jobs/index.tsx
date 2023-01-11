import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import qs from 'qs';
import { useState } from 'react';
import MobileSearchFilterList from '~/components/pages/jobs/MobileSearchFilterList';

import SearchFilterList, {
  DateOption,
} from '~/components/pages/jobs/SearchFilterList';
import SearchResults from '~/components/pages/jobs/SearchResults';
import SearchResultsHeader from '~/components/pages/jobs/SearchResultsHeader';
import {
  JobsOrderByProperty,
  JobsQueryArguments,
  Language,
  OrderByDirection,
} from '~/types';
import useJobs from '~/utils/hooks/useJobs';

const PAGE_SIZE = 10;

export default function JobDiscovery() {
  const [isFilterListVisible, setIsFilterListVisible] = useState(false);
  const router = useRouter();
  const searchParams = new URLSearchParams(
    qs.stringify(router.query, { indices: false })
  );
  const setSearchParams = (query) => {
    router.push({ query });
  };

  const { isLoading, isError, data, refetch, error } = useJobs(
    formatSearchParams(searchParams)
  );

  return (
    <div className="max-w-page flex flex-col mt-12 mb-24">
      <h1 className="text-white font-grifter text-8xl">Jobs</h1>
      <div className="flex mt-12 gap-x-12 flex-col desktop:flex-row">
        <SearchFilterList
          className="hidden desktop:block"
          filterClassName="w-48"
          searchParams={searchParams}
          onChange={setSearchParams}
        />
        <MobileSearchFilterList
          className="desktop:hidden"
          searchParams={searchParams}
          onChange={setSearchParams}
          visible={isFilterListVisible}
          onChangeVisible={setIsFilterListVisible}
        />
        <div className="flex-1 flex flex-col">
          <SearchResultsHeader
            className="shrink-0 mb-8 laptop:mb-6 mt-4 laptop:mt-0"
            numResults={data?.result?.totalCount}
            isLoading={isLoading}
            searchParams={searchParams}
            onChange={setSearchParams}
            onChangeVisible={setIsFilterListVisible}
          />
          <SearchResults
            isLoading={isLoading}
            results={data?.result?.items ?? []}
            numPages={Math.ceil((data?.result?.totalCount ?? 0) / PAGE_SIZE)}
            isError={isError}
            error={error}
            refresh={refetch}
          />
        </div>
      </div>
    </div>
  );
}

function formatSearchParams(searchParams: URLSearchParams): JobsQueryArguments {
  const query: JobsQueryArguments = {
    skip: 0,
    limit: 10,
    orderByDirection: OrderByDirection.DESC,
  };

  const languages = searchParams.getAll('language') as Language[];
  if (languages.length > 0) {
    query.language = languages;
  }

  const minFunding = searchParams.get('funding-min');
  const maxFunding = searchParams.get('funding-max');
  if (minFunding) {
    query.minFunding = parseInt(minFunding, 10) * Math.pow(10, 18);
  }
  if (maxFunding) {
    query.maxFunding = parseInt(maxFunding, 10) * Math.pow(10, 18);
  }

  if (searchParams.get('sort-field')) {
    query.orderByProperty = searchParams.get(
      'sort-field'
    ) as JobsOrderByProperty;
  }

  if (searchParams.get('sort-dir')) {
    query.orderByDirection = searchParams.get('sort-dir') as OrderByDirection;
  }

  if (searchParams.get('created-after')) {
    switch (searchParams.get('created-after')) {
      case DateOption.LAST_DAY:
        query.createdAfter = dayjs().startOf('day').subtract(1, 'day').format();
        break;
      case DateOption.LAST_WEEK:
        query.createdAfter = dayjs()
          .startOf('day')
          .subtract(1, 'week')
          .format();
        break;
      case DateOption.LAST_MONTH:
        query.createdAfter = dayjs()
          .startOf('day')
          .subtract(1, 'month')
          .format();
        break;
      case DateOption.LAST_QUARTER:
        query.createdAfter = dayjs()
          .startOf('day')
          .subtract(3, 'month')
          .format();
        break;
      case DateOption.LAST_YEAR:
        query.createdAfter = dayjs()
          .startOf('day')
          .subtract(1, 'year')
          .format();
        break;
      default:
        query.createdAfter = searchParams.get('created-after');
    }
  }

  if (searchParams.get('query')) {
    query.search = searchParams.get('query');
  }

  // TODO: handle skip
  return query;
}
