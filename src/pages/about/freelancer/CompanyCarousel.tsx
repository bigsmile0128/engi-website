import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import useEmblaCarousel from 'embla-carousel-react';
import CompoundSvg from 'public/img/about/compound.svg';
import EniacSvg from 'public/img/about/eniac.svg';
import ShineSvg from 'public/img/about/shine.svg';
import TribeSvg from 'public/img/about/tribe.svg';
import UpfrontSvg from 'public/img/about/upfront.svg';
import { useCallback, useEffect, useState } from 'react';

type CompanyCarouselProps = {
  className?: string;
};

export default function CompanyCarousel({ className }: CompanyCarouselProps) {
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
      <div
        className={classNames(
          'flex flex-col items-center gap-8 w-full py-16 company-gradient-mobile',
          'tablet:max-w-page tablet:items-start tablet:p-8 tablet:py-10 tablet:company-gradient-tablet',
          className
        )}
      >
        <span className="font-bold text-xl tracking-wide">Write code for</span>
        <div className="embla w-full tablet:hidden" ref={emblaRef}>
          <div className="flex text-green-primary">
            <div className="max-w-page flex-[0_0_100%] flex items-center justify-center gap-8">
              <UpfrontSvg />
              <CompoundSvg />
            </div>
            <div className="max-w-page flex-[0_0_100%] flex items-center justify-center gap-8">
              <TribeSvg />
              <ShineSvg />
            </div>
            <div className="max-w-page flex-[0_0_100%] flex items-center justify-center gap-8">
              <EniacSvg className="max-h-[32px]" />
            </div>
          </div>
        </div>
        <div
          className={classNames(
            'hidden tablet:grid w-full text-white',
            'tablet:grid-cols-3 tablet:grid-rows-2 tablet:gap-16',
            'desktop:grid-cols-5 desktop:grid-rows-1 desktop:items-center desktop:gap-12',
            'xl:gap-16'
          )}
        >
          <UpfrontSvg />
          <CompoundSvg />
          <TribeSvg />
          <ShineSvg />
          <EniacSvg className="max-h-[32px]" />
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
