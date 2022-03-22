import React from 'react';
import classNames from 'classnames';

import JobPreview from './JobPreview';

interface SearchResultsProps {
  className?: string;
  isLoading: boolean;
  results?: Record<string, any>[];
}

export default function SearchResults({
  className,
  isLoading,
  results,
}: SearchResultsProps) {
  return (
    <div className={classNames('flex flex-col gap-y-4', className)}>
      {isLoading ? (
        <>
          {Array.from({ length: 10 }).map((_, i) => (
            <JobPreview key={i} isSkeleton />
          ))}
        </>
      ) : (
        <>
          {results?.map((job) => (
            <JobPreview key={job.id} {...job} />
          ))}
        </>
      )}
    </div>
  );
}
