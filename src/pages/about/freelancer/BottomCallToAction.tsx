import React from 'react';
import classNames from 'classnames';
import GridPattern from '~/components/global/GridPattern/GridPattern';
import Button from '~/components/global/Button/Button';
import EngiCircleIcon from '~/components/global/icons/EngiCircleIcon';
import { HiChevronRight } from 'react-icons/hi';
import Link from 'next/link';

type BottomCallToActionProps = {
  className?: string;
};

export default function BottomCallToAction({
  className,
}: BottomCallToActionProps) {
  return (
    <div className={classNames('relative', className)}>
      <GridPattern id="freelancer-bottom-cta" offset={-1} />
      <div className="max-w-page max-w-[540px] w-full flex flex-col py-20">
        <p className="font-grifter text-4xl tablet:text-5xl text-center leading-[3rem]">
          Join our community
        </p>
        <span className="mt-8 text-lg text-secondary text-center tracking-wide">
          Start your first bit today
        </span>
        <Link href="/login">
          <Button className="mt-12 w-full flex items-center gap-4 !px-4 !py-6">
            <EngiCircleIcon className="text-green-primary h-11 w-11" />
            <span className="font-grifter text-2xl -mb-2">Get Started</span>
            <div className="ml-auto flex items-center gap-1">
              <HiChevronRight className="h-5 w-5 text-white/20" />
              <HiChevronRight className="h-7 w-7 -ml-2 text-white/60" />
              <HiChevronRight className="h-10 w-10 -ml-4 text-white" />
            </div>
          </Button>
        </Link>
      </div>
    </div>
  );
}
