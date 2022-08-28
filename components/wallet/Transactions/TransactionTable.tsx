import React, { useMemo } from 'react';
import classNames from 'classnames';
import { Transaction, TransactionType } from 'types';
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import dynamic from 'next/dynamic';
import TransactionTypeTag from './TransactionTypeTag';
import { RiCheckboxCircleLine, RiErrorWarningLine } from 'react-icons/ri';
import EngiAmount from 'components/EngiAmount';

const TransactionTime = dynamic(() => import('./TransactionTime'), {
  ssr: false,
});

type TransactionTableProps = {
  className?: string;
  data?: Transaction[];
  numPages?: number;
  isLoading?: boolean;
};

export default function TransactionTable({
  className,
  data,
  isLoading,
}: TransactionTableProps) {
  const columnHelper = createColumnHelper<Transaction>();
  const columns: ColumnDef<Transaction>[] = useMemo(
    () => [
      columnHelper.accessor('executor', {
        header: 'Executor',
        cell: (props) => {
          const transaction = props.row.original;
          return (
            <span
              className={classNames(
                'block font-bold overflow-hidden text-ellipsis w-24 lg:w-32',
                isLoading ? 'skeleton' : ''
              )}
            >
              {transaction.executor}
            </span>
          );
        },
      }),
      columnHelper.accessor('dateTime', {
        header: 'Time',
        cell: (props) => {
          const transaction = props.row.original;
          return (
            <TransactionTime
              value={transaction.dateTime}
              isLoading={isLoading}
              iconClassName="hidden md:block"
              valueClassName="flex-col lg:flex-row lg:items-center"
            />
          );
        },
      }),
      columnHelper.accessor('type', {
        header: 'Type',
        cell: (props) => {
          const transaction = props.row.original;
          return (
            <TransactionTypeTag
              value={transaction.type}
              isLoading={isLoading}
            />
          );
        },
      }),
      columnHelper.accessor('amount', {
        header: 'Amount',
        cell: (props) => {
          const transaction = props.row.original;
          return (
            <EngiAmount value={transaction.amount} isLoading={isLoading} />
          );
        },
      }),
      columnHelper.accessor('isSuccessful', {
        header: '',
        cell: (props) => {
          const transaction = props.row.original;
          return (
            <div
              className={classNames(
                'flex items-center justify-center md:px-4 md:h-8',
                'rounded-full md:rounded-none',
                'font-medium text-sm',
                transaction.isSuccessful
                  ? 'md:bg-green-primary/10 text-green-primary'
                  : 'md:bg-red-primary/10 text-red-primary',
                isLoading ? 'children:skeleton' : ''
              )}
            >
              <span className="hidden md:block">
                {transaction.isSuccessful ? 'Success' : 'Failure'}
              </span>
              <span className="md:hidden">
                {transaction.isSuccessful ? (
                  <RiCheckboxCircleLine className="h-7 w-7" />
                ) : (
                  <RiErrorWarningLine className="h-7 w-7" />
                )}
              </span>
            </div>
          );
        },
      }),
    ],
    [columnHelper, isLoading]
  );

  const _data = useMemo<Transaction[]>(() => {
    if (isLoading) {
      return Array.from({ length: 10 }).map((_, i) => ({
        number: i,
        hash: i.toString(),
        dateTime: Date.now().toString(),
        type: TransactionType.EXCHANGE,
        executor: 'executor',
        isSuccessful: true,
        otherParticipants: [],
        amount: i,
        jobId: '',
      }));
    }
    return data ?? [];
  }, [data, isLoading]);

  const table = useReactTable({
    data: _data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={classNames('w-full', className)}>
      <table className="border-separate border-spacing-y-3 w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={classNames(
                    'text-left text-secondary text-xs',
                    'pb-2 border-b border-white/30',
                    'px-4'
                  )}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={classNames('bg-black/[.14] children:py-4')}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
