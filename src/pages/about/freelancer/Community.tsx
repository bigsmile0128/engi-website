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
          Join our community of coders
        </p>
        <p className="mt-8 text-secondary text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in
          elit vel mauris tincidunt porta.
        </p>
      </div>
      <CommunityCarousel className="mt-8" />
    </div>
  );
}
