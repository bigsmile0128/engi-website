import React from 'react';
import classNames from 'classnames';
import Avvvatars from 'avvvatars-react';
import { RiGithubFill } from 'react-icons/ri';

type RepositoryInfoProps = {
  className?: string;
  isLoading?: boolean;
  organizationName?: string;
  repositoryName?: string;
};

export default function RepositoryInfo({
  className,
  isLoading,
  repositoryName,
  organizationName,
}: RepositoryInfoProps) {
  return (
    <div
      className={classNames(
        'flex items-center gap-2 overflow-hidden',
        className
      )}
    >
      <div className={classNames('shrink-0', isLoading ? 'skeleton' : '')}>
        {repositoryName ? (
          <Avvvatars value={repositoryName} style="shape" size={48} />
        ) : (
          <div className="h-12 w-12" />
        )}
      </div>
      <div className="flex flex-col gap-0.5">
        <span
          className={classNames(
            'font-grifter text-xl inline-block truncate',
            isLoading ? 'skeleton' : ''
          )}
        >
          {organizationName ?? 'Author N/A'}
        </span>
        <div
          className={classNames(
            'flex items-center gap-2',
            isLoading ? 'skeleton' : ''
          )}
        >
          <RiGithubFill className="h-5 w-5" />
          <span className="text-secondary inline-block truncate">
            {repositoryName ?? 'Repository N/A'}
          </span>
        </div>
      </div>
    </div>
  );
}
