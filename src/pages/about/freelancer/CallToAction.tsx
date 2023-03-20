import React from 'react';
import classNames from 'classnames';
import GridPattern from '~/components/global/GridPattern/GridPattern';
import Button from '~/components/global/Button/Button';
import Link from 'next/link';

type CallToActionProps = {
  className?: string;
};

export default function CallToAction({ className }: CallToActionProps) {
  return (
    <div
      className={classNames('relative flex flex-col items-center', className)}
    >
      <GridPattern offset={-1} id="freelancer-cta" />
      <div className="max-w-page flex flex-col text-center py-16">
        <div className="flex flex-col font-grifter text-3xl tablet:text-5xl tablet:flex-row gap-2 tablet:gap-4 justify-center">
          <span className="">Write code,</span>
          <span className="">
            get <span className="text-green-primary">paid</span>.
          </span>
        </div>
        <p className="mt-4 tablet:mt-8 text-secondary tablet:text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in
          elit vel mauris tincidunt porta.
        </p>
        <Link href="/login" className="mt-8">
          <Button variant="primary">Get Started</Button>
        </Link>
      </div>
    </div>
  );
}
