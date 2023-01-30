import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import worldSrc from 'public/img/home/world.png';
import worldMobileSrc from 'public/img/home/world-mobile.png';
import PlaceholderButton from './PlaceholderButton';

type WorldOfEngineersProps = {
  className?: string;
};

export default function WorldOfEngineers({ className }: WorldOfEngineersProps) {
  return (
    <div
      className={classNames(
        'tablet:max-w-page tablet:flex items-center gap-8',
        className
      )}
    >
      <div className="max-w-page mb-8 tablet:mb-0 tablet:basis-1/3 laptop:desktop-1/4 shrink-0 grow-0">
        <h2 className="font-grifter text-3xl mb-4">
          World of{' '}
          <span className="whitespace-nowrap">
            <span className="inline-block relative text-gray-700">
              <div className="absolute w-full h-10 inset-0 -top-2 bg-green-primary z-0" />
              <span className="relative z-10">Engi</span>
            </span>
            neers
          </span>
        </h2>
        <p className="text-secondary">
          A marketplace for custom software. Engineers come for flexibility,
          accessibility, and growth. Businesses come for new access to
          programmers across the world.
        </p>
        <PlaceholderButton className="mt-8" />
      </div>
      <div>
        <Image className="hidden tablet:block" src={worldSrc} alt="world" />
        <Image className="tablet:hidden" src={worldMobileSrc} alt="world" />
      </div>
    </div>
  );
}
