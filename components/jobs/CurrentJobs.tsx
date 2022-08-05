import React from 'react';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { ChevronRightIcon } from '@heroicons/react/outline';
import { useQuery } from 'react-query';
import axios from 'axios';
import Link from 'next/link';

type CurrentJobsProps = {
  className?: string;
};

export default function CurrentJobs({ className }: CurrentJobsProps) {
  const { isLoading, data } = useQuery(['fetchCurrentJobs'], fetchCurrentJobs);

  return (
    <div className={classNames('', className)}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-grifter text-2xl">Current Jobs</h2>
        <a
          className={classNames(
            'cursor-pointer flex items-center shrink-0',
            'text-sm text-white/80 underline whitespace-nowrap'
          )}
          onClick={() => toast.info('Not yet implemented.')}
        >
          <span>View All</span>
          <ChevronRightIcon />
        </a>
      </div>
      <div className="flex flex-col gap-y-6">
        {isLoading ? (
          <>
            <JobItem isSkeleton />
            <JobItem isSkeleton />
          </>
        ) : data?.length > 0 ? (
          data
            .slice(0, 2)
            .map((job) => (
              <JobItem
                key={job.id}
                id={job.id}
                title={job.title}
                testsPassed={job.testsPassed}
                numTests={job.numTests}
              />
            ))
        ) : (
          <p className="text-secondary">No current jobs.</p>
        )}
      </div>
    </div>
  );
}

async function fetchCurrentJobs() {
  const response = await axios.get('/api/jobs/current');
  return response.data;
}

type JobItemProps = {
  className?: string;
  id?: string;
  title?: string;
  numTests?: number;
  testsPassed?: number;
  isSkeleton?: boolean;
};

function JobItem({
  className,
  id,
  title,
  testsPassed,
  numTests,
  isSkeleton,
}: JobItemProps) {
  return (
    <div className="flex flex-col">
      <Link href={isSkeleton ? '' : `/jobs/${id}`}>
        <a
          className={classNames(
            'flex items-center gap-x-1 mb-5',
            isSkeleton
              ? 'children:skeleton pointer-events-none'
              : 'hover:text-green-primary'
          )}
        >
          <span className={isSkeleton ? 'w-1/3' : ''}>
            {title ?? 'No job title'}
          </span>
          <ChevronRightIcon className="h-4 w-4" />
        </a>
      </Link>
      <div
        className={classNames(
          'flex items-center',
          isSkeleton ? 'children:skeleton' : ''
        )}
      >
        {Array.from({ length: isSkeleton ? 1 : numTests }).map((_, i) => (
          <div
            key={i}
            className={classNames(
              'flex-1 h-[6px]',
              i < testsPassed ? 'bg-[#F27B50]' : 'bg-white/30',
              i < (numTests ?? 0) - 1 ? 'border-r border-secondary' : ''
            )}
          />
        ))}
      </div>
    </div>
  );
}
