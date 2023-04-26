import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import useEmblaCarousel from 'embla-carousel-react';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import EngiAmount from '~/components/EngiAmount';
import GridPattern from '~/components/global/GridPattern/GridPattern';
import { Bit, BitStatus } from '~/types';
import useBits from '~/utils/hooks/useBits';

type StatisticsProps = {
  className?: string;
  showGrid?: boolean;
};

export default function Statistics({ className }: StatisticsProps) {
  const [, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const { isLoading: isLoadingBits, data: bits } = useBits({
    skip: 0,
    limit: 100,
  });
  const { isLoading: isLoadingBitsCompleted, data: bitsCompleted } = useBits({
    skip: 0,
    limit: 1,
    status: BitStatus.COMPLETE,
  });
  const { isLoading: isLoadingBitsActive, data: bitsActive } = useBits({
    skip: 0,
    limit: 1,
    status: BitStatus.ACTIVE,
  });

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

  // re-render on page index update to disable pagination buttons
  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  let funding: number;
  try {
    funding = bits?.result?.items?.reduce(
      (acc, bit: Bit) => acc + parseFloat(bit.funding),
      0
    );
  } catch (error) {
    console.warn(error);
    funding = 0;
  }

  const stats = [
    {
      name: 'Amount Funded',
      value: (
        <EngiAmount
          value={funding}
          iconClassName="h-8 w-8 -mt-2 mr-1"
          valueClassName="text-5xl"
        />
      ),
    },
    {
      name: 'Bits Solved',
      value: bitsCompleted?.result?.totalCount ?? 0,
    },
    {
      name: '# of Technologies',
      value: _.uniq(
        _.flatMap(bits?.result?.items ?? [], (bit: Bit) => bit.technologies)
      ).length,
    },
  ];

  return (
    <div className={classNames('', className)}>
      <p className="font-grifter text-2xl tablet:text-5xl">Active bits</p>
      <span
        className={classNames(
          'inline-block mt-1 font-grifter text-4xl tablet:text-6xl tablet:mt-4 min-w-[40px]',
          isLoadingBitsActive ? 'skeleton' : 'text-green-primary'
        )}
      >
        {(bitsActive?.jobs?.result.totalCount ?? 0).toString().toLocaleString()}
      </span>
      <div className="mt-12 relative desktop:hidden">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {stats.map(({ name, value }) => (
              <div
                key={name}
                className={classNames(
                  'flex flex-col items-center flex-[0_0_100%] gap-y-3',
                  isLoadingBits || isLoadingBitsCompleted
                    ? 'children:skeleton'
                    : ''
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
      <div className="hidden mt-24 w-full relative desktop:block">
        <GridPattern id="freelancer-stats" offset={-1} sizeY={40} sizeX={61} />
        <div className="flex gap-8 justify-between px-24 py-12 border border-white/20">
          {stats.map(({ name, value }) => (
            <div key={name} className="flex flex-col items-center gap-4">
              <span className="font-grifter text-5xl">{value}</span>
              <span className="text-lg">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
