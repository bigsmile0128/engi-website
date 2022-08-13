import React from 'react';
import classNames from 'classnames';
import { AiFillCreditCard } from 'react-icons/ai';
import {
  RiAwardFill,
  RiCoinsFill,
  RiTrophyFill,
  RiWallet3Fill,
} from 'react-icons/ri';
import EngiIcon from 'components/icons/EngiIcon';

type PayoutProps = {
  className?: string;
};

export default function Payout({ className }: PayoutProps) {
  return (
    <div className={classNames('p-6 bg-black/[.14] w-full', className)}>
      <h2 className="font-grifter text-xl">Payout</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-4">
        <Stat
          icon={<AiFillCreditCard className="text-orange-primary h-5 w-5" />}
          name={
            <div className="flex items-center">
              <EngiIcon className="text-green-primary h-3 w-3 -mb-1" />
              <span className="font-bold text-xl ml-0.5">100</span>
            </div>
          }
          subtitle={<span>Funding</span>}
        />
        <Stat
          icon={<RiWallet3Fill className="text-orange-primary h-5 w-5" />}
          name={
            <div className="flex items-center">
              <EngiIcon className="text-green-primary h-3 w-3 -mb-1" />
              <span className="font-bold text-xl ml-0.5">194</span>
            </div>
          }
          subtitle={<span>Bonus</span>}
        />
        <Stat
          icon={<RiCoinsFill className="text-orange-primary h-5 w-5" />}
          name={
            <div className="flex items-center">
              <EngiIcon className="text-green-primary h-3 w-3 -mb-1" />
              <span className="font-bold text-xl ml-0.5">300</span>
            </div>
          }
          subtitle={<span>Per Assertion</span>}
        />
        <Stat
          icon={<RiAwardFill className="text-orange-primary h-5 w-5" />}
          name={
            <div className="flex items-center">
              <EngiIcon className="text-green-primary h-3 w-3 -mb-1" />
              <span className="font-bold text-xl ml-0.5">100</span>
            </div>
          }
          subtitle={<span>Honors Bracket</span>}
        />
        <Stat
          icon={<RiTrophyFill className="text-orange-primary h-5 w-5" />}
          name={
            <div className="flex items-center">
              <EngiIcon className="text-green-primary h-3 w-3 -mb-1" />
              <span className="font-bold text-xl ml-0.5">194</span>
            </div>
          }
          subtitle={<span>Winning Payout</span>}
        />
      </div>
    </div>
  );
}

function Stat({ icon, name, subtitle }) {
  return (
    <div className="grid grid-cols-[min-content_1fr] gap-x-3 gap-y-1 mt-2">
      <div className="col-span-1 row-span-1 self-center">{icon}</div>
      <div className="col-start-2">{name}</div>
      <span className="col-start-2 row-start-2 text-sm text-secondary">
        {subtitle}
      </span>
    </div>
  );
}
