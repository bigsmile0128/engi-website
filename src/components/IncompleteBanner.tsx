import React from 'react';
import classNames from 'classnames';
import { RiErrorWarningLine } from 'react-icons/ri';

type IncompleteBannerProps = {
  className?: string;
};

export default function IncompleteBanner({ className }: IncompleteBannerProps) {
  return (
    <div
      className={classNames(
        'w-full p-4 flex items-center gap-x-4',
        'rounded-xl bg-yellow-400/30',
        className
      )}
    >
      <RiErrorWarningLine className="h-8 w-8" />
      <span className="font-medium text-lg">This is not implemented yet.</span>
    </div>
  );
}
