import React from 'react';
import classNames from 'classnames';

import globeSrc from '~/img/globe.svg';
import GridPattern from '~/components/GridPattern';

interface GlobalConnectionProps {
  className?: string;
}

export default function GlobalConnection({ className }: GlobalConnectionProps) {
  return (
    <div className={classNames('relative flex justify-center', className)}>
      <GridPattern offset={-1} />
      <div className="z-10 max-w-3xl items-center justify-center py-12 md:flex md:py-0 lg:max-w-4xl">
        <div className="mb-12 flex flex-col px-12 sm:px-0 md:mb-0">
          <h2 className="font-grifter text-3xl">
            Global products built by global engineering
          </h2>
          <p className="text-gray-300">
            Shattering borders, time zones, and language barriers
          </p>
        </div>
        <img
          src={globeSrc}
          alt="globe"
          className="block shrink-0 md:w-[450px] lg:w-[600px]"
        />
      </div>
    </div>
  );
}
