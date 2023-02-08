import React from 'react';
import classNames from 'classnames';
import CopyLink from '~/components/CopyLink';
import Link from 'next/link';

type GetStartedProps = {
  bitId?: string;
  className?: string;
};

export default function GetStarted({ className, bitId }: GetStartedProps) {
  return (
    <div
      className={classNames('bg-secondary/10 backdrop-blur-[200px]', className)}
    >
      <div
        className={classNames(
          'max-w-page flex flex-col py-6 gap-y-4 desktop:px-6',
          'tablet:flex-row desktop:flex-col',
          'flex-row tablet:items-center desktop:items-start justify-between'
        )}
      >
        <div className="flex flex-col">
          <span className="font-grifter text-xl text-green-primary">
            Ready to get started?
          </span>
          <span className="text-secondary mt-1">
            Copy the command to your clipboard.
          </span>
        </div>
        <div>
          <CopyLink
            className=""
            value={
              typeof window !== 'undefined'
                ? `docker compose run cli engi job get ${bitId} | tee /tmp/demo-csharp-job.json`
                : ''
            }
          />
          <span className="font-medium text-xs mt-2">
            First time starting a job? Check out our{' '}
            <Link
              href="https://button-produce-60a.notion.site/Engi-Cookbook-68c2d1347ecd499d8901ae387829ba10"
              className="underline hover:text-green-primary"
            >
              documentation
            </Link>
            .
          </span>
        </div>
      </div>
    </div>
  );
}
