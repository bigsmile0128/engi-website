import React from 'react';
import classNames from 'classnames';
import './TotalDevelopers.css';

type TotalDevelopersProps = {
  className?: string;
};

export default function TotalDevelopers({ className }: TotalDevelopersProps) {
  return (
    <div
      className={classNames(
        'grid grid-rows-2 tablet:grid-cols-2 space-y-8 tablet:space-x-8 tablet:space-y-0',
        className
      )}
    >
      <div>
        <p className="font-grifter capitalize text-4xl tablet:text-5xl">
          Total developers
        </p>
        <p className="text-secondary text-lg mt-4 tablet:mt-8">
          A huge network of quality developers on stand-by to start working on
          your bounties as soon as they are live
        </p>
      </div>
      <div className="total-developers-bg text-6xl w-full tablet:mt-0 flex items-center justify-center">
        2,000+
      </div>
      {/* TODO: add total developers after ENGIN-1064 is done */}
    </div>
  );
}
