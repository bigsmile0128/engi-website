import React from 'react';
import {
  CodeIcon,
  AcademicCapIcon,
  FingerPrintIcon,
  KeyIcon,
} from '@heroicons/react/outline';
import Header from './Header';

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
  return (
    <div className="bg-black">
      {/* TODO: bg gradient */}
      <Header />
      <main className="lg:relative">
        {/* Primary CTA */}
        {/* TODO: divider */}
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-100 sm:text-4xl">
            <span className="block">Uber for Programmers</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-200">
            An innovative way, reliable way to source code development at a high
            cost efficiency.
          </p>
          <a
            href="#"
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
          >
            View Case Study
          </a>
        </div>
        {/* TODO: divider */}
        {/* Secondary CTA */}
        {/* TODO: grid pattern */}
        <div className="relative">
          <div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-12 lg:text-left">
            <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
              <h1 className="text-3xl font-bold font-extrabold text-slate-100 sm:text-4xl">
                <span className="block">
                  Global products build by global engineering
                </span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
                Shattering borders, time zones, and language barriers.
              </p>
              <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                {/* TODO: style button */}
                <div className="rounded-md shadow">
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                    Learn more
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-full h-64 sm:h-72 md:h-72 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
            <img
              className="absolute inset-0 w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
              alt=""
            />
          </div>
        </div>
        {/* TODO: make responsive */}
        {/* TODO: border fade gradient */}
        <div className="w-full h-24 bg-gray-900 border-y border-green-700 my-12 flex justify-center items-center">
          <CodeIcon className="h-6 w-6 text-green-700 shrink-0 mx-6" />
          <AcademicCapIcon className="h-6 w-6 text-green-700 shrink-0 mx-6" />
          <FingerPrintIcon className="h-6 w-6 text-green-700 shrink-0 mx-6" />
          <KeyIcon className="h-6 w-6 text-green-700 shrink-0 mx-6" />
        </div>
        <div>
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-16 lg:px-8">
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
        </div>
      </main>
    </div>
  );
}
