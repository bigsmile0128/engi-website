import React from 'react';
import classNames from 'classnames';
import CommunityCarousel from './CommunityCarousel';

type CommunityProps = {
  className?: string;
};

export default function Community({ className }: CommunityProps) {
  return (
    <div className={classNames('', className)}>
      <div className="max-w-page w-full">
        <p className="font-grifter text-4xl tablet:text-5xl">
          Join our Community of Coders
        </p>
        <p className="mt-8 text-secondary text-lg">
          Join ranks with some of the coolest engineers in the world, who ship
          fast and work flexibly
        </p>
      </div>
      <CommunityCarousel className="mt-8" />
    </div>
  );
}
