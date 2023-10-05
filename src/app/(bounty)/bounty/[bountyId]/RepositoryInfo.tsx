import React from 'react';
import classNames from 'classnames';
import Avvvatars from 'avvvatars-react';
import { RiGithubFill } from 'react-icons/ri';

type RepositoryInfoProps = {
  className?: string;
  organizationName?: string;
  repositoryName?: string;
};

export default function RepositoryInfo({
  className,
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
      <div className="shrink-0">
        {repositoryName ? (
          <Avvvatars value={repositoryName} style="shape" size={48} />
        ) : (
          <div className="h-12 w-12" />
        )}
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="font-grifter text-xl inline-block truncate">
          {organizationName ?? 'Author N/A'}
        </span>
        <div className="flex items-center gap-2">
          <RiGithubFill className="h-5 w-5" />
          <span className="text-secondary inline-block truncate">
            {repositoryName ?? 'Repository N/A'}
          </span>
        </div>
      </div>
    </div>
  );
}
