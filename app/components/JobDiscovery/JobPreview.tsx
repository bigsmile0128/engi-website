import React from 'react';
import classNames from 'classnames';
import { AiOutlineUser } from 'react-icons/ai';
import { SiPython } from 'react-icons/si';
import TimeEstimate from '../TimeEstimate';
import { Link } from 'react-router-dom';

interface JobPreviewProps {
  className?: string;
  language?: string;
  title?: string;
  numTests?: number;
  testsPassed?: number;
  timeEstimate?: number;
  reward?: number;
  numContributors?: number;
  id?: string;
  isSkeleton?: boolean;
}

interface LanguageAndTitleProps {
  className?: string;
  language?: string;
  title?: string;
  isSkeleton?: boolean;
  titleClassName?: string;
  iconClassName?: string;
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
  isSkeleton,
  id,
}: JobPreviewProps) {
  return (
    <Link
      to={`/jobs/${id}`}
      className={classNames(
        'bg-[#00000022] text-gray-200',
        isSkeleton ? 'pointer-events-none' : 'hover:bg-[#ffffff22]',
        className
      )}
    >
      <LanguageAndTitle
        language={language}
        title={title}
        isSkeleton={isSkeleton}
        className="flex items-center gap-x-4 p-6 pb-0 md:hidden"
        titleClassName="w-full"
      />
      <div
        className={classNames('flex flex-1 justify-between p-6', {
          'animate-pulse': isSkeleton,
        })}
      >
        <LanguageAndTitle
          language={language}
          title={title}
          isSkeleton={isSkeleton}
          className="hidden flex-col justify-between md:flex"
          iconClassName="md:mb-2"
        />
        <div className="hidden flex-col items-start justify-between sm:flex">
          <span className={classNames('text-xs', isSkeleton ? 'skeleton' : '')}>
            <span>contributors</span>
          </span>
          <div
            className={classNames(
              'flex items-center',
              isSkeleton ? 'hidden' : ''
            )}
          >
            <AiOutlineUser className="text-medium" />
            <span className="ml-1 block text-sm">
              {numContributors ?? 'N/A'}
            </span>
          </div>
          <span className={isSkeleton ? `skeleton text-xs` : 'hidden'}>
            <span>placeholder</span>
          </span>
        </div>
        <div className="flex flex-col items-start justify-between sm:w-20 md:w-32">
          <span className={classNames('text-xs', isSkeleton ? 'skeleton' : '')}>
            <span>test progress</span>
          </span>
          <div className="flex w-full flex-col items-center">
            <span
              className={classNames(
                'mb-1 text-xs',
                isSkeleton ? `skeleton h-2` : ''
              )}
            >
              <span>
                {!isSkeleton && testsPassed && numTests
                  ? `${testsPassed} / ${numTests}`
                  : ''}
                {isSkeleton && 'tests'}
              </span>
            </span>
            <div
              className={classNames(
                'w-full overflow-hidden rounded-full',
                isSkeleton ? 'skeleton' : 'bg-gray-200'
              )}
            >
              <div
                className={classNames(
                  'h-1.5 rounded-full',
                  isSkeleton ? 'invisible' : 'bg-green-400'
                )}
                style={{
                  width: `${((testsPassed ?? 0) / (numTests ?? 1)) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between">
          <span className={classNames('text-xs', isSkeleton ? 'skeleton' : '')}>
            <span>estimated time</span>
          </span>
          <TimeEstimate
            className={classNames(isSkeleton ? 'hidden' : '')}
            duration={timeEstimate ? `${timeEstimate} hours` : 'N/A'}
          />
          <span className={isSkeleton ? `skeleton text-xs` : 'hidden'}>
            <span>placeholder</span>
          </span>
        </div>
        <div className="flex flex-col justify-between">
          <span className={classNames('text-xs', isSkeleton ? 'skeleton' : '')}>
            <span>minimum wage</span>
          </span>
          <div className="flex items-end">
            <span
              className={classNames(
                'mr-1',
                isSkeleton ? `skeleton h-5` : '-mb-[4px] font-grifter'
              )}
            >
              <span>
                {!isSkeleton && (reward ? `$${reward}` : 'N/A')}
                {isSkeleton && '$100'}
              </span>
            </span>
            <span
              className={classNames(
                'text-sm text-gray-300',
                isSkeleton ? `skeleton h-4` : ''
              )}
            >
              <span>
                {!isSkeleton && (reward ? `e${Math.floor(reward * 1.6)}` : '')}
                {isSkeleton && 'e100'}
              </span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function LanguageAndTitle({
  className,
  language,
  title,
  isSkeleton,
  titleClassName,
  iconClassName,
}: LanguageAndTitleProps) {
  return (
    <div className={className}>
      <div
        className={classNames(
          iconClassName,
          isSkeleton ? `skeleton self-start` : ''
        )}
      >
        <SiPython
          className={classNames('h-5 w-5 text-green-400', {
            invisible: isSkeleton,
          })}
        />
      </div>
      <span
        className={classNames(
          'font-bond w-48 truncate text-sm text-gray-200',
          titleClassName
        )}
      >
        <div className={classNames('truncate', isSkeleton ? 'skeleton' : '')}>
          <span>{title ?? 'N/A'}</span>
        </div>
      </span>
    </div>
  );
}
