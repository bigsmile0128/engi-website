import React from 'react';
import classNames from 'classnames';

import Tag from '../../components/Tag';
import EmailRegistration from './EmailRegistration';

interface HeroProps {
  className?: string;
}

export default function Hero({ className }: HeroProps) {
  return (
    <div
      className={classNames(
        'flex flex-col items-center sm:items-start',
        className
      )}
    >
      <div className="md:flex items-center sm:justify-between gap-x-12">
        <h2 className="flex items-start justify-center sm:justify-start">
          <svg
            className="scale-[.35] sm:scale-[.55] -mt-3.5 sm:-mt-3 -ml-1"
            width="37"
            height="58"
            viewBox="0 0 37 58"
            fill="none"
          >
            <path
              d="M14.479 29L36.0811 50.7513L28.8821 58L0.0810547 29L28.8821 0L36.076 7.24872L14.479 29Z"
              fill="#F27B50"
            />
          </svg>
          <span className="flex flex-col items-start gap-y-2 font-grifter text-3xl font-extrabold text-white sm:text-5xl whitespace-nowrap">
            <span>The gig economy</span>
            <span>for programmers</span>
          </span>
          <div className="flex flex-col items-center -ml-1.5 sm:-mt-1 sm:-ml-0.5">
            <svg
              className="scale-[.35] sm:scale-[.55] -my-7 sm:-my-5"
              width="42"
              height="86"
              viewBox="0 0 42 86"
              fill="none"
            >
              <path
                d="M10.1327 86H0.0810547L31.0294 0H41.0811L10.1327 86Z"
                fill="#F27B50"
              />
            </svg>
            <svg
              className="scale-[.35] sm:scale-[.55] md:mt-1"
              width="37"
              height="58"
              viewBox="0 0 37 58"
              fill="none"
            >
              <path
                d="M21.6831 29L0.0810547 50.7513L7.28004 58L36.0811 29L7.28004 0L0.0861473 7.24872L21.6831 29Z"
                fill="#F27B50"
              />
            </svg>
          </div>
        </h2>
        <p className="leading-6 text-gray-300 mt-12 md:-mt-3">
          Browse jobs, write code, and get paid instantly no matter where you
          are in the world
        </p>
      </div>
      <div className="md:flex mt-12 md:mt-24 gap-x-12 items-start">
        <EmailRegistration className="flex-1 mt-8 md:mt-0" />
        <div className="flex-1 mt-24 md:mt-0">
          <h2 className="font-grifter text-3xl">Languages</h2>
          <div className="flex flex-wrap gap-x-2 gap-y-2 mt-4">
            {[
              'JavaScript',
              'TypeScript',
              'Python',
              'Rust',
              'C++',
              'Java',
              'Scala',
              'Swift',
            ]
              .sort()
              .map((language) => (
                <Tag key={language}>{language}</Tag>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
