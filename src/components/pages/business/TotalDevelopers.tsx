import React from 'react';
import classNames from 'classnames';

type TotalDevelopersProps = {
  className?: string;
};

export default function TotalDevelopers({ className }: TotalDevelopersProps) {
  return (
    <div className={classNames('', className)}>
      <p className="font-grifter text-4xl tablet:text-5xl">Total developers</p>
      <p className="text-secondary text-lg mt-4 tablet:mt-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in elit
        vel mauris tincidunt porta.
      </p>
      {/* TODO: add total developers after ENGIN-1064 is done */}
    </div>
  );
}
