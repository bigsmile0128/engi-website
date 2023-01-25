import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';

import aboutImg from 'public/img/press/about1.png';
import deskImg from 'public/img/press/desk.jpg';
import GlobeSvg from 'public/img/about/globe.svg';
import UpfrontSvg from 'public/img/about/upfront.svg';
import CompoundSvg from 'public/img/about/compound.svg';
import TribeSvg from 'public/img/about/tribe.svg';
import ShineSvg from 'public/img/about/shine.svg';
import EniacSvg from 'public/img/about/eniac.svg';
import BlockQuote from '~/components/pages/home/BlockQuote';
import GridPattern from '~/components/global/GridPattern/GridPattern';
import TeamMember from '~/components/pages/about/TeamMember';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import BulbIcon from '~/components/global/icons/bulb.svg';
import RocketIcon from '~/components/global/icons/rocket.svg';

import { members } from './About.utils';

interface AboutUsPageProps {
  className?: string;
}

function AboutUsPageContainer({ className }: AboutUsPageProps) {
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
    <div
      className={classNames('flex flex-col mt-16 sm:mt-32 mb-32', className)}
    >
      <div className="max-w-page mb-24 md:!max-w-2xl">
        <h1 className="font-grifter text-3xl sm:text-5xl text-center !leading-tight">
          Accelerating the <span className="text-green-primary">future</span> of
          software engineering
        </h1>
        <p className="mt-8 text-gray-300 text-center">
          We are a marketplace for custom software. Engineers come for
          flexibility, accessibility, and growth. Work whenever, wherever, and
          however on the bits that you want. Businesses come for new access to
          programmers across the world.{' '}
        </p>
      </div>
      <div className="max-w-page mb-32">
        <div className="md:grid grid-cols-2 grid-flow-row-dense gap-24 items-center mx-6 md:mx-0 mb-24">
          <div className="mb-12 md:mb-0">
            <h2 className="font-grifter text-3xl sm:text-5xl mb-4">
              Our Mission
            </h2>
            <p className="text-gray-300">
              To unlock human innovation and end global poverty through
              always-available and accessible engineering work and to accelerate
              the future of accessible, flexible and equitable software
              engineering work for coders everywhere.
            </p>
          </div>
          <Image
            className="px-8 laptop:px-0"
            src={aboutImg}
            alt="figma plugins"
          />
        </div>
        <div className="md:grid grid-cols-2 grid-flow-row-dense gap-24 items-center mx-6 md:mx-0">
          <div className="mb-12 md:mb-0 col-start-2">
            <h2 className="font-grifter text-3xl sm:text-5xl mb-4">
              Who we are
            </h2>
            <p className="text-gray-300">
              Engi deletes applications, interviews, bosses, time zones,
              borders, language barriers, and “culture fit” from professional
              software engineering engagements. We empower freelance coders by
              building an accessible and flexible labor economy that minimally
              obstructs participation and growth.
            </p>
          </div>
          <Image
            className="px-8 laptop:px-0"
            src={deskImg}
            alt="ipad website"
          />
        </div>
      </div>
      <div className="relative">
        <GridPattern id="values" className="hidden sm:block" offset={-1} />
        <div className="flex flex-col items-center sm:py-16 border-y-0 sm:border-y-1 border-white/30">
          <h2 className="text-3xl sm:text-5xl font-grifter mb-16">Values</h2>
          <div className="flex flex-col sm:flex-row items-center gap-x-12 gap-y-24">
            <div className="flex flex-col items-center gap-y-8">
              <div className="border border-gray-500 h-20 w-20 flex items-center justify-center bg-gray-800/60 z-10">
                <BulbIcon className="w-7" />
              </div>
              <h3 className="font-bold text-lg text-green-primary">
                Empowering
              </h3>
              <p className="w-60 sm:w-40 md:w-48 lg:w-72 text-center text-lg">
                Learn To Love Growth And Change And You Will Be A Success
              </p>
            </div>
            <div className="flex flex-col items-center gap-y-8">
              <div className="border border-gray-500 h-20 w-20 flex items-center justify-center bg-gray-800/60 z-10">
                <RocketIcon className="w-7" />
              </div>
              <h3 className="font-bold text-lg text-green-primary">
                Accelerating
              </h3>
              <p className="w-60 sm:w-40 md:w-48 lg:w-72 text-center text-lg">
                Learn To Love Growth And Change And You Will Be A Success
              </p>
            </div>
            <div className="flex flex-col items-center gap-y-8">
              <div className="border border-gray-500 h-20 w-20 flex items-center justify-center bg-gray-800/60 z-10">
                <BulbIcon className="w-7" />
              </div>
              <h3 className="font-bold text-lg text-green-primary">
                Disrupting
              </h3>
              <p className="w-60 sm:w-40 md:w-48 lg:w-72 text-center text-lg">
                Learn To Love Growth And Change And You Will Be A Success
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-page mt-32">
        <BlockQuote
          value={
            <span>
              Engi is a gig economy for coders built on the blockchain. No need
              to apply. Write code,{' '}
              <span className="text-green-primary">get paid instantly</span>.
            </span>
          }
        />
      </div>
      <div className="max-w-page mt-32 flex flex-col items-center w-full">
        <div className="text-center">
          <h2 className="font-grifter text-3xl sm:text-5xl">Meet the Team!</h2>
          <p className="text-lg text-gray-300 mt-4">
            Shattering borders, time zones, and language barriers.
          </p>
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
      <div className="max-w-page mt-32 flex flex-col xl:flex-row gap-x-8">
        <div className="text-center xl:text-left xl:basis-1/2">
          <h2 className="font-grifter text-3xl sm:text-5xl">Our Investors</h2>
          <p className="mt-4 text-gray-300">
            Our investors are some of the top leaders of their industries.
          </p>
        </div>
        <div className="flex flex-col mt-8 xl:mt-0">
          <div
            className={classNames(
              'flex flex-col sm:flex-row flex-wrap justify-center items-center gap-12',
              'mt-8 xl:mt-0',
              'xl:basis-1/2'
            )}
          >
            <UpfrontSvg className="h-8" />
            <CompoundSvg className="h-8" />
            <TribeSvg className="h-8" />
            <ShineSvg className="h-8" />
            <EniacSvg className="h-8" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPageContainer;
