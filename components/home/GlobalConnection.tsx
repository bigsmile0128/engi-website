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
    <div
      className={classNames('relative flex flex-col justify-center', className)}
    >
      <div className="hidden sm:block absolute top-0 bottom-1/3 left-0 right-0">
        <GridPattern offset={-1} />
      </div>
      <div className="relative">
        <GridPattern className="block sm:hidden" offset={-1} />
        <div className="max-w-page py-12 z-10">
          <div className="relative flex flex-col items-center px-12 sm:px-0 text-center">
            <h2 className="font-grifter text-3xl lg:text-4xl">
              Global products built by global engineering
            </h2>
            <p className="text-gray-300 mt-2">
              Shattering borders, time zones, and language barriers
            </p>
            <PlaceholderButton className="mt-8" />
          </div>
        </div>
      </div>
      <div className="w-full max-w-5xl mx-auto mt-24 sm:mt-0 scale-125 sm:scale-100">
        <Image src={globeImg} loading="lazy" alt="global-connections" />
      </div>
    </div>
  );
}
