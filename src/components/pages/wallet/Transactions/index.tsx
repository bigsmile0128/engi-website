'use client';

import axios from 'axios';
import classNames from 'classnames';
import { gql } from 'graphql-request';
import { useState } from 'react';
import { useQuery } from 'react-query';
import SearchInput from '~/components/SearchInput';
import SelectMenu from '~/components/SelectMenu';
import SortMenu, { Option } from '~/components/SortMenu';
import Pagination from '~/components/global/Pagination/Pagination';
import { OrderByDirection, TransactionType } from '~/types';
import MobileTransactionTable from './MobileTransactionTable';
import TransactionTable from './TransactionTable';

type TransactionsProps = {
  className?: string;
  isLoading?: boolean;
  walletId: string;
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
    label: 'Type',
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
    label: 'Status',
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
  const [sortField, setSortField] = useState<Option | undefined>(
    sortOptions[0]
  );
  const [sortDir, setSortDir] = useState<OrderByDirection>(
    OrderByDirection.DESC
  );
  const [status, setStatus] = useState(statusOptions[0]);
  // skip first N results for pagination
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [transactionType, setTransactionType] = useState(
    transactionTypeOptions[0]
  );

  const { isLoading, isFetching, data } = useQuery(
    ['walletTransactions', walletId, page, transactionType, sortField, sortDir],
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

      let sortBy = '';
      if (sortField?.value === 'NEWEST') {
        sortBy =
          sortDir === OrderByDirection.DESC
            ? 'CREATED_DESCENDING'
            : 'CREATED_ASCENDING';
      } else if (sortField?.value === 'AMOUNT') {
        sortBy =
          sortDir === OrderByDirection.DESC
            ? 'AMOUNT_DESCENDING'
            : 'AMOUNT_ASCENDING';
      }
      if (sortBy) {
        query.sortBy = sortBy;
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
          placeholder="Search bits"
          value={searchQuery}
          onChange={(searchQuery) => setSearchQuery(searchQuery)}
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
  limit: number;
  skip: number;
  sortBy?: string;
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
