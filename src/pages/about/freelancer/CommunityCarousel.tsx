import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import groupMobileImg from 'public/img/about/freelancer/community.png';
import { useCallback, useEffect, useState } from 'react';

type CommunityCarouselProps = {
  className?: string;
};

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
            <div className="flex-[0_0_100%]">
              <div className="max-w-page">
                <div className="bg-[#161B28]/30">
                  <Image
                    src={groupMobileImg}
                    className="w-full"
                    alt="accessible"
                  />
                  <div className="p-6 w-full border border-white/60 border-t-0">
                    <p className="font-medium text-xl text-white">
                      &ldquo;Lorem ipsum dolor sit amet, consectetur adipiscing
                      elit. Vivamus in elit vel mauris tincidunt porta.&rdquo;
                    </p>
                    <p className="mt-8 font-bold text-xl text-green-primary">
                      John Doe
                    </p>
                    <p className="mt-2 text-secondary">
                      Principal Solutions Architect
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-[0_0_100%]">
              <div className="max-w-page">
                <div className="bg-[#161B28]/30">
                  <Image
                    src={groupMobileImg}
                    className="w-full"
                    alt="accessible"
                  />
                  <div className="p-6 w-full border border-white/60 border-t-0">
                    <p className="font-medium text-xl text-white">
                      &ldquo;Lorem ipsum dolor sit amet, consectetur adipiscing
                      elit. Vivamus in elit vel mauris tincidunt porta.&rdquo;
                    </p>
                    <p className="mt-8 font-bold text-xl text-green-primary">
                      John Doe
                    </p>
                    <p className="mt-2 text-secondary">
                      Principal Solutions Architect
                    </p>
                  </div>
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
