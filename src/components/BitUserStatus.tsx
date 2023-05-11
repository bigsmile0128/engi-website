'use client';

import Avvvatars from 'avvvatars-react';
import classNames from 'classnames';
import Link from 'next/link';
import {
  RiCheckboxCircleFill,
  RiCheckboxCircleLine,
  RiCloseCircleLine,
  RiGithubFill,
  RiLineChartFill,
} from 'react-icons/ri';
import CopyLink from './CopyLink';
import Statistic from './Statistic';
import ProgressBar from './global/ProgressBar/ProgressBar';

type BitUserStatusProps = {
  className?: string;
  status:
    | 'OPEN'
    | 'PROGRESS'
    | 'ANALYZING'
    | 'SUBMITTED'
    | 'FAILED'
    | 'COMPLETE';
};

export default function BitUserStatus({
  className,
  status,
}: BitUserStatusProps) {
  const bitId = '3344141798568160489';

  return (
    <div
      className={classNames(
        'inline-block bg-secondary/10 backdrop-blur-[100px] p-6 w-[400px]',
        className
      )}
    >
      {status === 'OPEN' ? (
        <div
          className={classNames(
            'flex flex-col items-start justify-between gap-y-4'
          )}
        >
          <div className="flex flex-col">
            <span className="font-grifter text-xl text-green-primary">
              Ready to get started?
            </span>
            <span className="text-secondary mt-1">
              Copy the command to your clipboard.
            </span>
          </div>
          <div>
            <CopyLink
              className=""
              value={
                typeof window !== 'undefined'
                  ? `docker compose run cli engi job get ${bitId} | tee /tmp/demo-csharp-job.json`
                  : ''
              }
            />
            <span className="font-medium text-xs mt-2">
              First time starting a job? Check out our{' '}
              <Link
                href="https://button-produce-60a.notion.site/Engi-Cookbook-68c2d1347ecd499d8901ae387829ba10"
                className="underline hover:text-green-primary"
              >
                documentation
              </Link>
              .
            </span>
          </div>
        </div>
      ) : status === 'PROGRESS' ? (
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-4">
            <div className="shrink-0">
              <Avvvatars value="123" style="shape" size={48} />
            </div>
            <span className="font-grifter text-xl -mb-2">
              You are currently working on this bounty
            </span>
          </div>
          <Statistic
            className="col-span-2"
            icon={<RiLineChartFill className="text-green-primary h-5 w-5" />}
            value="Your Progress"
            title={
              <ProgressBar className="w-full" percentage={0.5} label="5/10" />
            }
          />
        </div>
      ) : status === 'ANALYZING' ? (
        <div className="flex items-start gap-4">
          <div className="shrink-0">
            <Avvvatars value="123" style="shape" size={48} />
          </div>
          <div className="flex flex-col items-start">
            <span className="font-grifter text-xl -mb-2">
              You have made a submission! Hold tight while it’s being analyzed
            </span>
            <div className="mt-6 flex items-center gap-2">
              <RiCheckboxCircleFill className="h-4 w-4 text-green-primary" />
              <RiCheckboxCircleFill className="h-4 w-4 text-green-primary" />
              <RiCheckboxCircleFill className="h-4 w-4 text-green-primary" />
              <RiCheckboxCircleFill className="h-4 w-4 text-green-primary" />
              <RiCheckboxCircleFill className="h-4 w-4 text-green-primary" />
              <RiCheckboxCircleFill className="h-4 w-4 text-secondary" />
            </div>
            <span className="mt-2 text-xs text-secondary">Running tests</span>
          </div>
        </div>
      ) : status === 'SUBMITTED' ? (
        <div className="flex flex-col gap-8">
          <div className="flex items-start gap-4">
            <div className="shrink-0">
              <Avvvatars value="123" style="shape" size={48} />
            </div>
            <span className="font-grifter text-xl -mb-2">
              You have submitted a bounty
            </span>
          </div>
          <div className="flex items-start gap-2">
            <RiCheckboxCircleLine className="mt-[1px] shrink-0 h-6 w-6 text-green-primary" />
            <div className="flex flex-col items-start">
              <span className="font-bold text-xl">Submission Passed</span>
              <button className="p-0 font-medium text-sm underline hover:text-green-primary">
                View submission details
              </button>
            </div>
          </div>
        </div>
      ) : status === 'FAILED' ? (
        <div className="flex flex-col gap-8">
          <div className="flex items-start gap-4">
            <div className="shrink-0">
              <Avvvatars value="123" style="shape" size={48} />
            </div>
            <span className="font-grifter text-xl -mb-2">
              You have submitted a bounty
            </span>
          </div>
          <div className="flex items-start gap-2">
            <RiCloseCircleLine className="mt-[1px] shrink-0 h-6 w-6 text-red-primary" />
            <div className="flex flex-col items-start">
              <span className="font-bold text-xl">Submission failed</span>
              <button className="p-0 font-medium text-sm underline hover:text-green-primary">
                View submission details
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-4">
          <div className="shrink-0">
            <Avvvatars value="123" style="shape" size={48} />
          </div>
          <div className="flex flex-col items-start gap-4">
            <span className="font-grifter text-xl -mb-2">
              The bounty is complete
            </span>
            <button className="flex items-center gap-2">
              <RiGithubFill className="shrink-0 h-6 w-6" />
              <span className="font-medium text-sm text-secondary underline hover:text-green-primary">
                View pull requests
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
