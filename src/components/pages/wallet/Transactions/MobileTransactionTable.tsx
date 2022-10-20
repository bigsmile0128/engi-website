import React, { useMemo } from 'react';
import classNames from 'classnames';
import { Transaction, TransactionType } from '~/types';
import EngiAmount from '~/components/EngiAmount';
import TransactionTime from './TransactionTime';
import TransactionTypeTag from './TransactionTypeTag';
import TransactionState from './TransactionState';
import PolkadotSvg from 'public/img/wallet/polkadot.svg';

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
        <div
          key={transaction.dateTime + i}
          className={classNames('p-4', 'bg-black/[.14]')}
        >
          <div className="flex items-center gap-x-1">
            <div
              className={classNames(
                'w-32 font-bold text-ellipsis overflow-hidden',
                isLoading ? 'skeleton' : ''
              )}
            >
              {transaction.executor}
            </div>
            <a
              className={classNames(
                'inline-flex items-center gap-x-2 px-2 py-0.5 mr-auto',
                'border border-white/20 hover:border-green-primary transition-all',
                isLoading ? 'children:skeleton' : ''
              )}
              href={`https://polkadot.js.org/apps/?rpc=wss%3A%2F%2F${process.env.NEXT_PUBLIC_ENGI_ENV}.engi.network%3A9944#/explorer/query/${transaction?.hash}`}
              target="_blank"
              rel="noreferrer"
            >
              <PolkadotSvg className="h-4 w-4" />
              <span className="text-sm font-medium">Explorer</span>
            </a>
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
        </div>
      ))}
    </div>
  );
}
