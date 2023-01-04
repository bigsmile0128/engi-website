import React from 'react';
import classNames from 'classnames';
import Image from 'next/legacy/image';
import worldImg from 'public/img/home/world-of-engi.png';
import PlaceholderButton from './PlaceholderButton';

type WorldOfEngineersProps = {
  className?: string;
};

export default function WorldOfEngineers({ className }: WorldOfEngineersProps) {
  return (
    <div
      className={classNames(
        'max-w-page md:grid grid-cols-2 grid-flow-row-dense gap-8 items-center',
        className
      )}
    >
      <div className="mb-12 md:mb-0">
        <h2 className="font-grifter text-3xl mb-4 whitespace-nowrap">
          World of{' '}
          <span className="relative text-gray-700">
            <div className="absolute w-full h-10 inset-0 -top-2 bg-green-primary z-0" />
            <span className="relative z-10">Engi</span>
          </span>
          neers
        </h2>
        <p className="text-secondary">
          A marketplace for custom software. Engineers come for flexibility,
          accessibility, and growth. Businesses come for new access to
          programmers across the world.
        </p>
        <PlaceholderButton className="mt-8" />
      </div>
      <div>
        <Image
          className="mx-auto drop-shadow-2xl"
          src={worldImg}
          alt="figma plugins"
          layout="responsive"
          loading="lazy"
          placeholder="blur"
        />
      </div>
    </div>
  );
}
