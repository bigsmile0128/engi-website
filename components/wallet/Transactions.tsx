import React, { useState } from 'react';
import classNames from 'classnames';
import SearchInput from 'components/SearchInput';
import SortMenu, { Option, SortDirection } from 'components/SortMenu';
import SelectMenu from 'components/SelectMenu';

type TransactionsProps = {
  className?: string;
  isLoading?: boolean;
};

const sortOptions = [
  { label: 'Sort by', value: '' },
  { label: 'Newest', value: 'NEWEST' },
  {
    label: 'Amount',
    value: 'AMOUNT',
  },
];

const transactionTypeOptions = [
  {
    label: 'All Types',
    value: '',
  },
  {
    label: 'Deposit',
    value: 'DEPOSIT',
  },
  {
    label: 'Withdrawal',
    value: 'WITHDRAWAL',
  },
  {
    label: 'Transfer',
    value: 'TRANSFER',
  },
  {
    label: 'Income',
    value: 'INCOME',
  },
  {
    label: 'Salary',
    value: 'SALARY',
  },
];

const statusOptions = [
  {
    label: 'All Statuses',
    value: '',
  },
  {
    label: 'Success',
    value: 'SUCCESS',
  },
  {
    label: 'Pending',
    value: 'PENDING',
  },
  {
    label: 'Failed',
    value: 'FAILED',
  },
];

export default function Transactions({
  className,
  isLoading,
}: TransactionsProps) {
  const [sortField, setSortField] = useState<Option | null>(sortOptions[0]);
  const [sortDir, setSortDir] = useState<SortDirection>(SortDirection.DESC);
  const [status, setStatus] = useState(statusOptions[0]);
  const [transactionType, setTransactionType] = useState(
    transactionTypeOptions[0]
  );
  return (
    <div className={classNames('', className)}>
      <h2 className="font-bold text-2xl">Transactions</h2>
      <div className="flex items-center mt-8">
        <SearchInput
          className="sm:w-40 md:w-64"
          isLoading={isLoading}
          placeholder="Search jobs"
        />
        <div className="flex items-center ml-auto gap-x-6">
          <SelectMenu
            className="hidden sm:block"
            options={transactionTypeOptions}
            value={transactionType}
            onChange={setTransactionType}
            buttonLabel="Type"
          />
          <SelectMenu
            className="hidden sm:block"
            options={statusOptions}
            value={status}
            onChange={setStatus}
            buttonLabel="Status"
          />
          <SortMenu
            options={sortOptions}
            value={sortField}
            onChange={setSortField}
            sortDirection={sortDir}
            onChangeSortDirection={setSortDir}
          />
        </div>
      </div>
    </div>
  );
}
