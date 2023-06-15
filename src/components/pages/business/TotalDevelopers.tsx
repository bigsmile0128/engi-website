import React from 'react';
import classNames from 'classnames';
import './TotalDevelopers.css';

type TotalDevelopersProps = {
  className?: string;
};

export default function TotalDevelopers({ className }: TotalDevelopersProps) {
  return (
    <div className={classNames('grid grid-cols-2 space-x-8', className)}>
      <div>
        <p className="font-grifter capitalize text-4xl tablet:text-5xl">
          Total developers
        </p>
        <p className="text-secondary text-lg mt-4 tablet:mt-8">
          A huge network of quality developers on stand-by to start working on
          your bounties as soon as they are live
        </p>
      </div>
      <div className="total-developers-bg text-6xl flex items-center justify-center">
        2,000+
      </div>
      {/* TODO: add total developers after ENGIN-1064 is done */}
    </div>
  );
}
