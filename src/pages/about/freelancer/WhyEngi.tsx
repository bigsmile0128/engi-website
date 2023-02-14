import React from 'react';
import classNames from 'classnames';
import ReasonCarousel from './ReasonCarousel';

type WhyEngiProps = {
  className?: string;
};

export default function WhyEngi({ className }: WhyEngiProps) {
  return (
    <div className={classNames('mt-32 w-full', className)}>
      <p className="max-w-page font-grifter text-4xl">
        Why work on Bits on Engi
      </p>
      <ReasonCarousel className="mt-8" />
    </div>
  );
}
