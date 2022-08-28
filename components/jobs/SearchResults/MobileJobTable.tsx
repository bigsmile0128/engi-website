import React, { useMemo } from 'react';
import classNames from 'classnames';
import { Job } from 'types';
import JobInfo from './JobInfo';
import Link from 'next/link';
import Activity from './Activity';
import Payout from './Payout';
import TimeEstimate from 'components/TimeEstimate';

type MobileJobTableProps = {
  className?: string;
  data?: Job[];
  isLoading?: boolean;
};

export default function MobileJobTable({
  className,
  data,
  isLoading,
}: MobileJobTableProps) {
  const _data = useMemo<Job[]>(() => {
    if (isLoading) {
      return Array.from({ length: 10 }).map((_, i) => ({
        id: i.toString(),
        language: 'Python',
        title: 'Placeholder',
        numTests: 10,
        testsPassed: 0,
        timeEstimate: 10,
        reward: 100,
        numContributors: 10,
      }));
    }
    return data ?? [];
  }, [data, isLoading]);

  return (
    <div className={classNames('w-full flex flex-col gap-y-4', className)}>
      {_data.map((job) => (
        <Link key={job.id} href={isLoading ? '' : `/jobs/${job.id}`}>
          <a
            className={classNames(
              'p-4',
              'bg-black/[.14]',
              isLoading ? '' : 'hover:bg-black/40'
            )}
          >
            <JobInfo
              className="!flex-row items-center gap-x-2"
              title={job.title}
              iconClassName="!h-8 !w-8 !bg-[#EFEFEF]/[.13]"
              isLoading={isLoading}
            />
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-x-2">
                <label
                  htmlFor="activity"
                  className={classNames(
                    'w-16',
                    'font-medium text-xs',
                    isLoading ? 'skeleton' : 'text-secondary'
                  )}
                >
                  ACTIVITY
                </label>
                <Activity isLoading={isLoading} {...job} />
              </div>
              <TimeEstimate
                className="mr-4"
                duration={`${job.timeEstimate} hours`}
                isLoading={isLoading}
              />
            </div>
            <div className="flex items-center gap-x-2 mt-4">
              <label
                htmlFor="activity"
                className={classNames(
                  'w-16',
                  'font-medium text-xs',
                  isLoading ? 'skeleton' : 'text-secondary'
                )}
              >
                PAYOUT
              </label>
              <Payout isLoading={isLoading} {...job} />
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
}
