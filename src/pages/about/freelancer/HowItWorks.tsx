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
    title: 'Create an account',
    description:
      'Bacon ipsum dolor sit amet. Rump chicken pork chop, cupim jerky ground round flank pig meatloaf shank frankfurter fatback turducken.',
  },
  {
    title: 'Start a job',
    description:
      'Bacon ipsum dolor sit amet. Rump chicken pork chop, cupim jerky ground round flank pig meatloaf shank frankfurter fatback turducken.',
  },
  {
    title: 'Get paid for solving',
    description:
      'Bacon ipsum dolor sit amet. Rump chicken pork chop, cupim jerky ground round flank pig meatloaf shank frankfurter fatback turducken.',
  },
  {
    title: 'Recommended jobs',
    description:
      'Bacon ipsum dolor sit amet. Rump chicken pork chop, cupim jerky ground round flank pig meatloaf shank frankfurter fatback turducken.',
  },
];

export default function HowItWorks({ className }: HowItWorksProps) {
  return (
    <div className={classNames('w-full', className)}>
      <div className="max-w-page tablet:text-center">
        <p className="font-grifter text-4xl tablet:text-5xl">How It Works?</p>
        <p className="text-secondary text-lg tablet:mt-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in
          elit vel mauris tincidunt porta.
        </p>
      </div>
      <Image
        src={laptopSplashImg}
        className="mt-8 pl-4 w-full max-w-page mr-0 pr-0"
        alt="how-it-works"
      />
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
      <div className="mt-8 max-w-page w-full tablet:hidden">
        <Link href="/bits">
          <Button variant="primary">Earn now</Button>
        </Link>
      </div>
    </div>
  );
}
