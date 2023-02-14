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
        <span className="font-grifter text-3xl">Write code,</span>
        <span className="mt-2 font-grifter text-3xl">
          get <span className="text-green-primary">paid</span>.
        </span>
        <p className="mt-4 text-secondary">
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
