'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import sourcingImg from 'public/img/about/business/sourcing.png';
import globalImg from 'public/img/about/business/global.png';
import targetImg from 'public/img/about/business/target.png';
import { useCallback, useEffect, useState } from 'react';
import ChevronRight from '~/components/ChevronRight';

type ProjectsCarouselProps = {
  className?: string;
};

const reasons = [
  {
    className:
      'row-start-1 col-start-1 col-span-2 h-full tablet:flex-row tablet:flex-row-reverse',
    img: (
      <div className="flex justify-center tablet:justify-start shrink-0 tablet:p-6">
        <Image src={sourcingImg} className="" alt="Sourcing" />
      </div>
    ),
    title: 'Hireless',
    description:
      'Save copious amounts of time and money by allowing developers to start working immediately while always only paying for the very best results',
  },
  {
    className: 'row-start-2 col-start-1',
    img: (
      <div className="flex justify-center tablet:justify-start tablet:p-6 tablet:pb-0">
        <Image src={globalImg} className="w-[150px]" alt="Global" />
      </div>
    ),
    title: 'Global, 24/7',
    description:
      'No timezones or borders means product is always moving foward at lightning speed',
  },
  {
    className: 'row-start-2 col-start-2',
    img: (
      <div className="flex justify-center tablet:justify-start tablet:p-6 tablet:pb-0">
        <Image src={targetImg} className="w-[150px]" alt="Target" />
      </div>
    ),
    title: 'Bring Your Stack',
    description:
      'Engi works for any automated quality assurance process. Watch your project improve faster than ever',
  },
];

export default function ProjectsCarousel({ className }: ProjectsCarouselProps) {
  const [, setSelectedIndex] = useState(0);
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

  // set selected index to trigger re-render to update disabled button state
  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  return (
    <>
      <div className={classNames('w-full', className)}>
        <div className="embla w-full tablet:hidden" ref={emblaRef}>
          <div className="flex">
            {reasons.map(({ img, title, description }) => (
              <div className="flex-[0_0_100%]" key={title}>
                <div className="max-w-page flex flex-col">
                  <div className="bg-[#161B28]/30 border border-white/60">
                    <div
                      className="test2"
                      style={{
                        background:
                          'linear-gradient(136.6deg, rgba(255, 255, 255, 0.1) 9.78%, rgba(255, 255, 255, 0) 39.39%);',
                      }}
                    >
                      {img}
                    </div>
                    <div className="p-6 pt-0 w-full">
                      <p className="flex items-center mt-8 font-bold text-xl text-green-primary">
                        <ChevronRight className="h-4 w-4 mr-1" />
                        {title}
                      </p>
                      <p className="mt-4 font-medium text-xl">{description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className={classNames(
            'hidden tablet:grid max-w-page auto-rows-min gap-8'
          )}
        >
          {reasons.map(({ className, img, title, description }) => (
            <div
              key={title}
              className={classNames(
                'max-w-page flex flex-col bg-[#161B28]/30 border border-white/60',
                className
              )}
            >
              {img}
              <div className="p-6 pt-0 w-full">
                <p className="flex items-center mt-8 font-bold text-xl text-green-primary">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  {title}
                </p>
                <p className="mt-4 font-medium text-xl">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 flex items-center justify-center gap-8 tablet:hidden">
        <button
          className={classNames(
            'p-3 bg-black/[.14] hover:bg-black/25',
            'focus-green-primary text-green-primary',
            'disabled:text-tertiary disabled:pointer-events-none'
          )}
          onClick={() => scrollPrev()}
          disabled={!canScrollPrev()}
        >
          <ChevronLeftIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        <button
          className={classNames(
            'p-3 bg-black/[.14] hover:bg-black/25',
            'focus-green-primary text-green-primary',
            'disabled:text-tertiary disabled:pointer-events-none'
          )}
          onClick={() => scrollNext()}
          disabled={!canScrollNext()}
        >
          <ChevronRightIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </>
  );
}
