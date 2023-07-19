'use client';

import { Tab } from '@headlessui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import TokenContractSvg from 'public/img/home/features1.svg';
import featuresSrc2 from 'public/img/home/features2.png';
import featuresSrc3 from 'public/img/home/features3.png';
import { Fragment, useCallback, useEffect, useState } from 'react';
import Button from '~/components/global/Button/Button';
import GridPattern from '~/components/global/GridPattern/GridPattern';
import ForwardSlashSvg from '~/components/global/icons/forward-slash.svg';

interface FeaturesProps {
  className?: string;
}

const features = [
  {
    name: 'Flexible, Contactless, Fast, Fun',
    description:
      'Never commute or whiteboard interview again. Code is securely evaluated & paid for automatically on-chain',
    Tab: () => <Tab3 className="lg:h-96 xl:h-[30rem]" />,
  },
  {
    name: 'Performant Scalable Protocol',
    description:
      'WASM+EVM compatible, egalitarian computation-based consensus, & native tokenomics backed by labor',
    Tab: () => <MarketplaceDynamics className="lg:h-96 xl:h-[30rem]" />,
  },
  {
    name: 'User-Owned Future of Work',
    description:
      'Accumulate influence to vote on fees structures, protocol upgrades, ecosystem dividends, & more',
    Tab: () => <CommunityOwnership className="lg:h-96 xl:h-[30rem]" />,
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
    <div
      className={classNames(
        'bg-secondary/40 backdrop-blur-[100px] py-24',
        className
      )}
    >
      <div className="max-w-page">
        <div className="max-w-3xl mx-auto sm:text-center mb-12">
          <h2 className="font-grifter text-3xl font-extrabold text-slate-100">
            Built by Programmers, for Programmers
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
                  <span className="text-xl text-green-primary mb-4">
                    {name}
                  </span>
                  <span
                    className={classNames('text-md text-white font-medium')}
                  >
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
                      'flex flex-1 flex-col items-center text-center border-b px-4 desktop:px-12 py-8 outline-none',
                      selected
                        ? 'border-green-primary border-b-2'
                        : 'border-gray-400'
                    )}
                  >
                    <span className="text-xl text-green-primary mb-4">
                      {name}
                    </span>
                    <span
                      className={classNames(
                        'text-md transition',
                        selected
                          ? 'text-white'
                          : 'text-secondary text-opacity-75'
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
            {features.map(({ name, Tab: FeatureTab }) => (
              <Tab.Panel key={name}>
                <FeatureTab />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}

function MarketplaceDynamics({ className }: { className?: string }) {
  return (
    <div className={classNames('flex flex-col lg:flex-row', className)}>
      <div className="relative">
        <GridPattern id="tab1" offset={-1} />
        <div className="h-full px-8 py-16 sm:py-8 flex flex-col items-start justify-center border border-white/30 sm:border-b-0 lg:!border-b-[1px]">
          <span className="uppercase mb-4">Programmable</span>
          <h4 className="font-bold text-4xl uppercase mb-4">
            <ForwardSlashSvg className="inline h-6 w-6 -mt-1.5 mr-2" />
            Professionalism
          </h4>
          <p className="text-lg text-secondary leading-normal">
            Trustless engineering labor primitives, a resilient global currency,
            a composable digital economy
          </p>
          <Link
            target="_blank"
            href={`https://polkadot.js.org/apps/?rpc=wss%3A%2F%2F${process.env.NEXT_PUBLIC_ENGI_ENV}.engi.network%3A9944#/explorer`}
          >
            <Button variant="primary" className="mt-8">
              Engi Explorer
            </Button>
          </Link>
        </div>
      </div>
      <div className="shrink-0 flex items-center justify-center basis-3/5 mt-8 sm:mt-0 sm:p-8 sm:border border-white/30 lg:border-l-0">
        <TokenContractSvg className="w-full h-auto" />
      </div>
    </div>
  );
}

function CommunityOwnership({ className }: { className?: string }) {
  return (
    <div className={classNames('flex flex-col lg:flex-row', className)}>
      <div className="relative">
        <GridPattern id="tab2" offset={-1} />
        <div className="h-full px-8 py-16 sm:py-8 flex flex-col items-start justify-center border border-white/30 sm:border-b-0 lg:!border-b-[1px]">
          <span className="uppercase mb-4">Open</span>
          <h4 className="font-bold text-4xl uppercase mb-4">
            <ForwardSlashSvg className="inline h-6 w-6 -mt-1.5 mr-2" />
            {'Source & Governed'}
          </h4>
          <p className="text-lg text-secondary leading-normal">
            Powerful, non-speculative, user-owned DAO devoted to the future of
            technical gig work
          </p>
          <Button className="mt-8" disabled={true}>
            DAO Coming Soon
          </Button>
        </div>
      </div>
      <div className="shrink-0 flex items-center justify-center basis-3/5 mt-8 sm:mt-0 sm:p-8 sm:border border-white/30 lg:border-l-0">
        <Image src={featuresSrc2} alt="source" />
      </div>
    </div>
  );
}

function Tab3({ className }: { className?: string }) {
  return (
    <div className={classNames('flex flex-col lg:flex-row', className)}>
      <div className="relative">
        <GridPattern id="tab3" offset={-1} />
        <div className="h-full px-8 py-16 sm:py-8 flex flex-col items-start justify-center border border-white/30 sm:border-b-0 lg:!border-b-[1px]">
          <span className="uppercase mb-4">
            Whenever
            <br />
            Wherever
          </span>
          <h4 className="font-bold text-4xl uppercase mb-4">
            <ForwardSlashSvg className="inline h-6 w-6 -mt-1.5 mr-2" />
            Whoever
          </h4>
          <p className="text-lg text-secondary leading-normal">
            A fully flexible work schedule - anonymous, limitless opportunity &
            variety, available globally
          </p>

          <Link href="/bounty" className="mt-8">
            <Button variant="primary" className="!px-16">
              Discover Bounties
            </Button>
          </Link>
        </div>
      </div>
      <div className="shrink-0 flex items-center justify-center basis-3/5 mt-8 sm:mt-0 sm:border border-white/30 lg:border-l-0 border children:!h-full">
        <Image src={featuresSrc3} className="object-cover" alt="wherever" />
      </div>
    </div>
  );
}
