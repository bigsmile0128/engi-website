import React from 'react';
import classNames from 'classnames';

import { MdArrowBack, MdHistory } from 'react-icons/md';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import 'animate.css';

import Transition from 'components/Transition';
import EngiIcon from './img/engi.svg';
import StorybookIcon from './img/storybook.svg';
import FigmaIcon from './img/figma2.svg';

type FigmaStoryExampleProps = {
  className?: string;
  isToggled: boolean;
  boxEndArrowId?: string;
  spanEndArrowId?: string;
};

export default function FigmaStoryExample({
  className,
  isToggled,
  spanEndArrowId,
  boxEndArrowId,
}: FigmaStoryExampleProps) {
  return (
    <div className={classNames('select-none', className)}>
      <div className="bg-[#00000022] border border-[#ffffff66] flex flex-col">
        <div className="p-4 flex gap-x-2 border-b border-[#ffffff22]">
          <div className="bg-black p-1">
            <div className="bg-green-400 rounded-full">
              <EngiIcon className="text-black fill-slate-500 h-4 w-4 pr-0.5" />
            </div>
          </div>
          <h4 className="text-white font-bold">Engi</h4>
        </div>
        <div className="p-4">
          <div className="flex justify-between">
            <MdArrowBack />
            <div className="flex items-center gap-x-1.5 text-gray-400">
              <span className="text-sm hidden xs:block">View History</span>
              <MdHistory />
            </div>
          </div>
          <Transition
            isToggled={isToggled}
            className="text-md whitespace-nowrap xs:text-xl font-bold -mt-5 xs:-mt-6 h-10"
          >
            <div className="flex flex-col items-center justify-center">
              <p>Well done!</p>
              <p>
                It&rsquo;s the
                <span className="bg-emerald-300 text-black p-0.5 ml-1">
                  Same Story
                </span>
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p>
                Sorry,{' '}
                <span className="bg-red-400 text-white p-0.5 ml-1">
                  it&rsquo;s not
                </span>
              </p>
              <p>the Same Story</p>
            </div>
          </Transition>
          <div className="flex items-center justify-between gap-x-4 xs:gap-x-12 mt-8 px-2 xs:px-2 sm:px-8 pb-2">
            <div className="flex flex-col items-center justify-center gap-y-2">
              <div
                className="relative border-2 border-[#ffffff22] h-24 xs:h-28 sm:h-36 w-24 xs:w-28 sm:w-36"
                id={boxEndArrowId}
              >
                <Transition className="h-full" isToggled={isToggled}>
                  <div className="absolute top-1/3 left-1/4 flex items-center justify-center bg-[#F27B50] px-2 py-1 xs:px-4 xs:py-2 sm:px-8 sm:py-4 text-xs font-bold rounded-md whitespace-nowrap">
                    Edit Profile
                  </div>
                  <div className="absolute top-1/3 left-1/4 flex items-center justify-center bg-gray-400 px-2 py-1 xs:px-4 xs:py-2 sm:px-8 sm:py-4 text-xs font-bold rounded-md whitespace-nowrap">
                    Click Me
                  </div>
                </Transition>
                <div className="absolute bg-[#030219] rounded-full p-2.5 sm:p-3.5 top-0 left-0 -translate-x-1/4 -translate-y-1/4">
                  <StorybookIcon className="h-5 xs:h-6 sm:h-7 w-5 xs:w-6 sm:w-7" />
                </div>
              </div>
              <span
                className="text-xs text-gray-400 px-2 whitespace-nowrap"
                id={spanEndArrowId}
              >
                Rendered Code
              </span>
            </div>
            <Transition className="w-8 h-8 mb-8" isToggled={isToggled}>
              <AiFillCheckCircle className="text-emerald-300" size={32} />
              <AiFillCloseCircle className="text-red-400" size={32} />
            </Transition>
            <div className="flex flex-col items-center justify-center gap-y-2">
              <div className="relative border-2 border-[#ffffff22] h-24 xs:h-28 sm:h-36 w-24 xs:w-28 sm:w-36">
                <div className="absolute top-1/3 left-1/4 flex items-center justify-center bg-[#F27B50] px-2 py-1 xs:px-4 xs:py-2 sm:px-8 sm:py-4 text-xs font-bold rounded-md whitespace-nowrap">
                  Edit Profile
                </div>
                <div className="absolute bg-[#030219] rounded-full p-2.5 sm:p-3.5 -translate-x-1/4 -translate-y-1/4">
                  <FigmaIcon className="h-5 xs:h-6 sm:h-7 w-5 xs:w-6 sm:w-7" />
                </div>
              </div>
              <span className="text-xs text-gray-400 px-2">Design Layer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
