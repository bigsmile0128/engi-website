import React from 'react';
import classNames from 'classnames';
import Avvvatars from 'avvvatars-react';
import { RiGitBranchFill, RiGitCommitFill, RiGithubFill } from 'react-icons/ri';

type RepositoryInfoProps = {
  branch?: string;
  className?: string;
  commit?: string;
  organizationName?: string;
  repositoryName?: string;
};

export default function RepositoryInfo({
  className,
  repositoryName,
  organizationName,
  branch,
  commit,
}: RepositoryInfoProps) {
  return (
    <div
      className={classNames(
        'flex items-start gap-2 overflow-hidden',
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
      <div className="flex flex-col gap-0.5 overflow-hidden">
        <span className="font-grifter text-xl inline-block truncate">
          {organizationName ?? 'Author N/A'}
        </span>
        <div className="flex items-center gap-2 overflow-hidden">
          <RiGithubFill className="h-5 w-5" />
          <span className="text-secondary inline-block truncate">
            {repositoryName ?? 'Repository N/A'}
          </span>
        </div>
        {branch && (
          <div className="flex items-center gap-2 overflow-hidden">
            <RiGitBranchFill className="h-5 w-5" />
            <span className="text-secondary inline-block truncate">
              {branch}
            </span>
          </div>
        )}
        {commit && (
          <div className="flex items-center gap-2 overflow-hidden">
            <RiGitCommitFill className="h-5 w-5 shrink-0" />
            <span className="text-secondary inline-block truncate">
              {commit}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
