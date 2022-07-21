import React from 'react';
import classNames from 'classnames';
import GridPattern from 'components/GridPattern';

type StatisticsProps = {
  className?: string;
};

export default function Statistics({ className }: StatisticsProps) {
  return (
    <div className={classNames('relative border border-white/20', className)}>
      <GridPattern className="top-0 left-0" sizeY={30} offset={-1} />
      <div className="px-8 py-12 md:py-16 lg:px-16 lg:py-16 flex flex-col sm:flex-row sm:items-start items-center justify-between gap-y-16">
        <div className="flex flex-col items-center">
          <span className="font-grifter text-5xl sm:text-4xl md:text-5xl xl:text-7xl">
            320+
          </span>
          <span className="text-lg">Active Jobs</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-grifter text-5xl sm:text-4xl md:text-5xl xl:text-7xl">
            $24,900
          </span>
          <span className="text-lg">Amount Funded</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-grifter text-5xl sm:text-4xl md:text-5xl xl:text-7xl">
            4,700+
          </span>
          <span className="text-lg">Lines of Code</span>
        </div>
      </div>
      <div className="absolute bottom-1 right-1 text-xs text-gray-400">
        For display purposes only
      </div>
    </div>
  );
}
