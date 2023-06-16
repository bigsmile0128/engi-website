'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import groupMobileImg from 'public/img/about/freelancer/community-tablet.png';
import { useCallback, useEffect, useState } from 'react';

type CommunityCarouselProps = {
  className?: string;
};

const testimonials = [
  {
    name: 'Jeff Wo',
    subtitle: 'Full-Stack UI Engineer',
    quote: 'Earning a living implementing designs has never felt so simple',
  },
  {
    name: 'Jin Urso',
    subtitle: 'Smart Contract Developer',
    quote: 'Getting paid to learn Solidity building real-world projects',
  },
];

export default function CommunityCarousel({
  className,
}: CommunityCarouselProps) {
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
        <div className="embla w-full" ref={emblaRef}>
          <div className="flex">
            {testimonials.map(({ name, subtitle, quote }) => (
              <div key={name} className="flex-[0_0_100%]">
                <div className="max-w-page">
                  <div className="bg-[#161B28]/30 desktop:flex">
                    <Image
                      src={groupMobileImg}
                      className="w-full"
                      alt="accessible"
                    />
                    <div className="p-6 w-full border border-white/30 border-t-0 desktop:border-l-0 desktop:border-t">
                      <p className="font-medium text-xl text-white">{quote}</p>
                      <p className="mt-8 font-bold text-xl text-green-primary">
                        {name}
                      </p>
                      <p className="mt-2 text-secondary">{subtitle}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 flex items-center justify-center gap-8">
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
