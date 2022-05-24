import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { MdArrowBack, MdCheck, MdHistory } from 'react-icons/md';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { SiStorybook } from 'react-icons/si';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { motion, AnimatePresence } from 'framer-motion';

import GridPattern from 'components/GridPattern';
import Button from 'components/Button';
import EngiIcon from './img/engi.svg';
import StorybookIcon from './img/storybook.svg';
import figmaPlugin from './img/figma-plugin.png';
import FigmaIcon from './img/figma2.svg';

const Xarrow = dynamic(() => import('react-xarrows'), { ssr: false });

interface FigmaPreviewProps {
  className?: string;
}

const code = `
const Button = ({ children }) => (
  <button className="btn">{children}</button>
);
`.trim();

const incorrectCode = `
const Button = () => (
  <button>Click Me</button>
);
`.trim();

export default function FigmaPreview({ className }: FigmaPreviewProps) {
  const [showSameStory, setShowSameStory] = useState(true);

  useEffect(() => {
    setTimeout(() => setShowSameStory(!showSameStory), 4000);
  }, [showSameStory]);

  const motionProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 },
  };

  return (
    <div className={classNames('grid relative', className)}>
      <div className="flex flex-col lg:flex-row border border-[#43ffff1a]">
        <div className="relative flex flex-col">
          <GridPattern size={64} />
          {/* specific units to line up text precisely with grid on XL */}
          <div className="flex-1 flex flex-col items-start p-8 xs:p-12 xl:px-[4rem] xl:pt-[5.8rem] border-b lg:border-b-0 lg:border-r border-[#ffffff22] z-10">
            <h2 className="font-grifter text-white text-5xl">
              <span className="inline md:block">FIGMA plugin</span>
            </h2>
            <p className="mt-8 text-gray-300">
              Same Story is a Figma-Storybook equivalency checker and free,
              open-source, pre-release of the Engi Figma Plugin, lets product
              teams easily answer the question “Does my code tell the same story
              as my designs?”
            </p>
            {/* specific units to line up button precisely with grid on XL */}
            <Button className="mt-8 xl:mt-[3.2rem]">Learn More</Button>
          </div>
        </div>
        <div className="md:p-20 lg:p-4 xl:p-12 md:block select-none">
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
                  <span className="text-xs xs:text-sm">View History</span>
                  <MdHistory />
                </div>
              </div>
              <AnimatePresence exitBeforeEnter>
                {showSameStory ? (
                  <motion.div
                    key="0"
                    className="flex flex-col items-center justify-center text-md xs:text-xl font-bold -mt-5 xs:-mt-6"
                    {...motionProps}
                  >
                    <p>Well done!</p>
                    <p>
                      It&rsquo;s the
                      <span className="bg-emerald-300 text-black p-0.5 ml-1">
                        Same Story
                      </span>
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="1"
                    className="flex flex-col items-center justify-center text-md xs:text-xl font-bold -mt-5 xs:-mt-6"
                    {...motionProps}
                  >
                    <p>
                      Sorry,{' '}
                      <span className="bg-red-400 text-black p-0.5 ml-1">
                        it&rsquo;s not
                      </span>
                    </p>
                    <p>the Same Story</p>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="flex items-center justify-between gap-x-4 xs:gap-x-12 mt-8 px-2 xs:px-2 sm:px-8 pb-2">
                <div className="flex flex-col items-center justify-center gap-y-2">
                  <div className="relative border-2 border-[#ffffff22] h-24 xs:h-28 sm:h-36 w-24 xs:w-28 sm:w-36">
                    <AnimatePresence exitBeforeEnter>
                      {showSameStory ? (
                        <motion.div
                          key="0"
                          className="absolute top-1/3 left-1/4 flex items-center justify-center bg-[#F27B50] px-2 py-1 xs:px-4 xs:py-2 sm:px-8 sm:py-4 text-xs font-bold rounded-md whitespace-nowrap"
                          {...motionProps}
                        >
                          Edit Profile
                        </motion.div>
                      ) : (
                        <motion.div
                          key="1"
                          className="absolute top-1/3 left-1/4 flex items-center justify-center bg-gray-400 px-2 py-1 xs:px-4 xs:py-2 sm:px-8 sm:py-4 text-xs font-bold rounded-md whitespace-nowrap"
                          {...motionProps}
                        >
                          Click Me
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="absolute bg-[#030219] rounded-full p-2.5 sm:p-3.5 -translate-x-1/4 -translate-y-1/4">
                      <StorybookIcon className="h-5 xs:h-6 sm:h-7 w-5 xs:w-6 sm:w-7" />
                    </div>
                  </div>
                  <span
                    className="text-xs text-gray-400 px-2 whitespace-nowrap"
                    id="arrow-end"
                  >
                    Rendered Code
                  </span>
                </div>
                <AnimatePresence exitBeforeEnter>
                  {showSameStory ? (
                    <motion.div key="0" {...motionProps}>
                      <AiFillCheckCircle
                        className="text-emerald-300 mb-8"
                        size={32}
                      />
                    </motion.div>
                  ) : (
                    <motion.div key="1" {...motionProps}>
                      <AiFillCloseCircle
                        className="text-red-400 mb-8"
                        size={32}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="flex flex-col items-center justify-center gap-y-2">
                  <div className="relative border-2 border-[#ffffff22] h-24 xs:h-28 sm:h-36 w-24 xs:w-28 sm:w-36">
                    <div className="absolute top-1/3 left-1/4 flex items-center justify-center bg-[#F27B50] px-2 py-1 xs:px-4 xs:py-2 sm:px-8 sm:py-4 text-xs font-bold rounded-md whitespace-nowrap">
                      Edit Profile
                    </div>
                    <div className="absolute bg-[#030219] rounded-full p-2.5 sm:p-3.5 -translate-x-1/4 -translate-y-1/4">
                      <FigmaIcon className="h-5 xs:h-6 sm:h-7 w-5 xs:w-6 sm:w-7" />
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 px-2">
                    Design Layer
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="arrow-start"
        className="mt-8 justify-self-end overflow-hidden sm:mr-8 md:mr-0 md:absolute md:bottom-0 md:left-1/2 lg:left-56 xl:left-1/4 md:translate-y-1/2 lg:translate-y-2/3 xl:translate-y-1/2 w-30"
      >
        <AnimatePresence exitBeforeEnter>
          {showSameStory ? (
            <motion.div
              key="0"
              className="flex flex-col items-start"
              {...motionProps}
            >
              <div className="text-[11px] xs:text-xs font-mono bg-[#253520aa] px-2 py-1">
                Button.tsx
              </div>
              <div className="flex">
                <div className="border-l-2 border-emerald-300"></div>
                <SyntaxHighlighter
                  id="arrow-start1"
                  className="text-[11px] xs:text-xs !bg-[#253520aa] leading-5 overflow-hidden"
                  language="javascript"
                  style={monokai}
                  showLineNumbers
                  wrapLines
                  codeTagProps={{}}
                >
                  {code}
                </SyntaxHighlighter>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="1"
              className="flex flex-col items-start"
              {...motionProps}
            >
              <div className="text-[11px] xs:text-xs font-mono bg-[#253520aa] px-2 py-1">
                Button.tsx
              </div>
              <div className="flex">
                <div className="border-l-2 border-red-400"></div>
                <SyntaxHighlighter
                  id="arrow-start2"
                  className="text-[11px] xs:text-xs !bg-[#253520aa] leading-5 overflow-hidden"
                  language="javascript"
                  style={monokai}
                  showLineNumbers
                  wrapLines
                  codeTagProps={{}}
                >
                  {incorrectCode}
                </SyntaxHighlighter>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="hidden sm:block">
        <AnimatePresence exitBeforeEnter>
          {showSameStory ? (
            <motion.div key="0" {...motionProps}>
              <Xarrow
                start="arrow-start1"
                end="arrow-end"
                strokeWidth={1}
                headSize={8}
                curveness={0.6}
                endAnchor="bottom"
                dashness
              />
            </motion.div>
          ) : (
            <motion.div key="1" {...motionProps}>
              <Xarrow
                start="arrow-start2"
                end="arrow-end"
                strokeWidth={1}
                headSize={8}
                curveness={0.6}
                endAnchor="bottom"
                dashness
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="sm:hidden">
        <AnimatePresence exitBeforeEnter>
          {showSameStory ? (
            <motion.div key="0" {...motionProps}>
              <Xarrow
                start="arrow-start1"
                end="arrow-end"
                strokeWidth={1}
                headSize={8}
                curveness={0.6}
                startAnchor={{
                  position: 'top',
                  offset: {
                    x: 16,
                  },
                }}
                endAnchor="right"
                dashness
              />
            </motion.div>
          ) : (
            <motion.div key="1" {...motionProps}>
              <Xarrow
                start="arrow-start2"
                end="arrow-end"
                strokeWidth={1}
                headSize={8}
                curveness={0.6}
                startAnchor={{
                  position: 'top',
                  offset: {
                    x: 16,
                  },
                }}
                endAnchor="right"
                dashness
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
