'use client';

import classNames from 'classnames';
import pluralize from 'pluralize';
import { useState } from 'react';
import { IoOptionsOutline } from 'react-icons/io5';
import { RiSearchLine } from 'react-icons/ri';
import SearchInput from '~/components/SearchInput';
import SortMenu from '~/components/SortMenu';
import Button from '~/components/global/Button/Button';
import Input from '~/components/global/Input/Input';
import { OrderByDirection } from '~/types';

type SubmissionFiltersProps = {
  className?: string;
  numResults: number;
};

const sortOptions = [
  {
    label: 'Newest',
    value: 'NEWEST',
  },
  {
    label: 'Status',
    value: 'STATUS',
  },
];

export default function SubmissionFilters({
  className,
  numResults,
}: SubmissionFiltersProps) {
  const [value, setValue] = useState('');
  const [sortField, setSortField] = useState(sortOptions[0]);
  const [sortDirection, setSortDirection] = useState(OrderByDirection.DESC);
  return (
    <div className={classNames('', className)}>
      {/* MOBILE/TABLET search input */}
      <div className="relative flex items-center desktop:hidden">
        <Input
          className="w-full pl-12 font-normal"
          placeholder="Search for a submission"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="absolute pointer-events-none ml-4">
          <RiSearchLine className="h-5 w-5 text-white" />
        </div>
      </div>
      {/* DESKTOP */}
      <div
        className={classNames(
          'hidden desktop:flex justify-between w-full',
          'mt-0 ml-12 desktop:ml-0'
        )}
      >
        <SearchInput
          className="w-56 inline-block"
          placeholder="Search for a submission..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <SortMenu
          className="ml-auto"
          options={sortOptions}
          value={sortField}
          onChange={(sortField) => setSortField(sortField)}
          sortDirection={sortDirection}
          onChangeSortDirection={(sortDirection) =>
            setSortDirection(sortDirection)
          }
        />
      </div>
      <div className="mt-6 desktop:mt-8 flex items-center">
        <div className="font-grifter whitespace-nowrap text-2xl">
          {numResults}{' '}
          <span className="text-green-primary">
            {pluralize('Submission', numResults)}
          </span>
        </div>
        {/* MOBILE, TABLET */}
        <Button
          className="desktop:hidden flex items-center gap-2 ml-auto !px-4 !py-2 tablet:!px-8 tablet:!py-4"
          onClick={() => {
            // TODO: implement when API is ready
          }}
        >
          <IoOptionsOutline className="h-5 w-5" />
          <span className="tablet:hidden">Filters</span>
          <span className="hidden tablet:inline-block">Filter & Sort</span>
        </Button>
      </div>
    </div>
  );
}
