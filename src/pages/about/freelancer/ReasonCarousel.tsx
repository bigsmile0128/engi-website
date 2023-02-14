import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import groupMobileImg from 'public/img/home/group-mobile.png';
import { useCallback, useEffect, useState } from 'react';

type ReasonCarouselProps = {
  className?: string;
};

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
        <div className="embla w-full" ref={emblaRef}>
          <div className="flex">
            <div className="flex-[0_0_100%]">
              <div className="max-w-page">
                <div className="bg-[#161B28]/30 p-6 border border-white/60">
                  <Image
                    src={groupMobileImg}
                    className="pr-2"
                    alt="accessible"
                  />
                  <p className="mt-4 font-bold text-xl text-green-primary">
                    Accessible
                  </p>
                  <p className="mt-4 font-medium text-xl">
                    Anyone can begin working on bits regardless of their time
                    zone or language.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-[0_0_100%]">
              <div className="max-w-page">
                <div className="bg-[#161B28]/30 p-6 border border-white/60">
                  <Image
                    src={groupMobileImg}
                    className="pr-2"
                    alt="accessible"
                  />
                  <p className="mt-4 font-bold text-xl text-green-primary">
                    Accessible
                  </p>
                  <p className="mt-4 font-medium text-xl">
                    Anyone can begin working on bits regardless of their time
                    zone or language.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-[0_0_100%]">
              <div className="max-w-page">
                <div className="bg-[#161B28]/30 p-6 border border-white/60">
                  <Image
                    src={groupMobileImg}
                    className="pr-2"
                    alt="accessible"
                  />
                  <p className="mt-4 font-bold text-xl text-green-primary">
                    Accessible
                  </p>
                  <p className="mt-4 font-medium text-xl">
                    Anyone can begin working on bits regardless of their time
                    zone or language.
                  </p>
                </div>
              </div>
            </div>
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
