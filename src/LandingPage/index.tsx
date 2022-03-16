import React, { useEffect, useState } from 'react';
import {
  CodeIcon,
  AcademicCapIcon,
  FingerPrintIcon,
  KeyIcon,
} from '@heroicons/react/outline';
import classNames from 'classnames';

import Header from './Header';
import Hero from './Hero';
import EmailModal from './EmailModal';

const features = [
  {
    name: 'Open Source',
    description:
      'Bacon ipsum dolor sit amet. Rump chicken pork chop, cupim jerky ground round flank pig meatloaf.',
  },
  {
    name: 'Decentralized',
    description:
      'Cupcake ipsum dolor sit amet. Tootsie roll sesame snaps chocolate bar gummies tiramisu ice cream.',
  },
  {
    name: 'Blockchain',
    description:
      'Cheese ipsum dolor sit amet. Danish fontina blue castello fromage frais.',
  },
];

export default function LandingPage(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [isBlur, setIsBlur] = useState(false);

  const onEmailSignup = async () => {
    // TODO: make request to sign up for newsletter
    // TODO: add logging for failed email registration
    setModalOpen(true);
  };

  const onInterestClick = async () => {
    // TODO: make request for selecting interest
    // TODO: add logging for failed selection
  };

  // blur should only happen after the modal has already been rendered to prevent choppy re-render
  useEffect(() => {
    setIsBlur(modalOpen);
  }, [modalOpen]);

  return (
    <div
      className={classNames('bg-landing bg-cover', { 'blur-[10px]': isBlur })}
    >
      <Header />
      <main className="lg:relative">
        {/* Primary CTA */}
        <Hero onEmailSignup={onEmailSignup} />
        {/* Secondary CTA */}
        <div className="relative">
          <svg className="absolute" width="100%" height="100%">
            <defs>
              <pattern
                id="grid"
                x="20"
                y="20"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  stroke="rgba(255,255,255,.1)"
                  fill="none"
                  width="40"
                  height="40"
                ></rect>
              </pattern>
            </defs>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#grid)"
            ></rect>
          </svg>
          <div className="relative mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-12 lg:text-left">
            <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
              <h1 className="text-3xl font-bold text-slate-100 sm:text-4xl">
                <span className="block">
                  Global products build by global engineering
                </span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
                Shattering borders, time zones, and language barriers.
              </p>
              <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href="#"
                    className="w-full inline-flex items-center justify-center px-7 py-4 border border-gray-400 text-green-600 text-sm font-medium bg-gray-800 hover:bg-gray-400 sm:w-auto"
                  >
                    Learn more
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-full h-64 sm:h-72 md:h-72 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full lg:p-8">
            <img
              className="w-full h-full object-cover shadow-md rounded-2xl"
              src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
              alt=""
            />
          </div>
        </div>
        <div className="my-32 sm:my-24">
          <div className="max-w-full h-px mx-auto bg-gradient-to-r from-gray-800 via-green-700 to-gray-800"></div>
          <div className="w-full h-24 bg-gray-900 flex justify-center items-center">
            <CodeIcon className="h-6 w-6 text-green-700 shrink-0 mx-6" />
            <AcademicCapIcon className="h-6 w-6 text-green-700 shrink-0 mx-6" />
            <FingerPrintIcon className="h-6 w-6 text-green-700 shrink-0 mx-6" />
            <KeyIcon className="h-6 w-6 text-green-700 shrink-0 mx-6" />
          </div>
          <div className="max-w-full h-px mx-auto bg-gradient-to-r from-gray-800 via-green-700 to-gray-800"></div>
        </div>
        {/* Features */}
        <div className="max-w-7xl mx-auto pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-slate-100">
              Built by programmers for programmers
            </h2>
          </div>
          <dl className="mt-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <p className="ml-9 text-lg leading-6 font-medium text-green-600">
                    {feature.name}
                  </p>
                </dt>
                <dd className="mt-2 ml-9 text-base text-gray-400">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </main>
      <EmailModal
        open={modalOpen}
        setOpen={setModalOpen}
        onInterestClick={onInterestClick}
      />
    </div>
  );
}
