import React from 'react';
import classNames from 'classnames';

import HeroTextSvg from './img/hero-text.svg';
import HeroTopSvg from './img/hero-top.svg';
import HeroBottomSvg from './img/hero-bottom.svg';
import sitePreviewImg from './img/site-preview.png';
import Image from 'next/image';

interface HeroProps {
  className?: string;
}

export default function Hero({ className }: HeroProps) {
  return (
    <div className={classNames('flex flex-col items-start', className)}>
      <div className="w-full mt-20 mb-16 lg:mb-24 flex gap-x-12">
        <HeroTextSvg className="max-w-2xl" />
        <p className="w-1/3 hidden lg:block text-lg">
          Write code and get paid instantly. Have a design? Engage worldwide
          talent and build products faster.
        </p>
      </div>
      <div className="w-full grid justify-center grid-cols-1 lg:justify-between lg:grid-cols-2 lg:gap-x-4">
        <div className="flex flex-col whitespace-nowrap gap-y-4">
          <div className="shrink-0 flex gap-x-4 items-center justify-between mb-4">
            <div className="flex items-center gap-x-3 text-white">
              <div className="h-4 w-4 bg-white rounded-full"></div>
              <span className="text-sm sm:text-md">
                New
                <span className="hidden sm:inline"> Jobs</span>
              </span>
            </div>
            <div className="flex items-center gap-x-3 text-emerald-300">
              <div className="h-4 w-4 bg-emerald-300 rounded-full"></div>
              <span className="text-sm sm:text-md">
                Completed
                <span className="hidden sm:inline"> Jobs</span>
              </span>
            </div>
            <div className="flex items-center gap-x-3 text-orange-500">
              <div className="h-4 w-4 bg-orange-500 rounded-full"></div>
              <span className="text-sm sm:text-md">
                Active
                <span className="hidden sm:inline"> Jobs</span>
              </span>
            </div>
          </div>
          <HeroTopSvg />
          <HeroBottomSvg />
        </div>
        <div className="-mt-10 row-start-1 lg:col-start-2">
          <Image
            className="w-full h-auto"
            src={sitePreviewImg}
            alt="site-preview"
          />
        </div>
      </div>
    </div>
  );
}
