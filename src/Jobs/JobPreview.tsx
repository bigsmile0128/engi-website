import React from 'react';
import classNames from 'classnames';
import { AiOutlineUser } from 'react-icons/ai';
import { SiPython } from 'react-icons/si';
import TimeEstimate from '../components/TimeEstimate';

interface JobPreviewProps {
  className?: string;
  language: string;
  title: string;
  numTests: number;
  testsPassed: number;
  timeEstimate: number;
  reward: number;
  numContributors: number;
  id: string;
}

export default function JobPreview({
  className,
  language,
  title,
  numTests,
  testsPassed,
  timeEstimate,
  reward,
  numContributors,
}: JobPreviewProps) {
  return (
    // TODO: make Link with hover state and disable highlight
    // TODO: make responsive
    <div
      className={classNames(
        'relative bg-[#00000022] p-6 flex justify-between text-gray-200',
        className
      )}
    >
      <div className="flex flex-col gap-y-2">
        <SiPython className="h-5 w-5 text-green-400" />
        {/* TODO: handle long titles */}
        <span className="font-bond text-gray-200 text-sm">{title}</span>
      </div>
      <div className="flex flex-col justify-between">
        <p className="text-xs">total contributors</p>
        <div className="flex items-center">
          <AiOutlineUser className="text-medium" />
          <span className="block ml-1 text-sm">{numContributors}</span>
        </div>
      </div>
      <div className="flex flex-col justify-between w-32">
        <p className="text-xs">test progress</p>
        <div className="flex flex-col items-center">
          <span className="text-xs mb-1">5 / 10</span>
          <div className="bg-gray-200 rounded-full w-full overflow-hidden">
            <div
              className="h-1.5 bg-green-400 rounded-full"
              style={{ width: `${(testsPassed / numTests) * 100}%` }}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <span className="text-xs mb-1">estimated time</span>
        <TimeEstimate duration={`${timeEstimate} hours`} />
      </div>
      <div className="flex flex-col justify-between">
        <span className="text-xs mb-1">minimum wage</span>
        <div className="flex items-end">
          <span className="font-grifter -mb-1.5 mr-1">${reward}</span>
          <span className="text-xs">e160</span>
        </div>
      </div>
    </div>
  );
}
