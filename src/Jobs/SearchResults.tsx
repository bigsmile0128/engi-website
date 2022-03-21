import React from 'react';
import classNames from 'classnames';
import JobPreview from './JobPreview';

interface SearchResultsProps {
  className?: string;
}

const mockJobs = [
  {
    language: 'python',
    title: 'Create a job details component',
    numTests: 10,
    testsPassed: 5,
    timeEstimate: 2, // hours
    reward: 100, // USD
    numContributors: 100,
    id: '100',
  },
];

export default function SearchResults({ className }: SearchResultsProps) {
  return (
    <div className={classNames('flex flex-col gap-y-4', className)}>
      {mockJobs.map((job) => (
        <JobPreview key={job.id} {...job} />
      ))}
      <JobPreview isSkeleton />
    </div>
  );
}
