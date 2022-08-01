import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Fragment } from 'react';
import { Tab } from '@headlessui/react';
import GridPattern from 'components/GridPattern';
import Button from 'components/Button';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import ForwardSlashSvg from 'components/icons/forward-slash.svg';
import TokenContractSvg from 'public/img/home/features1.svg';
import featuresSrc2 from 'public/img/home/features2.png';
import featuresSrc3 from 'public/img/home/features3.png';
import Image from 'next/image';

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

  const canScrollPrev = useCallback(() => {
    if (emblaApi) {
      return emblaApi.canScrollPrev();
    }
    return false;
  }, [emblaApi]);

  const canScrollNext = useCallback(() => {
    if (emblaApi) {
      return emblaApi.canScrollNext();
    }
    return false;
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
      <div className="max-w-3xl mx-auto sm:text-center mb-12">
        <h2 className="font-grifter text-3xl font-extrabold text-slate-100">
          Built by programmers, for programmers
        </h2>
      </div>
      <div className="relative md:hidden">
        <div className="overflow-hidden" ref={emblaRef}>
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
          className={classNames(
            'absolute h-8 w-8 top-1/2 -translate-y-1/2 left-0',
            !canScrollPrev() ? 'text-white/20' : ''
          )}
          onClick={scrollPrev}
          disabled={!canScrollPrev()}
        >
          <ChevronLeftIcon />
        </button>
        <button
          className={classNames(
            'absolute h-8 w-8 top-1/2 -translate-y-1/2 right-0',
            !canScrollNext() ? 'text-white/20' : ''
          )}
          onClick={scrollNext}
          disabled={!canScrollNext()}
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
                    'flex flex-1 flex-col items-center text-center border-b px-12 py-8 focus:outline-none focus:ring-1 ring-emerald-300',
                    selected
                      ? 'border-emerald-300 border-b-2'
                      : 'border-gray-400'
                  )}
                >
                  <span className="text-xl text-emerald-300 mb-4">{name}</span>
                  <span
                    className={classNames(
                      'text-md',
                      selected ? 'text-white font-medium' : 'text-secondary'
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
            <Tab1 className="lg:h-96 xl:h-[30rem]" />
          </Tab.Panel>
          <Tab.Panel>
            <Tab2 className="lg:h-96 xl:h-[30rem]" />
          </Tab.Panel>
          <Tab.Panel>
            <Tab3 className="lg:h-96 xl:h-[30rem]" />
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
        <div className="h-full px-8 py-16 sm:py-8 flex flex-col items-start justify-center border border-white/30 sm:border-b-0 lg:!border-b-[1px]">
          <span className="uppercase mb-4">Secure</span>
          <h4 className="font-bold text-4xl uppercase mb-4">
            <ForwardSlashSvg className="inline h-6 w-6 -mt-1.5 mr-2" />
            Economics
          </h4>
          <p className="text-lg text-secondary leading-normal">
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
        <div className="h-full px-8 py-16 sm:py-8 flex flex-col items-start justify-center border border-white/30 sm:border-b-0 lg:!border-b-[1px]">
          <span className="uppercase mb-4">Open</span>
          <h4 className="font-bold text-4xl uppercase mb-4">
            <ForwardSlashSvg className="inline h-6 w-6 -mt-1.5 mr-2" />
            {'Source & Governed'}
          </h4>
          <p className="text-lg text-secondary leading-normal">
            Participants in the Engi Network own their destiny and the future of
            technical work.
          </p>
          <Button className="mt-8">Coming Soon</Button>
        </div>
      </div>
      <div className="shrink-0 flex items-center justify-center basis-3/5 mt-8 sm:mt-0 sm:p-8 sm:border border-white/30 lg:border-l-0">
        <Image src={featuresSrc2} loading="lazy" alt="source" />
      </div>
    </div>
  );
}

function Tab3({ className }: { className?: string }) {
  return (
    <div className={classNames('flex flex-col lg:flex-row', className)}>
      <div className="relative">
        <GridPattern offset={-1} />
        <div className="h-full px-8 py-16 sm:py-8 flex flex-col items-start justify-center border border-white/30 sm:border-b-0 lg:!border-b-[1px]">
          <span className="uppercase mb-4">
            Whoever
            <br />
            Whenever
          </span>
          <h4 className="font-bold text-4xl uppercase mb-4">
            <ForwardSlashSvg className="inline h-6 w-6 -mt-1.5 mr-2" />
            Wherever
          </h4>
          <p className="text-lg text-secondary leading-normal">
            Anyone can start coding on Engi right away. No interviews, no
            commutes.
          </p>
          <Button className="mt-8">Coming Soon</Button>
        </div>
      </div>
      <div className="shrink-0 flex items-center justify-center basis-3/5 mt-8 sm:mt-0 sm:border border-white/30 lg:border-l-0 border children:!h-full">
        <Image
          src={featuresSrc3}
          loading="lazy"
          className="object-cover"
          alt="wherever"
        />
      </div>
    </div>
  );
}
