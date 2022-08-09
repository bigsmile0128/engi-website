import React from 'react';
import classNames from 'classnames';
import { Job } from 'types';
import JobPreview from '../JobPreview';

type MobileJobTableProps = {
  className?: string;
  data: Job[];
};

export default function MobileJobTable({
  className,
  data,
}: MobileJobTableProps) {
  return (
    <div className={classNames('w-full flex flex-col gap-y-4', className)}>
      {data.map((job) => (
        <JobPreview key={job.id} {...job} />
      ))}
    </div>
  );
}
