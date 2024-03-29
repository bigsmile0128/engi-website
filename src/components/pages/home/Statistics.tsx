'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import * as Sentry from '@sentry/react';
import classNames from 'classnames';
import useEmblaCarousel from 'embla-carousel-react';
import { gql } from 'graphql-request';
import { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import EngiAmount from '~/components/EngiAmount';
import GridPattern from '~/components/global/GridPattern/GridPattern';
import useAxios from '~/utils/hooks/useAxios';

type StatisticsProps = {
  className?: string;
};

export default function Statistics({ className }: StatisticsProps) {
  const [, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const { isLoading, data } = useBountyStats();

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
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

  const stats = [
    {
      name: 'Active Bounties',
      value: data?.activeJobCount ?? 0,
    },
    {
      name: 'Amount Funded',
      value: (
        <EngiAmount
          value={data?.totalAmountFunded ?? 0}
          iconClassName="h-8 w-8 -mt-2 mr-1"
          valueClassName="text-5xl"
        />
      ),
    },
    {
      name: '# of Technologies',
      value: data?.technologyCount ?? 0,
    },
  ];

  return (
    <div
      className={classNames(
        'relative sm:max-w-page sm:border border-white/20',
        className
      )}
    >
      <GridPattern
        id="stats"
        className="hidden sm:block top-0 left-0"
        sizeY={40}
        sizeX={61}
        offset={-1}
      />
      <GridPattern
        id="stats-mobile"
        className="sm:hidden top-0 left-0"
        offset={-1}
      />
      <div
        className={classNames(
          'hidden sm:flex items-center justify-between',
          'px-8 pt-16 pb-14 lg:px-24 xl:px-40'
        )}
      >
        {stats.map(({ name, value }) => (
          <div
            key={name}
            className={classNames(
              'flex flex-col items-center gap-y-1',
              isLoading ? 'children:skeleton' : ''
            )}
          >
            <span className="font-grifter text-4xl md:text-5xl">{value}</span>
            <span className="text-lg">{name}</span>
          </div>
        ))}
      </div>
      <div className="sm:hidden relative border-y border-white/20">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex py-16">
            {stats.map(({ name, value }) => (
              <div
                key={name}
                className={classNames(
                  'flex flex-col items-center flex-[0_0_100%] gap-y-3',
                  isLoading ? 'children:skeleton' : ''
                )}
              >
                <span className="font-grifter mt-1 text-5xl">{value}</span>
                <span className="text-lg mt-3">{name}</span>
              </div>
            ))}
          </div>
        </div>
        <button
          className={classNames(
            'absolute h-8 w-8 top-1/2 -translate-y-1/2 left-2',
            !canScrollPrev() ? 'text-white/20' : ''
          )}
          onClick={scrollPrev}
          disabled={!canScrollPrev()}
        >
          <ChevronLeftIcon />
        </button>
        <button
          className={classNames(
            'absolute h-8 w-8 top-1/2 -translate-y-1/2 right-2',
            !canScrollNext() ? 'text-white/20' : ''
          )}
          onClick={scrollNext}
          disabled={!canScrollNext()}
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}

function useBountyStats() {
  const axios = useAxios();
  return useQuery<any, any>(
    ['bountyStats'],
    async () => {
      const response = await axios.post('/api/graphql', {
        query: gql`
          query BountyStats {
            jobAggregates {
              activeJobCount
              totalAmountFunded
              technologyCount
            }
          }
        `,
      });

      const data = response.data ?? {};

      if (data.errors?.length > 0) {
        throw new Error(
          data?.errors?.[0]?.message ?? 'Unable to fetch bounty stats.'
        );
      }

      return response.data.data.jobAggregates;
    },
    {
      onError: (error) => {
        Sentry.captureException(error);
      },
    }
  );
}
