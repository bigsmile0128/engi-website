'use client';

import React from 'react';
import classNames from 'classnames';
import laptopSplashImg from 'public/img/about/freelancer/laptop.png';
import Image from 'next/image';
import { Disclosure } from '@headlessui/react';
import { HiMinus, HiPlus } from 'react-icons/hi';
import Link from 'next/link';
import Button from '~/components/global/Button/Button';

type HowItWorksProps = {
  className?: string;
};

const items = [
  {
    title: 'Setup your Account',
    description:
      'You own your keys. Bring your wallet, connect to Engi, and download the tools',
  },
  {
    title: 'Pick a Bounty',
    description:
      'An endless variety of technologies, domains, and difficulty provide of buffet of technical opportunity',
  },
  {
    title: 'Attempt to Solve',
    description:
      'Write your solution as fast as possible while also optimizing for performance and style-guide adherence',
  },
  {
    title: 'Get Paid',
    description: 'Your awesome code is rewarded with an immediate payout',
  },
];

export default function HowItWorks({ className }: HowItWorksProps) {
  return (
    <div className={classNames('w-full', className)}>
      <div className="max-w-page tablet:text-center">
        <p className="font-grifter text-4xl tablet:text-5xl">How It Works?</p>
        <p className="text-secondary text-lg tablet:mt-8">
          Set up your local environment to work on Engi and unlock a new way of
          earning cash writing code
        </p>
      </div>
      <div className="w-full relative">
        <Image
          src={laptopSplashImg}
          className="mt-8 pl-4 w-full max-w-page mr-0 pr-0 desktop:hidden"
          alt="how-it-works"
        />
        <Image
          src={laptopSplashImg}
          className="hidden desktop:block absolute w-1/2 right-0 pl-12 mt-8 max-w-[700px]"
          alt="how-it-works"
        />
      </div>
      <div className="max-w-page desktop:grid grid-cols-2">
        <div className="mt-8 max-w-page w-full flex flex-col gap-6">
          {items.map(({ title, description }) => (
            <Disclosure
              as="div"
              key={title}
              className="w-full p-6 border border-white/30"
            >
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={classNames(
                      'w-full font-bold text-xl flex items-center justify-between',
                      open
                        ? 'text-green-primary'
                        : 'text-white hover:text-green-primary'
                    )}
                  >
                    <span>{title}</span>
                    {open ? (
                      <HiMinus className="text-white" />
                    ) : (
                      <HiPlus className="text-white" />
                    )}
                  </Disclosure.Button>
                  <Disclosure.Panel className="mt-8 font-medium text-xl">
                    {description}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
      <div className="mt-8 max-w-page w-full tablet:hidden">
        <Link href="/bits">
          <Button variant="primary">Earn now</Button>
        </Link>
      </div>
    </div>
  );
}
