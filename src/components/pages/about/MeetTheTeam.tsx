import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import useEmblaCarousel from 'embla-carousel-react';
import GlobeSvg from 'public/img/about/globe.svg';
import TeamMember from '~/components/pages/about/TeamMember';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import Content from '~/content/about.json';

import { members } from './About.utils';

type MeetTheTeamProps = {
  className?: string;
};

export default function MeetTheTeam({ className }: MeetTheTeamProps) {
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

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);
  return (
    <div className={classNames('flex flex-col items-center', className)}>
      <div className="text-center">
        <h2 className="font-grifter text-4xl sm:text-5xl">
          {Content.TEAM.TITLE}
        </h2>
        <p className="text-lg text-secondary mt-4">{Content.TEAM.BODY}</p>
      </div>
      <GlobeSvg className="w-full mt-16 sm:mt-12 scale-125 sm:scale-100" />
      <div className="w-full relative mt-16 sm:hidden">
        <div className="embla" ref={emblaRef}>
          <div className="flex gap-8">
            {members.map((member, index) => (
              <TeamMember key={member.name + index} {...member} />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center mt-8 gap-x-16">
          <button
            className={classNames(
              'h-8 w-8',
              !canScrollPrev() ? 'text-white/20' : ''
            )}
            onClick={scrollPrev}
            disabled={!canScrollPrev()}
          >
            <ChevronLeftIcon />
          </button>
          <button
            className={classNames(
              'h-8 w-8',
              !canScrollNext() ? 'text-white/20' : ''
            )}
            onClick={scrollNext}
            disabled={!canScrollNext()}
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>
      <div
        className={classNames(
          'hidden sm:grid',
          'mt-16 sm:mt-12 xl:mt-24',
          'xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
          'gap-4 xl:gap-8'
        )}
      >
        {members.map((member, index) => (
          <TeamMember key={member.name + index} {...member} />
        ))}
      </div>
    </div>
  );
}
