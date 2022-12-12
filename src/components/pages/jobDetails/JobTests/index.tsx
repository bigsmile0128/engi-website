import React from 'react';
import classNames from 'classnames';
import { Job } from '~/types';

type JobTestsProps = {
  className?: string;
  data?: Job;
  isLoading?: boolean;
};

export default function JobTests({
  className,
  isLoading,
  data,
}: JobTestsProps) {
  return (
    <div className={classNames('flex flex-col gap-2', className)}>
      {isLoading ? (
        <div>Loading...</div>
      ) : data?.tests?.length > 0 ? (
        data.tests.map((test) => (
          <div key={test.id} className="bg-black/[.14] px-8 py-6">
            <span className="font-medium">{test.id}</span>
          </div>
        ))
      ) : (
        <div>no tests found</div>
      )}
    </div>
  );
}
