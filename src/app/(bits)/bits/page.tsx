'use client';

import dayjs from 'dayjs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import MobileSearchFilterList from '~/components/pages/bits/MobileSearchFilterList';

import SearchFilterList, {
  DateOption,
} from '~/components/pages/bits/SearchFilterList';
import SearchResults from '~/components/pages/bits/SearchResults';
import SearchResultsHeader from '~/components/pages/bits/SearchResultsHeader';
import {
  BitStatus,
  BitsOrderByProperty,
  BitsQueryArguments,
  OrderByDirection,
} from '~/types';
import useBits from '~/utils/hooks/useBits';

const PAGE_SIZE = 10;

export default function BitDiscovery() {
  const [isFilterListVisible, setIsFilterListVisible] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams() ?? new URLSearchParams();
  const setSearchParams = (searchParams) => {
    router.push(pathname + '?' + searchParams.toString());
  };

  const { isLoading, isError, data, refetch, error } = useBits(
    formatSearchParams(searchParams)
  );

  return (
    <div className="max-w-page flex flex-col mt-12 mb-24">
      <h1 className="text-white font-grifter text-8xl">Bits</h1>
      <div className="flex mt-4 tablet:mt-8 desktop:mt-12 gap-x-12 flex-col desktop:flex-row">
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

function formatSearchParams(searchParams: URLSearchParams): BitsQueryArguments {
  const query: BitsQueryArguments = {
    skip: 0,
    limit: 10,
    orderByDirection: OrderByDirection.DESC,
  };

  const technologies = searchParams.getAll('technology') as string[];
  if (technologies.length > 0) {
    query.technologies = technologies;
  }

  const minFunding = searchParams.get('funding-min');
  const maxFunding = searchParams.get('funding-max');
  if (minFunding) {
    query.minFunding = minFunding + '0'.repeat(18);
  }
  if (maxFunding) {
    query.maxFunding = maxFunding + '0'.repeat(18);
  }

  if (searchParams.get('status')) {
    query.status = searchParams.get('status') as BitStatus;
  }

  if (searchParams.get('sort-field')) {
    query.orderByProperty = searchParams.get(
      'sort-field'
    ) as BitsOrderByProperty;
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
        query.createdAfter = searchParams.get('created-after') ?? '';
    }
  }

  if (searchParams.get('query')) {
    query.search = searchParams.get('query') ?? '';
  }

  // TODO: handle skip
  return query;
}
