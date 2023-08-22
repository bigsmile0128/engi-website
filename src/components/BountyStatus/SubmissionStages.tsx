'use client';

import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  RiArrowDropUpLine,
  RiCheckFill,
  RiCloseFill,
  RiCloudFill,
} from 'react-icons/ri';

type SubmissionStagesProps = {
  className?: string;
  stages: any[];
};

export default function SubmissionStages({
  className,
  stages,
}: SubmissionStagesProps) {
  const [expanded, setExpanded] = useState(false);

  const activeStages = new Set(['ANALYZING', 'SKIPPED', 'FAILED']);

  const activeStageIndex = stages.findIndex((stage) =>
    activeStages.has(stage.status)
  );

  return (
    <div
      className={classNames(
        'relative flex',
        expanded ? 'flex-col items-start gap-2' : 'flex-row items-center',
        className
      )}
    >
      {stages.map(({ stage, status }, i) => (
        <motion.div
          key={stage}
          className="relative flex items-center gap-2"
          layout
          animate={{
            opacity: expanded || i <= activeStageIndex ? 1 : 0,
          }}
        >
          <motion.div
            className={classNames(
              'flex items-center',
              'border rounded-full p-1 border-white/50',
              status === 'PASSED'
                ? 'bg-green-primary'
                : status === 'FAILED'
                ? 'bg-red-primary'
                : status === 'ANALYZING'
                ? 'bg-purple-primary'
                : 'bg-secondary',
              !expanded && i !== 0 ? '-ml-2' : ''
            )}
            layout
          >
            <motion.span>
              {status === 'PASSED' ? (
                <RiCheckFill className="h-4 w-auto text-[#476966]" />
              ) : status === 'FAILED' ? (
                <RiCloseFill className="h-4 w-auto " />
              ) : status === 'ANALYZING' ? (
                <RiCloudFill className="h-4 w-auto " />
              ) : (
                <RiCheckFill className="h-4 w-auto text-[#476966]" />
              )}
            </motion.span>
          </motion.div>
          <motion.div
            className={classNames('absolute', expanded ? 'left-8' : 'left-6')}
            animate={{
              opacity: i === activeStageIndex || expanded ? 1 : 0,
            }}
            layout
          >
            {stage}
          </motion.div>
        </motion.div>
      ))}
      <motion.button
        className="absolute top-0 right-0 h-8 w-8 focus-green-primary"
        onClick={() => setExpanded(!expanded)}
        animate={{
          rotate: expanded ? '180deg' : '0deg',
        }}
        layout
      >
        <RiArrowDropUpLine className="h-8 w-auto" />
      </motion.button>
    </div>
  );
}
