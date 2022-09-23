import React from 'react';
import classNames from 'classnames';
import EngiIcon from '~/components/global/icons/EngiIcon';
import { RiArrowUpLine } from 'react-icons/ri';

type BalanceProps = {
  className?: string;
};

export default function Balance({ className }: BalanceProps) {
  return (
    <div
      className={classNames(
        'flex flex-col sm:flex-row sm:items-center',
        className
      )}
    >
      <h2 className="font-bold text-2xl">Balance</h2>
      <div className="flex items-center whitespace-nowrap sm:ml-auto mt-8 sm:mt-0">
        <EngiIcon className="h-6 w-6 text-green-primary" />
        <span className="font-grifter text-4xl -mb-1 ml-1">2,345</span>
      </div>
      <div className="flex items-center whitespace-nowrap text-secondary mt-4 sm:mt-0 sm:ml-12 sm:mb-4">
        <RiArrowUpLine className="h-5 w-5 text-green-primary" />
        <EngiIcon className="h-3 w-3 ml-1 -mb-[3px]" />
        <span className="text-lg ml-1">323</span>
      </div>
    </div>
  );
}
