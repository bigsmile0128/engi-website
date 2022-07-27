import React from 'react';
import classNames from 'classnames';

import GridPattern from 'components/GridPattern';
import Image from 'next/image';
import globeImg from 'public/img/home/globe.png';
import PlaceholderButton from './PlaceholderButton';

interface GlobalConnectionProps {
  className?: string;
}

export default function GlobalConnection({ className }: GlobalConnectionProps) {
  return (
    <div className={classNames('relative flex justify-center', className)}>
      <GridPattern offset={-1} />
      <div className="max-w-page pt-24 pb-0 z-10">
        <div className="flex flex-col items-center mb-12 px-12 sm:px-0 text-center">
          <h2 className="font-grifter text-3xl lg:text-4xl">
            Global products built by global engineering
          </h2>
          <p className="text-gray-300 mt-2">
            Shattering borders, time zones, and language barriers
          </p>
          <PlaceholderButton className="mt-8" />
        </div>
        <div className="w-full max-w-4xl">
          <Image src={globeImg} alt="global-connections" />
        </div>
      </div>
    </div>
  );
}
