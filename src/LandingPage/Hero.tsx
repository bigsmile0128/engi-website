import React from 'react';

import jobActivityImage from './img/job-activity.png';
import { ReactComponent as GitIcon } from './img/git.svg';
import { ReactComponent as ReactIcon } from './img/react.svg';
import { ReactComponent as RustIcon } from './img/rust.svg';
import { ReactComponent as FigmaIcon } from './img/figma.svg';
import { ReactComponent as PythonIcon } from './img/python.svg';

export default function Hero({ onEmailSignupClick }) {
  return (
    <div className="max-w-3xl lg:max-w-4xl mx-auto pt-4 py-16 px-4 sm:py-20 sm:px-6 lg:px-8 flex flex-col items-center sm:items-start">
      <div className="flex items-center sm:justify-between">
        <h2 className="text-4xl font-extrabold text-slate-100 sm:text-6xl sm:text-center">
          <div className="flex items-center">
            <svg
              className="scale-[.5] sm:scale-[.65] -mt-3 sm:mr-2 -ml-1"
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
            <span className="font-grifter">economy</span>
            <svg
              className="scale-[.5] sm:scale-[.65] -mt-2 sm:mr-1"
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
            <span className="font-grifter">for</span>
          </div>
          <div className="flex items-center">
            <span className="block font-grifter">programmers</span>
            <svg
              className="scale-[.5] sm:scale-[.65] -mt-3 sm:ml-2"
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
        <div className="w-1/4 hidden md:block">
          <img
            className="scale-[.85]"
            src={jobActivityImage}
            alt="job-activity"
          />
        </div>
      </div>
      <p className="text-lg leading-6 text-gray-300 mt-8 sm:mt-4 md:mt-0">
        <span className="block">
          Welcome to
          <span className="ml-1 bg-[#65FFB7] text-[#4A6B63]">engi</span>, a
          software engineering
        </span>
        <span className="block mt-1">job market built on the blockchain</span>
      </p>
      <div className="flex mt-12">
        <div className="flex-1 flex flex-col">
          <div className="flex w-full">
            {/* TODO: add basic email validation */}
            <input
              className="bg-transparent border border-gray-500 p-4 text-sm flex-1 focus:outline-none focus:ring"
              type="text"
              placeholder="Enter your e-mail address"
            />
            <button
              className="shrink-0 bg-gray-300 px-6 font-bold text-sm hover:bg-gray-200 active:bg-gray-100 focus:outline-none focus:ring"
              onClick={onEmailSignupClick}
            >
              Get Notified
            </button>
          </div>
          <div className="flex items-center mt-16 gap-x-6 sm:gap-x-8">
            <GitIcon />
            <ReactIcon />
            <RustIcon />
            <FigmaIcon />
            <PythonIcon />
            <div className="flex flex-col text-xs text-gray-200">
              <span>+ more</span>
              <span>languages</span>
            </div>
          </div>
        </div>
        <div className="flex-1"></div>
      </div>
    </div>
  );
}
