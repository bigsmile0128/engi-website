import React from 'react';
import classNames from 'classnames';

import GlobeSvg from './img/globe.svg';
import GridPattern from 'components/GridPattern';

interface GlobalConnectionProps {
  className?: string;
}

export default function GlobalConnection({ className }: GlobalConnectionProps) {
  return (
    <div className={classNames('relative flex justify-center', className)}>
      <GridPattern offset={-1} />
      <div className="md:flex items-center justify-center max-w-page py-12 md:py-0 z-10">
        <div className="flex flex-col mb-12 md:mb-0 px-12 sm:px-0">
          <h2 className="font-grifter text-3xl">
            Global products built by global engineering
          </h2>
          <p className="text-gray-300">
            Shattering borders, time zones, and language barriers
          </p>
        </div>
        <GlobeSvg className="md:w-[450px] lg:w-[600px] shrink-0 block" />
      </div>
    </div>
  );
}
