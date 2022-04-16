import React from 'react';
import classNames from 'classnames';
import { AiOutlineUser } from 'react-icons/ai';
import { SiPython } from 'react-icons/si';
import TimeEstimate from '../../components/TimeEstimate';
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
        className="md:hidden flex items-center p-6 pb-0 gap-x-4"
        titleClassName="w-full"
      />
      <div
        className={classNames('flex-1 flex justify-between p-6', {
          'animate-pulse': isSkeleton,
        })}
      >
        <LanguageAndTitle
          language={language}
          title={title}
          isSkeleton={isSkeleton}
          className="hidden md:flex flex-col justify-between"
          iconClassName="md:mb-2"
        />
        <div className="hidden sm:flex flex-col justify-between items-start">
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
            <span className="block ml-1 text-sm">
              {numContributors ?? 'N/A'}
            </span>
          </div>
          <span className={isSkeleton ? `text-xs skeleton` : 'hidden'}>
            <span>placeholder</span>
          </span>
        </div>
        <div className="flex flex-col justify-between items-start sm:w-20 md:w-32">
          <span className={classNames('text-xs', isSkeleton ? 'skeleton' : '')}>
            <span>test progress</span>
          </span>
          <div className="flex flex-col items-center w-full">
            <span
              className={classNames(
                'text-xs mb-1',
                isSkeleton ? `h-2 skeleton` : ''
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
                'rounded-full w-full overflow-hidden',
                isSkeleton ? 'skeleton' : 'bg-gray-200'
              )}
            >
              <div
                className={classNames(
                  'h-1.5 rounded-full',
                  isSkeleton ? 'invisible' : 'bg-green-400'
                )}
                style={{ width: `${(testsPassed / numTests || 0) * 100}%` }}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between items-start">
          <span className={classNames('text-xs', isSkeleton ? 'skeleton' : '')}>
            <span>estimated time</span>
          </span>
          <TimeEstimate
            className={classNames(isSkeleton ? 'hidden' : '')}
            duration={timeEstimate ? `${timeEstimate} hours` : 'N/A'}
          />
          <span className={isSkeleton ? `text-xs skeleton` : 'hidden'}>
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
                isSkeleton ? `h-5 skeleton` : 'font-grifter -mb-[4px]'
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
                isSkeleton ? `h-4 skeleton` : ''
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
          isSkeleton ? `self-start skeleton` : ''
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
          'font-bond text-gray-200 text-sm w-48 truncate',
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
