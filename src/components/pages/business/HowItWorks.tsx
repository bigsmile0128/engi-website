'use client';

import { Disclosure } from '@headlessui/react';
import classNames from 'classnames';
import { HiMinus, HiPlus } from 'react-icons/hi';

type HowItWorksProps = {
  className?: string;
};

const items = [
  {
    title: 'Prepare your Requirements',
    description:
      'Specify your bounty requirements such as a design that needs to be implemented or a test for a bugfix that should pass',
  },
  {
    title: 'Publish the Bounty',
    description:
      'Fund the requirements with $ENGI tokens and publish it to the blockchain making it available to the entire network',
  },
  {
    title: 'Receive a PR',
    description:
      'Developers start working immediately. You receive a PR from the first submission that passes all specified correctness, performance, and quality thresholds.',
  },
];

export default function HowItWorks({ className }: HowItWorksProps) {
  return (
    <div className={classNames('xl:flex xl:items-center xl:gap-16', className)}>
      <div className="tablet:text-center xl:text-left lg:max-w-50">
        <p className="font-grifter text-4xl tablet:text-5xl">How It Works?</p>
        <p className="text-secondary text-lg mt-4 tablet:mt-8">
          Engi is a platform for contactless engineering engagements. Provide
          precise specifications of your products&apos; needs along with token
          funding - developers around the world then start right away
        </p>
      </div>
      <div className="mt-8 w-full flex flex-col tablet:gap-6 xl:gap-0 xl:mt-0">
        {items.map(({ title, description }, i) => (
          <Disclosure key={title}>
            {({ open }) => (
              <div
                className={classNames(
                  'w-full border',
                  '-mt-[1px]', // negative margin for shared borders
                  'xl:px-12 xl:h-64 xl:flex xl:items-center',
                  open
                    ? 'bg-[#161B28]/30 border-green-primary'
                    : 'border-white/30'
                )}
              >
                <Disclosure.Button
                  className={classNames('w-full p-6 xl:h-full xl:p-0')}
                >
                  <div className="w-full font-bold text-2xl flex items-start xl:items-center gap-4 xl:gap-12">
                    <div className="font-grifter text-green-primary -mb-1">
                      {(i + 1).toString().padStart(2, '0')}
                    </div>
                    <div className="flex-1 flex flex-col gap-6">
                      <div className="flex justify-between">
                        <span className="font-grifter -mb-1 text-left">
                          {title}
                        </span>
                        {open ? (
                          <HiMinus className="text-white hidden tablet:block xl:hidden" />
                        ) : (
                          <HiPlus className="text-white hidden tablet:block xl:hidden" />
                        )}
                      </div>
                      <Disclosure.Panel
                        className={classNames(
                          'font-medium text-xl text-left tablet:hidden xl:block'
                        )}
                      >
                        {description}
                      </Disclosure.Panel>
                    </div>
                  </div>
                </Disclosure.Button>
                {/* TABLET: separate panel to line up to left of number instead of title */}
                <Disclosure.Panel
                  className={classNames(
                    'p-6 pt-0 font-medium text-xl hidden tablet:block xl:hidden'
                  )}
                >
                  {description}
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
}
