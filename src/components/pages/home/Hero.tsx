import React from 'react';
import classNames from 'classnames';

import HeroTextSvg from 'public/img/home/hero-text.svg';
import HeroTopSvg from 'public/img/home/hero-top.svg';
import HeroBottomSvg from 'public/img/home/hero-bottom.svg';
import sitePreviewImg from 'public/img/home/site-preview.png';
import Image from 'next/image';
import Button from '~/components/global/Button/Button';
import Link from 'next/link';

interface HeroProps {
  className?: string;
}

export default function Hero({ className }: HeroProps) {
  return (
    <div className={classNames('flex flex-col items-start', className)}>
      <div
        className={classNames(
          'w-full flex flex-col lg:flex-row gap-x-12',
          'pt-8 sm:pt-16 lg:pt-24'
        )}
      >
        <HeroTextSvg className="max-w-2xl sm:w-2/3 lg:w-full lg:h-48" />
        <p
          className={classNames(
            'sm:hidden lg:block lg:w-1/3',
            'mt-4',
            'text-lg text-secondary'
          )}
        >
          Write code and get paid instantly. Have a design? Engage worldwide
          talent and build products faster.
        </p>
      </div>
      <div
        className={classNames(
          'w-full grid justify-center grid-cols-1',
          'mt-8 lg:mt-16',
          'lg:justify-between lg:grid-cols-2 lg:gap-x-4'
        )}
      >
        <div className="flex flex-col whitespace-nowrap gap-y-4">
          <div className="shrink-0 flex gap-x-4 items-center justify-between mb-4">
            <div className="flex items-center gap-x-1 sm:gap-x-3 text-white">
              <div className="h-4 w-4 bg-white rounded-full"></div>
              <span className="text-xs sm:text-base">New Jobs</span>
            </div>
            <div className="flex items-center gap-x-1 sm:gap-x-3 text-green-primary">
              <div className="h-4 w-4 bg-green-primary rounded-full"></div>
              <span className="text-xs sm:text-base">Completed Jobs</span>
            </div>
            <div className="flex items-center gap-x-1 sm:gap-x-3 text-orange-500">
              <div className="h-4 w-4 bg-orange-500 rounded-full"></div>
              <span className="text-xs sm:text-base">Active Jobs</span>
            </div>
          </div>
          <HeroTopSvg />
          <HeroBottomSvg />
        </div>
        <div className={classNames('row-start-1 lg:col-start-2', '-mt-6')}>
          <Image src={sitePreviewImg} alt="site-preview" sizes="50vw" />
          <Link href="/signup">
            <Button className="w-full mt-8 mb-12 sm:hidden">Get Started</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
