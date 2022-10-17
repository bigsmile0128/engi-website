import React from 'react';
import classNames from 'classnames';
import JobTable from '../jobs/SearchResults/JobTable';
import useJobs from '~/utils/hooks/useJobs';

type CreatedJobsTabProps = {
  className?: string;
  accountId: string;
};

export default function CreatedJobsTab({
  className,
  accountId,
}: CreatedJobsTabProps) {
  const { isLoading, data } = useJobs({
    limit: 25,
    skip: 0,
    creator: accountId,
  });
  return (
    <div className={classNames('flex flex-col', className)}>
      <JobTable isLoading={isLoading} data={data?.result?.items} />
    </div>
  );
}
