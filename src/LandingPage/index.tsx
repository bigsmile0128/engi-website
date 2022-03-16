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
import FigmaPreview from './FigmaPreview';

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
        <FigmaPreview />
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
