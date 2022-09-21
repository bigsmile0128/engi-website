import React from 'react';
import classNames from 'classnames';
import { RiArrowUpLine } from 'react-icons/ri';
import EngiAmount from '~/components/EngiAmount';

type BalanceProps = {
  className?: string;
};

export default function Balance({ className }: BalanceProps) {
  return (
    <div
      className={classNames(
        'flex flex-col children:shrink-0 gap-x-4 gap-y-2 sm:gap-y-0',
        'sm:flex-wrap sm:flex-row sm:justify-between',
        className
      )}
    >
      <div className="flex items-center justify-between sm:flex-col sm:items-start gap-y-8">
        <h2 className="sm:text-xl text-white/80">Balance</h2>
        <EngiAmount
          className=""
          iconClassName="h-4 w-4 sm:h-6 sm:w-6"
          valueClassName="font-grifter text-2xl sm:text-4xl -mb-1 ml-2"
          value={123 * Math.pow(10, 18)}
        />
      </div>
      <div className="w-[1px] bg-white/40"></div>
      <div className="flex justify-between sm:flex-col sm:items-start gap-y-8">
        <h2 className="sm:text-xl text-white/80">Earned this week</h2>
        <div className="flex items-center">
          <RiArrowUpLine className="h-4 w-4 sm:h-5 sm:w-5 text-orange-primary" />
          <EngiAmount
            className="ml-1"
            iconClassName="h-4 w-4 sm:h-6 sm:w-6"
            valueClassName="font-grifter text-2xl sm:text-4xl -mb-1 ml-2"
            value={123 * Math.pow(10, 18)}
          />
        </div>
      </div>
      {/* full-width basis to act as line break */}
      <div className="hidden sm:block md:hidden h-8 basis-full"></div>
      <button className="mt-6 sm:mt-0 self-start sm:self-auto text-xl underline">
        View Transactions
      </button>
    </div>
  );
}
