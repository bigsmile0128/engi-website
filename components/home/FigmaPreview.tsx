import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useXarrow } from 'react-xarrows';

import GridPattern from 'components/GridPattern';
import Button from 'components/Button';
import FigmaCodeBlock from './FigmaCodeBlock';
import FigmaStoryExample from './FigmaStoryExample';
import Arrow from 'components/Arrow';
import Link from 'next/link';

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
  const control = useAnimation();
  const [ref, inView] = useInView();
  const updateXarrow = useXarrow();
  const arrowControl = useAnimation();

  useEffect(() => {
    if (inView) {
      control.start('visible');
    }
  }, [inView]);

  const variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
    hidden: { opacity: 0, y: 200 },
  };

  const motionProps = {
    initial: 'hidden',
    variants: variants,
  };

  return (
    <motion.div
      className={classNames('grid relative', className)}
      animate={control}
      initial="hidden"
      onAnimationComplete={() => {
        updateXarrow();
        arrowControl.start('arrowVisible');
      }}
      transition={{ staggerChildren: 0.15 }}
    >
      <motion.div className="flex flex-col lg:flex-row lg:items-center border border-[#43ffff1a]">
        <motion.div className="relative flex flex-col h-full">
          <GridPattern size={64} />
          {/* specific units to line up text precisely with grid on XL */}
          <motion.div className="flex-1 flex flex-col items-start p-8 xs:p-12 lg:p-6 xl:px-[4rem] xl:pt-[5.8rem] border-b lg:border-b-0 lg:border-r border-[#ffffff22] z-[5]">
            <motion.h2
              className="font-grifter text-white text-5xl"
              variants={variants}
            >
              <span className="inline md:block">FIGMA plugin</span>
            </motion.h2>
            <motion.p className="mt-8 text-gray-300" variants={variants}>
              Same Story is a Figma-Storybook equivalency checker and free,
              open-source, pre-release of the Engi Figma Plugin, lets product
              teams easily answer the question “Does my code tell the same story
              as my designs?”
            </motion.p>
            {/* slide into view when this div is visible */}
            <div ref={ref}></div>
            {/* specific units to line up button precisely with grid on XL */}
            <Link href="/litepaper">
              <a>
                <Button className="mt-8 xl:mt-[3.2rem]" variants={variants}>
                  Learn More
                </Button>
              </a>
            </Link>
          </motion.div>
        </motion.div>
        <FigmaStoryExample
          className="hidden sm:block md:m-20 lg:m-4 xl:m-12"
          spanEndArrowId="arrow-end1"
          variants={variants}
        />
      </motion.div>
      <motion.div
        className={classNames(
          'w-full mt-4 justify-self-end overflow-hidden relative',
          'sm:mt-8 sm:mr-0 sm:w-auto sm:absolute sm:-bottom-32 sm:left-1/3',
          'md:left-1/2 md:-bottom-16',
          'lg:left-56',
          'xl:left-1/4'
        )}
        variants={variants}
      >
        <FigmaCodeBlock
          codeContainerClassName="w-full"
          codeProps={{
            className: 'w-full sm:w-[320px] py-2',
            id: 'arrow-start1',
          }}
          id="arrow-start2"
        />
      </motion.div>
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
        animate={arrowControl}
        initial="arrowHidden"
        variants={{
          arrowVisible: { opacity: 1 },
          arrowHidden: { opacity: 0 },
        }}
      />
      <Arrow
        className="hidden lg:block xl:hidden"
        start="arrow-start1"
        end="arrow-end1"
        startAnchor="top"
        endAnchor="bottom"
        animate={arrowControl}
        initial="arrowHidden"
        variants={{
          arrowVisible: { opacity: 1 },
          arrowHidden: { opacity: 0 },
        }}
      />
      <Arrow
        className="sm:hidden"
        start="arrow-start2"
        end="arrow-end2"
        startAnchor="bottom"
        curveness={0.9}
        endAnchor="top"
        animate={arrowControl}
        initial="arrowHidden"
        variants={{
          arrowVisible: { opacity: 1 },
          arrowHidden: { opacity: 0 },
        }}
      />
    </motion.div>
  );
}
