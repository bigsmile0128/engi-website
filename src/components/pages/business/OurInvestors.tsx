import React from 'react';
import classNames from 'classnames';
import UpfrontSvg from 'public/img/about/upfront.svg';
import CompoundSvg from 'public/img/about/compound.svg';
import TribeSvg from 'public/img/about/tribe.svg';
import ShineSvg from 'public/img/about/shine.svg';
import EniacSvg from 'public/img/about/eniac.svg';

type OurInvestorsProps = {
  className?: string;
};

export default function OurInvestors({ className }: OurInvestorsProps) {
  return (
    <div className={classNames('flex flex-col items-center', className)}>
      <p className="font-bold text-xl">Our Investors</p>
      <div
        className={classNames(
          'mt-8 grid place-items-center gap-y-12',
          'grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-5',
          'gap-x-8 tablet:gap-x-16'
        )}
      >
        <UpfrontSvg className="w-full" />
        <CompoundSvg className="w-full" />
        <TribeSvg className="w-full" />
        <ShineSvg className="w-full" />
        <EniacSvg className="w-full" />
      </div>
    </div>
  );
}
