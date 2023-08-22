'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import TeamMember from '~/components/pages/about/TeamMember';
import Content from '~/content/about.json';
import globeLeftImg from 'public/img/about/members/globe-left.png';
import globeRightImg from 'public/img/about/members/globe-right.png';
import globeMobileImg from 'public/img/about/members/globe-mobile.png';

import { members } from './About.utils';
import Image from 'next/image';

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
        <p className="text-lg text-secondary mt-8">{Content.TEAM.BODY}</p>
      </div>
      <div className="w-full relative mt-16 sm:hidden">
        <div className="embla" ref={emblaRef}>
          <div className="flex gap-8">
            {members.map((member, index) => (
              <TeamMember key={member.name + index} {...member} width={300} />
            ))}
            <div className="min-w-[300px] h-[450px] bg-secondary/40 border border-white/30 flex flex-col gap-4 text-center py-8 px-4">
              <span className="font-grifter text-4xl">
                All our other{' '}
                <span className="text-green-primary">developers</span>
              </span>
              <span className="text-lg">
                Developers across the globe all collaborate and contribute to
                engi together.
              </span>
              <Image src={globeMobileImg} className="mt-4" alt="global" />
            </div>
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
          'xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
          'gap-4 xl:gap-8'
        )}
      >
        {members.map((member, index) => (
          <TeamMember key={member.name + index} {...member} />
        ))}
      </div>
      <div className="hidden xs:flex mt-8 relative w-full py-16 bg-secondary/40 flex-col items-center justify-center text-center border border-white/30">
        <Image
          src={globeLeftImg}
          className="absolute h-full w-auto object-cover left-0 opacity-60"
          alt="global"
        />
        <span className="font-grifter text-5xl">
          All of our other{' '}
          <span className="text-green-primary">developers</span>
        </span>
        <span className="text-xl text-secondary max-w-lg">
          Developers across the globe all collaborate and contribute to engi
          together.
        </span>
        <Image
          src={globeRightImg}
          className="absolute h-full w-auto object-cover right-0 opacity-60 hidden lg:block"
          alt="global"
        />
      </div>
    </div>
  );
}
