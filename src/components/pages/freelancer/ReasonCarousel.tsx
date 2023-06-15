'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import groupMobileImg from 'public/img/home/group-mobile.png';
import cornerEngiImg from 'public/img/about/freelancer/corner-engi.png';
import cornerSpyImg from 'public/img/about/freelancer/corner-spy.png';
import cornerGlobeImg from 'public/img/about/freelancer/corner-earth.png';
import cornerRocketImg from 'public/img/about/freelancer/corner-rocket.png';
import groupTabletImg from 'public/img/about/freelancer/group-tablet.png';
import { useCallback, useEffect, useState } from 'react';

type ReasonCarouselProps = {
  className?: string;
};

const reasons = [
  {
    className: 'row-start-1 col-start-1 row-span-2 h-full',
    img: (
      <>
        <Image
          src={groupMobileImg}
          className="p-6 pb-0 tablet:hidden"
          alt="Flexible"
        />
        <Image
          src={groupTabletImg}
          className="p-6 hidden tablet:block mx-auto mb-6 w-full"
          alt="Flexible"
        />
      </>
    ),
    title: 'Flexible',
    description:
      'Work anywhere, anytime. Engi is a platform for ultimate freedom for technical professionals',
  },
  {
    className: 'row-start-1 col-start-2',
    img: (
      <Image
        src={cornerEngiImg}
        className="ml-auto opacity-10 -mb-12"
        alt="Accessible"
      />
    ),
    title: 'Accessible',
    description:
      'No matter who you are or what your background is, you have a shot. Quality work is simply all that matters',
  },
  {
    className: 'row-start-2 col-start-2',
    img: (
      <Image
        src={cornerSpyImg}
        className="ml-auto opacity-10 -mb-12"
        alt="Anonymous"
      />
    ),
    title: 'Anonymous',
    description: 'Maintain your privacy and participate just with your skills',
  },
  {
    className: 'row-start-3 col-start-1 xl:row-start-1 xl:col-start-3',
    img: (
      <Image
        src={cornerGlobeImg}
        className="ml-auto opacity-10 -mb-12"
        alt="Global Community"
      />
    ),
    title: 'Global Community',
    description:
      'Join thousands of other builders reimagining the future of work',
  },
  {
    className: 'row-start-3 col-start-2 xl:row-start-2 xl:col-start-3',
    img: (
      <Image
        src={cornerRocketImg}
        className="ml-auto opacity-10 -mb-12"
        alt="Skills Based"
      />
    ),
    title: 'Competitive',
    description:
      'Excellence and speed are truth, bring your best, challenge yourself, and reap endless rewards',
  },
];

export default function ReasonCarousel({ className }: ReasonCarouselProps) {
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
                    {img}
                    <div className="p-6 pt-0 w-full">
                      <p className="mt-4 font-bold text-xl text-green-primary">
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
            'hidden tablet:grid max-w-page',
            'tablet:grid-cols-2 tablet:grid-rows-3 tablet:gap-8',
            'xl:grid-cols-3 xl:grid-rows-2'
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
                <p className="mt-4 font-bold text-xl text-green-primary">
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
