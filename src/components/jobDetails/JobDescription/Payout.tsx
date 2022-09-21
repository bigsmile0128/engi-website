import React from 'react';
import classNames from 'classnames';
import { AiFillCreditCard } from 'react-icons/ai';
import {
  RiAwardFill,
  RiCoinsFill,
  RiTrophyFill,
  RiWallet3Fill,
} from 'react-icons/ri';
import EngiIcon from '~/components/icons/EngiIcon';
import Statistic from '~/components/Statistic';
import { Job } from '~/types';

type PayoutProps = {
  className?: string;
  isLoading?: boolean;
  data?: Job;
};

export default function Payout({ className, isLoading, data }: PayoutProps) {
  return (
    <div className={classNames('p-6 bg-black/[.14] w-full', className)}>
      <h2 className="font-grifter text-xl">Payout</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-4">
        <Statistic
          icon={<AiFillCreditCard className="text-orange-primary h-5 w-5" />}
          value={
            <div className="flex items-center">
              <EngiIcon className="text-green-primary h-3 w-3 -mb-1" />
              <span className="ml-1">{data?.funding.toString()}</span>
            </div>
          }
          title={<span>Funding</span>}
          isLoading={isLoading}
        />
        <Statistic
          icon={<RiWallet3Fill className="text-orange-primary h-5 w-5" />}
          value={
            <div className="flex items-center">
              <EngiIcon className="text-green-primary h-3 w-3 -mb-1" />
              {/* TODO: replace with real data when available */}
              <span className="ml-1 !text-secondary !font-normal">N/A</span>
            </div>
          }
          title={<span>Bonus</span>}
          isLoading={isLoading}
        />
        <Statistic
          icon={<RiCoinsFill className="text-orange-primary h-5 w-5" />}
          value={
            <div className="flex items-center">
              <EngiIcon className="text-green-primary h-3 w-3 -mb-1" />
              {/* TODO: replace with real data when available */}
              <span className="ml-1 !text-secondary !font-normal">N/A</span>
            </div>
          }
          title={<span>Per Assertion</span>}
          isLoading={isLoading}
        />
        <Statistic
          icon={<RiAwardFill className="text-orange-primary h-5 w-5" />}
          value={
            <div className="flex items-center">
              <EngiIcon className="text-green-primary h-3 w-3 -mb-1" />
              {/* TODO: replace with real data when available */}
              <span className="ml-1 !text-secondary !font-normal">N/A</span>
            </div>
          }
          title={<span>Honors Bracket</span>}
          isLoading={isLoading}
        />
        <Statistic
          icon={<RiTrophyFill className="text-orange-primary h-5 w-5" />}
          value={
            <div className="flex items-center">
              <EngiIcon className="text-green-primary h-3 w-3 -mb-1" />
              {/* TODO: replace with real data when available */}
              <span className="ml-1 !text-secondary !font-normal">N/A</span>
            </div>
          }
          title={<span>Winning Payout</span>}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
