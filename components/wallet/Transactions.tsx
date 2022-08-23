import React, { useState } from 'react';
import classNames from 'classnames';
import SearchInput from 'components/SearchInput';
import SortMenu, { Option, SortDirection } from 'components/SortMenu';

type TransactionsProps = {
  className?: string;
  isLoading?: boolean;
};

const sortOptions = [
  { label: 'Newest', value: 'NEWEST' },
  {
    label: 'Amount',
    value: 'AMOUNT',
  },
];

export default function Transactions({
  className,
  isLoading,
}: TransactionsProps) {
  const [sortField, setSortField] = useState<Option | null>(sortOptions[0]);
  const [sortDir, setSortDir] = useState<SortDirection>(SortDirection.DESC);
  return (
    <div className={classNames('', className)}>
      <h2 className="font-bold text-2xl">Transactions</h2>
      <div className="flex items-center mt-8">
        <SearchInput
          className="w-64"
          isLoading={isLoading}
          placeholder="Search jobs"
        />
        <SortMenu
          className="ml-auto"
          options={sortOptions}
          value={sortField}
          onChange={setSortField}
          sortDirection={sortDir}
          onChangeSortDirection={setSortDir}
        />
      </div>
    </div>
  );
}
