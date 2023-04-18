import React from 'react';
import classNames from 'classnames';
import CompoundSvg from 'public/img/about/compound.svg';
import EniacSvg from 'public/img/about/eniac.svg';
import ShineSvg from 'public/img/about/shine.svg';
import TribeSvg from 'public/img/about/tribe.svg';
import UpfrontSvg from 'public/img/about/upfront.svg';

type OurInvestorsProps = {
  className?: string;
};

export default function OurInvestors({ className }: OurInvestorsProps) {
  return (
    <div
      className={classNames(
        'max-w-page mt-32 flex flex-col xl:flex-row gap-x-8',
        className
      )}
    >
      <div className="text-left sm:text-center xl:text-left xl:basis-1/2">
        <h2 className="font-grifter text-4xl sm:text-5xl">Our Investors</h2>
        <p className="mt-4 text-gray-300">
          Our investors are some of the top leaders of their industries.
        </p>
      </div>
      <div className="flex flex-col mt-8 xl:mt-0">
        <div
          className={classNames(
            'flex flex-col sm:flex-row flex-wrap justify-center items-center gap-12',
            'mt-8 xl:mt-0',
            'xl:basis-1/2'
          )}
        >
          <UpfrontSvg className="h-8" />
          <CompoundSvg className="h-8" />
          <TribeSvg className="h-8" />
          <ShineSvg className="h-8" />
          <EniacSvg className="h-8" />
        </div>
      </div>
    </div>
  );
}
