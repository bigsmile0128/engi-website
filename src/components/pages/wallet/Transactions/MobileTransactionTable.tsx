import React, { useMemo } from 'react';
import classNames from 'classnames';
import { Transaction, TransactionType } from '~/types';
import EngiAmount from '~/components/EngiAmount';
import TransactionTime from './TransactionTime';
import TransactionTypeTag from './TransactionTypeTag';
import TransactionState from './TransactionState';

type MobileTransactionTableProps = {
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any[];
  isLoading?: boolean;
};

export default function MobileTransactionTable({
  className,
  data,
  isLoading,
}: MobileTransactionTableProps) {
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
        amount: 100,
        jobId: '',
      }));
    }
    return data ?? [];
  }, [data, isLoading]);

  return (
    <div className={classNames('w-full flex flex-col gap-y-4', className)}>
      {_data.map((transaction, i) => (
        <a
          key={transaction.dateTime + i}
          className={classNames('p-4', 'bg-black/[.14] hover:bg-black/40')}
          href={`https://polkadot.js.org/apps/?rpc=wss%3A%2F%2F${process.env.NEXT_PUBLIC_ENGI_ENV}.engi.network%3A9944#/explorer/query/${transaction?.hash}`}
          target="_blank"
          rel="noreferrer"
        >
          <div className="flex items-center justify-between">
            <div
              className={classNames(
                'w-32 font-bold text-ellipsis overflow-hidden',
                isLoading ? 'skeleton' : ''
              )}
            >
              {transaction.executor}
            </div>
            <EngiAmount
              value={transaction.amount.toString()}
              isLoading={isLoading}
            />
          </div>
          <TransactionTime
            className="mt-2"
            value={transaction.dateTime}
            isLoading={isLoading}
          />
          <div className="border-t border-white/30 my-3" />
          <div className="flex items-center gap-x-2">
            <TransactionTypeTag
              value={transaction.type}
              isLoading={isLoading}
            />
            <TransactionState
              value={transaction.isSuccessful}
              isLoading={isLoading}
            />
          </div>
        </a>
      ))}
    </div>
  );
}
