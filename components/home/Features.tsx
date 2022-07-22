import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Fragment } from 'react';
import { Tab } from '@headlessui/react';
import GridPattern from 'components/GridPattern';
import Button from 'components/Button';
import TokenContractSvg from 'components/home/img/token-contract.svg';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import ForwardSlashSvg from 'components/icons/forward-slash.svg';

interface FeaturesProps {
  className?: string;
}

const features = [
  {
    name: 'Secure, Sovereign Blockchain',
    description: 'Written in Rust and built on the foundations of Substrate',
  },
  {
    name: 'Open-Governance, Open-Source',
    description: 'You influence the development of Engi’s technology ecosystem',
  },
  {
    name: 'Anonymous, Accessible, Equitable',
    description: 'Speed and skill are all that is needed for greatness ',
  },
];

export default function Features({ className }: FeaturesProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  return (
    <div className={classNames('', className)}>
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="font-grifter text-3xl font-extrabold text-slate-100">
          Built by programmers, for programmers
        </h2>
      </div>
      <div className="relative md:hidden">
        <div className="embla" ref={emblaRef}>
          <div className="flex">
            {features.map(({ name, description }) => (
              <div
                key={name}
                className="relative grow-0 shrink-0 basis-full flex flex-col items-center text-center px-12"
              >
                <span className="text-xl text-emerald-300 mb-4">{name}</span>
                <span className={classNames('text-md text-white font-medium')}>
                  {description}
                </span>
              </div>
            ))}
          </div>
        </div>
        <button
          className="absolute h-8 w-8 top-1/2 -translate-y-1/2 left-0"
          onClick={scrollPrev}
        >
          <ChevronLeftIcon />
        </button>
        <button
          className="absolute h-8 w-8 top-1/2 -translate-y-1/2 right-0"
          onClick={scrollNext}
        >
          <ChevronRightIcon />
        </button>
      </div>
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="hidden md:flex w-full">
          {features.map(({ name, description }) => (
            <Tab as={Fragment} key={name}>
              {({ selected }) => (
                <button
                  className={classNames(
                    'flex flex-1 flex-col items-center text-center border-b px-12 pb-8',
                    selected
                      ? 'border-emerald-300 border-b-2'
                      : 'border-gray-400'
                  )}
                >
                  <span className="text-xl text-emerald-300 mb-4">{name}</span>
                  <span
                    className={classNames(
                      'text-md',
                      selected ? 'text-white font-medium' : 'text-gray-300'
                    )}
                  >
                    {description}
                  </span>
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-12">
          <Tab.Panel>
            <Tab1 />
          </Tab.Panel>
          <Tab.Panel>
            <Tab2 />
          </Tab.Panel>
          <Tab.Panel>
            <Tab3 />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

function Tab1({ className }: { className?: string }) {
  return (
    <div className={classNames('flex flex-col lg:flex-row', className)}>
      <div className="relative">
        <GridPattern offset={-1} />
        <div className="px-8 py-16 flex flex-col items-start justify-center border border-white/30 lg:border-b-1">
          <span className="uppercase mb-4">Secure</span>
          <h4 className="font-bold text-4xl uppercase mb-4">
            <ForwardSlashSvg className="inline h-6 w-6 -mt-1.5 mr-2" />
            Economics
          </h4>
          <p className="text-lg text-gray-300 leading-normal">
            A transparent, performant, and secure marketplace for coding work.
          </p>
          <Button className="mt-8">Coming Soon</Button>
        </div>
      </div>
      <div className="shrink-0 flex items-center justify-center basis-3/5 mt-8 sm:mt-0 sm:p-8 sm:border border-white/30 lg:border-l-0">
        <TokenContractSvg className="w-full h-auto" />
      </div>
    </div>
  );
}

function Tab2({ className }: { className?: string }) {
  return (
    <div className={classNames('flex flex-col lg:flex-row', className)}>
      <div className="relative">
        <GridPattern offset={-1} />
        <div className="px-8 py-16 flex flex-col items-start justify-center border border-white/30 lg:border-b-1">
          <span className="uppercase mb-4">Open</span>
          <h4 className="font-bold text-4xl uppercase mb-4">
            <ForwardSlashSvg className="inline h-6 w-6 -mt-1.5 mr-2" />
            {'Source & Governed'}
          </h4>
          <p className="text-lg text-gray-300 leading-normal">
            Participants in the Engi Network own their destiny and the future of
            technical work.
          </p>
          <Button className="mt-8">Coming Soon</Button>
        </div>
      </div>
      <div className="shrink-0 flex items-center justify-center basis-3/5 mt-8 sm:mt-0 sm:p-8 sm:border border-white/30 lg:border-l-0">
        <TokenContractSvg className="w-full h-auto" />
      </div>
    </div>
  );
}

function Tab3({ className }: { className?: string }) {
  return (
    <div className={classNames('flex flex-col lg:flex-row', className)}>
      <div className="relative">
        <GridPattern offset={-1} />
        <div className="px-8 py-16 flex flex-col items-start justify-center border border-white/30 lg:border-b-1">
          <span className="uppercase mb-4">
            Whoever
            <br />
            Whenever
          </span>
          <h4 className="font-bold text-4xl uppercase mb-4">
            <ForwardSlashSvg className="inline h-6 w-6 -mt-1.5 mr-2" />
            Wherever
          </h4>
          <p className="text-lg text-gray-300 leading-normal">
            Anyone can start coding on Engi right away. No interviews, no
            commutes. Just you and your leet coding skillz.
          </p>
          <Button className="mt-8">Coming Soon</Button>
        </div>
      </div>
      <div className="shrink-0 flex items-center justify-center basis-3/5 mt-8 sm:mt-0 sm:p-8 sm:border border-white/30 lg:border-l-0">
        <TokenContractSvg className="w-full h-auto" />
      </div>
    </div>
  );
}
