import React from 'react';
import classNames from 'classnames';
import EngiIcon from '~/components/global/icons/EngiIcon';
import { SiPython, SiReact, SiRust } from 'react-icons/si';

type TopDevelopersProps = {
  className?: string;
};

export default function TopDevelopers({ className }: TopDevelopersProps) {
  return (
    <div className={classNames('', className)}>
      <p className="font-grifter text-4xl tablet:text-5xl leading-normal text-center">
        Top Developers
      </p>
      <p className="mt-8 xl:mt-12 text-secondary text-lg tablet:text-xl text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <svg
        className="hidden absolute"
        width="0"
        height="0"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
      <div className="mt-8 tablet:mt-12 relative w-full flex items-center justify-center">
        {/* LEFT */}
        <div
          className={classNames(
            'absolute -translate-x-[95%] flex items-center justify-center opacity-60',
            'h-32 w-32',
            'tablet:h-44 tablet:w-44',
            'desktop:h-56 desktop:w-56',
            'xl:h-64 xl:w-64'
          )}
        >
          <div
            className={classNames(
              'h-32 w-32 before:w-32',
              'tablet:h-44 tablet:w-44 tablet:before:w-44',
              'desktop:h-56 desktop:w-56 desktop:before:w-56',
              'xl:h-64 xl:w-64 xl:before:w-64',
              'hex hex-bg-secondary absolute before:absolute before:translate-y-center'
            )}
            style={{
              filter: 'url(#goo)',
            }}
          />
          <EngiIcon className="z-10 h-[40%] w-[40%] -translate-x-[5%] text-white" />
        </div>
        {/* CENTER */}
        <div
          className={classNames(
            'z-10 mx-auto relative flex items-center justify-center',
            'h-44 w-44',
            'tablet:h-64 tablet:w-64',
            'desktop:h-80 desktop:w-80',
            'xl:h-88 xl:w-88'
          )}
        >
          <div
            className={classNames(
              'h-44 w-44 before:w-44',
              'tablet:h-64 tablet:w-64 tablet:before:w-64',
              'desktop:h-80 desktop:w-80 desktop:before:w-80',
              'xl:h-88 xl:w-88 xl:before:w-88',
              'hex hex-bg-primary absolute before:absolute before:translate-y-center'
            )}
            style={{
              filter: 'url(#goo)',
            }}
          />
          <EngiIcon className="z-10 h-[40%] w-[40%] -translate-x-[5%] text-black" />
        </div>
        {/* RIGHT */}
        <div
          className={classNames(
            'absolute translate-x-[95%] flex items-center justify-center opacity-60',
            'h-32 w-32',
            'tablet:h-44 tablet:w-44',
            'desktop:h-56 desktop:w-56',
            'xl:h-64 xl:w-64'
          )}
        >
          <div
            className={classNames(
              'h-32 w-32 before:w-32',
              'tablet:h-44 tablet:w-44 tablet:before:w-44',
              'desktop:h-56 desktop:w-56 desktop:before:w-56',
              'xl:h-64 xl:w-64 xl:before:w-64',
              'hex hex-bg-secondary absolute before:absolute before:translate-y-center'
            )}
            style={{
              filter: 'url(#goo)',
            }}
          />
          <EngiIcon className="z-10 h-[40%] w-[40%] -translate-x-[5%] text-white" />
        </div>
      </div>
      <div
        className={classNames(
          'mt-2 w-full bg-dropdown backdrop-blur-[20px] p-6 flex flex-col',
          'relative tablet:w-80 tablet:mx-auto tablet:-mt-12 z-40'
        )}
        style={{
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.25)',
        }}
      >
        <div className="w-full flex items-center justify-between tablet:flex-col-reverse gap-2">
          <span className="font-bold text-2xl">George</span>
          <div className="flex items-center">
            <div className="h-9 w-9 border border-white/60 bg-secondary grid place-items-center rounded-full">
              <SiRust className="h-4 w-4 text-green-primary" />
            </div>
            <div className="h-9 w-9 border border-white/60 bg-secondary grid place-items-center rounded-full -ml-1">
              <SiPython className="h-4 w-4 text-green-primary" />
            </div>
            <div className="h-9 w-9 border border-white/60 bg-secondary grid place-items-center rounded-full -ml-1">
              <SiReact className="h-4 w-4 text-green-primary" />
            </div>
          </div>
        </div>
        <div className="mt-8 flex items-center gap-16b tablet:justify-between">
          <span className="font-bold">32 jobs</span>
          <span className="flex items-center">
            <EngiIcon className="h-4 w-4 text-green-primary" />
            <span className="ml-2">32 total earned</span>
          </span>
        </div>
      </div>
    </div>
  );
}
