'use client';

import React from 'react';
import classNames from 'classnames';
import EngiIcon from '~/components/global/icons/EngiIcon';
import { RiArrowUpLine } from 'react-icons/ri';
import { useBalance } from '~/utils/balances/userBalance';
import EngiAmount from '~/components/EngiAmount';

type BalanceProps = {
  className?: string;
  walletId: string;
};

export default function Balance({ className, walletId }: BalanceProps) {
  const { isLoading, data: balance } = useBalance(walletId);
  return (
    <div
      className={classNames(
        'flex flex-col sm:flex-row sm:items-center',
        className
      )}
    >
      <h2 className="font-bold text-2xl">Balance</h2>
      <div className="flex items-center whitespace-nowrap sm:ml-auto mt-8 sm:mt-0">
        <EngiAmount
          value={balance}
          iconClassName="h-6 w-6"
          valueClassName="font-grifter text-4xl -mb-1 ml-1"
          isLoading={isLoading}
        />
      </div>
      {/* TODO: blocked by https://linear.app/engi/issue/ENGIN-1146/api-to-get-account-information-for-a-wallet-address */}
      {/* <div className="flex items-center whitespace-nowrap text-secondary mt-4 sm:mt-0 sm:ml-12 sm:mb-4">
        <RiArrowUpLine className="h-5 w-5 text-green-primary" />
        <EngiIcon className="h-3 w-3 ml-1 -mb-[3px]" />
        <span className="text-lg ml-1">N/A</span>
      </div> */}
    </div>
  );
}
