import React from 'react';
import classNames from 'classnames';
import { ReactComponent as GlobeSvg } from '../img/globe.svg';

interface GlobalConnectionProps {
  className?: string;
}

export default function GlobalConnection({ className }: GlobalConnectionProps) {
  return (
    <div className={classNames('relative flex justify-center', className)}>
      <svg className="absolute" width="100%" height="100%">
        <defs>
          <pattern
            id="grid"
            x="-1"
            y="-1"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <rect
              stroke="rgba(255,255,255,.1)"
              fill="none"
              width="40"
              height="40"
            ></rect>
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)"></rect>
      </svg>
      <div className="md:flex items-center justify-center max-w-3xl lg:max-w-4xl py-12 md:py-0 z-10">
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
