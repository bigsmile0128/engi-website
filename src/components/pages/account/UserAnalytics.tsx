import React from 'react';
import classNames from 'classnames';
import EngiAmount from '~/components/EngiAmount';
import { ChevronRightIcon } from '@heroicons/react/outline';

type UserAnalyticsProps = {
  className?: string;
};

export default function UserAnalytics({ className }: UserAnalyticsProps) {
  return (
    <div
      className={classNames(
        'flex flex-col items-start gap-y-8',
        'bg-secondary/10 backdrop-blur-[100px] p-8',
        className
      )}
    >
      <span className="font-bold text-2xl">Analytics</span>
      <div className="flex items-start gap-x-16 laptop:whitespace-nowrap">
        <div className="flex flex-col gap-2">
          <span className="text-xl text-secondary">Bounties Created</span>
          <span className="font-grifter text-4xl">3,022</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xl text-secondary">Bounties Coded</span>
          <span className="font-grifter text-4xl">1,745</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xl text-secondary">Amount Earned</span>
          <EngiAmount
            value={'1230000000000000000'}
            iconClassName="h-5 w-auto -mt-1 mr-2"
            valueClassName="font-grifter text-4xl"
          />
        </div>
      </div>
      <button className="flex items-center gap-2 hover:text-green-primary focus-green-primary self-center">
        <span className="font-bold text-sm whitespace-nowrap">
          Show all stats
        </span>
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
