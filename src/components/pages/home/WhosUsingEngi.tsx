import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import BlockQuote from './BlockQuote';
import Avvvatars from 'avvvatars-react';
import { AiOutlineLink } from '@react-icons/all-files/ai/AiOutlineLink';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import useBreakpoint from '~/utils/hooks/useBreakpoint';

type WhosUsingEngiProps = {
  className?: string;
};

const testimonials = [
  {
    name: 'bobbyjones3',
    subtitle: 'Rust Job',
    text: "There's no better way to find new jobs and get paid quickly.",
  },
  {
    name: 'squirtle',
    subtitle: 'Python Job',
    text: "It's easy to set up with my secure wallet and quick to get started.",
  },
  {
    name: 'the_chemist',
    subtitle: 'React Job',
    text: 'I get to work with exactly the specs I need for a good design.',
  },
  {
    name: 'kimhajin',
    subtitle: 'Rust Job',
    text: 'The tests tell me all I need to know for writing the code.',
  },
  {
    name: 'lunchbot',
    subtitle: 'Python Job',
    text: "I didn't even need to communicate with the job poster and got paid!",
  },
  {
    name: 'cassy_jones',
    subtitle: 'React Job',
    text: 'I wrote code and get paid all in less than a couple hours.',
  },
];

export default function WhosUsingEngi({ className }: WhosUsingEngiProps) {
  return (
    <div className={classNames('', className)}>
      <BlockQuote
        className=""
        value="We built engi using engi"
        title="Who's using engi?"
        subtitle="The Engi protocol itself uses the network to build real software."
      />
      <Testimonials className="mt-24" />
    </div>
  );
}

function Testimonials({ className }: { className?: string }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 0,
  });
  const { md, xl } = useBreakpoint();

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

  // since multiple slides are shown at once on larger displays, disable scrolling earlier to hide empty space
  let numPages = testimonials.length;
  if (xl) {
    numPages -= 3;
  } else if (md) {
    numPages -= 2;
  }
  const hasNextPage = selectedIndex < numPages;

  return (
    <div
      className={classNames('relative overflow-hidden', className)}
      ref={emblaRef}
    >
      <div className="flex">
        {testimonials.map(({ name, subtitle, text }) => (
          <div
            key={name}
            className={classNames(
              'flex flex-col',
              'flex-[0_0_100%] md:flex-[0_0_50%] xl:flex-[0_0_33%]',
              'px-0 sm:px-16'
            )}
          >
            <p className="text-lg max-w-20">{text}</p>
            <User className="mt-12" name={name} subtitle={subtitle} />
          </div>
        ))}
      </div>
      <div className="hidden sm:block">
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
            !hasNextPage ? 'text-white/20' : ''
          )}
          onClick={scrollNext}
          disabled={!hasNextPage}
        >
          <ChevronRightIcon />
        </button>
      </div>
      <div className="sm:hidden flex items-center justify-center gap-x-8 mt-8">
        <button
          className={classNames(
            'h-12 w-12 p-3 bg-black/20',
            !canScrollPrev() ? 'text-white' : 'text-green-primary'
          )}
          onClick={scrollPrev}
          disabled={!canScrollPrev()}
        >
          <ChevronLeftIcon />
        </button>
        <button
          className={classNames(
            'h-12 w-12 p-3 bg-black/20',
            !canScrollNext() ? 'text-white' : 'text-green-primary'
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

type UserProps = {
  className?: string;
  name: string;
  subtitle: string;
};

function User({ className, name, subtitle }: UserProps) {
  return (
    <div className={classNames('flex items-center gap-x-4', className)}>
      <Avvvatars size={48} value={name} style="shape" />
      <div className="flex flex-col items-start">
        <span className="font-bold text-green-primary">{name}</span>
        <span className="flex items-center gap-x-2">
          <AiOutlineLink className="inline text-green-primary" />
          <span className="text-secondary">{subtitle}</span>
        </span>
      </div>
    </div>
  );
}
