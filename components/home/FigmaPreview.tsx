import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import { MdArrowBack, MdCheck, MdHistory } from 'react-icons/md';
import { AiFillCheckCircle } from 'react-icons/ai';
import { SiStorybook } from 'react-icons/si';

import GridPattern from 'components/GridPattern';
import Button from 'components/Button';
import EngiIcon from './img/engi.svg';
import StorybookIcon from './img/storybook.svg';
import figmaPlugin from './img/figma-plugin.png';
import FigmaIcon from './img/figma2.svg';

interface FigmaPreviewProps {
  className?: string;
}

export default function FigmaPreview({ className }: FigmaPreviewProps) {
  return (
    <div
      className={classNames(
        'md:mx-auto flex flex-col md:flex-row border border-[#43ffff1a]',
        className
      )}
    >
      <div className="relative flex flex-col">
        <GridPattern size={64} />
        {/* specific units to line up text precisely with grid */}
        <div className="flex-1 flex flex-col items-start pr-12 pl-[4rem] pt-[5.8rem] border-b md:border-b-0 md:border-r border-[#ffffff22] z-10">
          <h2 className="font-grifter text-white text-5xl">
            <span className="inline md:block">FIGMA plugin</span>
          </h2>
          <p className="md:mt-8 text-gray-300">
            Same Story is a Figma-Storybook equivalency checker and free,
            open-source, pre-release of the Engi Figma Plugin, lets product
            teams easily answer the question “Does my code tell the same story
            as my designs?”
          </p>
          {/* specific units to line up button precisely with grid */}
          <Button className="mt-[3.2rem]">Learn More</Button>
        </div>
      </div>
      <div className="sm:p-12 md:block select-none">
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
                <span className="text-sm">View History</span>
                <MdHistory />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center text-xl font-bold -mt-6">
              <p>Well done!</p>
              <p>
                It&rsquo;s the
                <span className="bg-emerald-300 text-black p-0.5 ml-1">
                  Same Story
                </span>
              </p>
            </div>
            <div className="flex items-center justify-between gap-x-12 mt-8 px-8 pb-2">
              <div className="flex flex-col items-center justify-center gap-y-2">
                <div className="relative border-2 border-[#ffffff22] h-36 w-36">
                  <div className="absolute top-1/3 left-1/4 flex items-center justify-center bg-[#F27B50] px-8 py-4 text-xs font-bold rounded-md whitespace-nowrap">
                    Edit Profile
                  </div>
                  <div className="absolute bg-[#030219] rounded-full p-3.5 -translate-x-1/4 -translate-y-1/4">
                    <StorybookIcon className="h-7 w-7" />
                  </div>
                </div>
                <span className="text-xs text-gray-400">Rendered Code</span>
              </div>
              <AiFillCheckCircle className="text-emerald-300 mb-8" size={32} />
              <div className="flex flex-col items-center justify-center gap-y-2">
                <div className="relative border-2 border-[#ffffff22] h-36 w-36">
                  <div className="absolute top-1/3 left-1/4 flex items-center justify-center bg-[#F27B50] px-8 py-4 text-xs font-bold rounded-md whitespace-nowrap">
                    Edit Profile
                  </div>
                  <div className="absolute bg-[#030219] rounded-full p-3.5 -translate-x-1/4 -translate-y-1/4">
                    <FigmaIcon className="h-7 w-7" />
                  </div>
                </div>
                <span className="text-xs text-gray-400">Design Layer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
