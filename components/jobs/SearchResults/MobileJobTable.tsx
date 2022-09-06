import React, { useMemo } from 'react';
import classNames from 'classnames';
import { Job } from 'types';
import JobInfo, { MobileJobInfo } from './JobInfo';
import Link from 'next/link';
import Activity from './Activity';
import TimeEstimate from 'components/TimeEstimate';
import EngiAmount from 'components/EngiAmount';
import JobStatus from './JobStatus';
import Tag from 'components/Tag';
import { mockJob } from 'types/mock';

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
        ...mockJob,
        id: i.toString(),
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
            <MobileJobInfo
              isLoading={isLoading}
              name={job.name}
              createdOn={job?.createdOn?.dateTime}
            />
            <div className="flex items-center gap-x-2 mt-4">
              <JobStatus isLoading={isLoading} status={job?.status} />
              <Tag className="py-1 ml-auto">Easy</Tag>
              <EngiAmount
                className="ml-8"
                isLoading={isLoading}
                value={job.funding}
              />
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
}
