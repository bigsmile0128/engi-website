import React, { Fragment, useState } from 'react';
import classNames from 'classnames';
import pluralize from 'pluralize';
import SearchInput from '~/components/SearchInput';
import SortMenu, { Option, SortDirection } from '~/components/SortMenu';

interface SearchResultsHeaderProps {
  className?: string;
  isLoading: boolean;
  numResults?: number;
  error?: Error;
}

const sortOptions = [
  {
    label: 'Newest',
    value: 'NEWEST',
  },
  {
    label: 'Price',
    value: 'PRICE',
  },
];

export default function SearchResultsHeader({
  className,
  isLoading,
  numResults,
  error,
}: SearchResultsHeaderProps) {
  const [sortField, setSortField] = useState<Option | null>(sortOptions[0]);
  const [sortDir, setSortDir] = useState<SortDirection>(SortDirection.DESC);

  return (
    <header className={classNames('md:flex items-center', className)}>
      <h4 className={classNames('font-grifter', isLoading ? 'skeleton' : '')}>
        <span className="whitespace-nowrap text-xl">
          Found {numResults ?? 0}{' '}
          <span className="text-green-primary">
            {pluralize('job', numResults ?? 0)}
          </span>
        </span>
      </h4>
      <div
        className={classNames(
          'flex justify-between w-full',
          'mt-4 md:mt-0 md:ml-12'
        )}
      >
        <SearchInput
          className="sm:w-56"
          isLoading={isLoading}
          placeholder="Search jobs"
        />
        <SortMenu
          className="ml-auto"
          isLoading={isLoading}
          options={sortOptions}
          value={sortField}
          onChange={setSortField}
          sortDirection={sortDir}
          onChangeSortDirection={setSortDir}
        />
      </div>
    </header>
  );
}
