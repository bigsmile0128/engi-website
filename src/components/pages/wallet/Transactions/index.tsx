import React, { useState } from 'react';
import classNames from 'classnames';
import SearchInput from '~/components/SearchInput';
import SortMenu, { Option, SortDirection } from '~/components/SortMenu';
import SelectMenu from '~/components/SelectMenu';
import axios from 'axios';
import { gql } from 'graphql-request';
import { useQuery } from 'react-query';
import TransactionTable from './TransactionTable';
import Pagination from '~/components/global/Pagination/Pagination';
import MobileTransactionTable from './MobileTransactionTable';
import { TransactionType } from '~/types';

type TransactionsProps = {
  className?: string;
  walletId: string;
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
    label: 'Exchange',
    value: TransactionType.EXCHANGE,
  },
  {
    label: 'Transfer',
    value: TransactionType.TRANSFER,
  },
  {
    label: 'Spend',
    value: TransactionType.SPEND,
  },
  {
    label: 'Income',
    value: TransactionType.INCOME,
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

const PAGE_SIZE = 10;

export default function Transactions({
  className,
  walletId,
}: TransactionsProps) {
  const [sortField, setSortField] = useState<Option | null>(sortOptions[0]);
  const [sortDir, setSortDir] = useState<SortDirection>(SortDirection.DESC);
  const [status, setStatus] = useState(statusOptions[0]);
  // skip first N results for pagination
  const [page, setPage] = useState(0);
  const [transactionType, setTransactionType] = useState(
    transactionTypeOptions[0]
  );

  const { isLoading, isFetching, data } = useQuery(
    ['walletTransactions', walletId, page, transactionType],
    () => {
      if (!walletId) {
        return null;
      }
      const query: TransactionSearchParams = {
        accountId: walletId,
        skip: page * PAGE_SIZE,
        limit: PAGE_SIZE,
      };
      if (transactionType?.value) {
        query.type = transactionType.value;
      }
      return fetchTransactions(query);
    },
    {
      keepPreviousData: true,
      staleTime: 5000,
      refetchOnWindowFocus: false,
    }
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
      <TransactionTable
        className="hidden sm:block"
        data={data?.items ?? []}
        isLoading={isLoading || isFetching}
      />
      <MobileTransactionTable
        className="sm:hidden mt-8"
        data={data?.items ?? []}
        isLoading={isLoading || isFetching}
      />
      <div className="flex justify-center">
        {data?.items?.length > 0 && (
          <Pagination
            pageCount={Math.ceil((data?.totalCount ?? 0) / PAGE_SIZE)}
            forcePage={page}
            onPageChange={(e) => setPage(e.selected)}
          />
        )}
      </div>
    </div>
  );
}

type TransactionSearchParams = {
  accountId: string;
  skip: number;
  limit: number;
  type?: string;
};

async function fetchTransactions(query: TransactionSearchParams) {
  const response = await axios.post('/api/graphql', {
    query: gql`
      query WalletTransactions($query: TransactionsPagedQueryArguments!) {
        transactions(query: $query) {
          totalCount
          items {
            number
            hash
            dateTime
            type
            executor
            isSuccessful
            otherParticipants
            amount
            jobId
          }
        }
      }
    `,
    variables: {
      query,
    },
  });
  return response.data?.data?.transactions;
}
