import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import GridPattern from 'components/GridPattern';
import Button from 'components/Button';
import FigmaCodeBlock from './FigmaCodeBlock';
import FigmaStoryExample from './FigmaStoryExample';
import Arrow from 'components/Arrow';

interface FigmaPreviewProps {
  className?: string;
}

const code = `
const Button = ({ text }) => (
  <button className="btn">{text}</button>
);
`.trim();

const incorrectCode = `
const Button = () => (
  <button>Click Me</button>
);
`.trim();

export default function FigmaPreview({ className }: FigmaPreviewProps) {
  return (
    <div className={classNames('grid relative', className)}>
      <div className="flex flex-col lg:flex-row lg:items-center border border-[#43ffff1a]">
        <div className="relative flex flex-col h-full">
          <GridPattern size={64} />
          {/* specific units to line up text precisely with grid on XL */}
          <div className="flex-1 flex flex-col items-start p-8 xs:p-12 lg:p-6 xl:px-[4rem] xl:pt-[5.8rem] border-b lg:border-b-0 lg:border-r border-[#ffffff22] z-[5]">
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
        <FigmaStoryExample
          className="hidden sm:block md:p-20 lg:p-4 xl:p-12"
          spanEndArrowId="arrow-end1"
        />
      </div>
      <div className="w-full mt-4 sm:mt-8 justify-self-end overflow-hidden sm:mr-0 relative sm:w-auto sm:absolute sm:-bottom-4 sm:left-1/3 md:left-1/2 lg:left-56 xl:left-1/4 sm:translate-y-full md:translate-y-1/2 lg:translate-y-2/3 xl:translate-y-1/2 w-30">
        <FigmaCodeBlock
          codeContainerClassName="w-full"
          codeProps={{
            className: 'w-full sm:w-[320px] py-2',
            id: 'arrow-start1',
          }}
          id="arrow-start2"
        />
      </div>
      <FigmaStoryExample
        className="mt-8 sm:hidden"
        boxEndArrowId="arrow-end2"
      />
      {/* arrows for different screen sizes */}
      <Arrow
        className="hidden sm:block lg:hidden xl:block"
        start="arrow-start1"
        end="arrow-end1"
        endAnchor="bottom"
      />
      <Arrow
        className="hidden lg:block xl:hidden"
        start="arrow-start1"
        end="arrow-end1"
        startAnchor="top"
        endAnchor="bottom"
      />
      <Arrow
        className="sm:hidden"
        start="arrow-start2"
        end="arrow-end2"
        startAnchor="bottom"
        curveness={0.9}
        endAnchor="top"
      />
    </div>
  );
}
