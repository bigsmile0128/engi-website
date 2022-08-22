import React from 'react';
import classNames from 'classnames';
import { Job } from 'types';
import Tag from 'components/Tag';
import dayjs from 'dayjs';
import { SiPython } from '@react-icons/all-files/si/SiPython';
import TextSkeleton from 'components/TextSkeleton';
import Payout from './Payout';
import Effort from './Effort';
import CopyLink from 'components/CopyLink';
import Markdown from 'components/Markdown';

type JobDescriptionProps = {
  className?: string;
  isLoading?: boolean;
  job?: Job;
};

export default function JobDescription({
  className,
  isLoading,
  job,
}: JobDescriptionProps) {
  return (
    <div className={classNames('flex flex-col items-start', className)}>
      <p className={classNames('', isLoading ? 'skeleton' : 'text-secondary')}>
        {`Posted ${dayjs(job?.created).fromNow()}`}
      </p>
      <h2
        className={classNames(
          'mt-8 font-grifter text-xl',
          isLoading ? 'skeleton' : ''
        )}
      >
        Language required
      </h2>
      <p
        className={classNames(
          'mt-4 flex-flex-wrap gap-4',
          isLoading ? 'children:skeleton children:rounded-none' : ''
        )}
      >
        <Tag>
          <SiPython className="text-orange-primary mr-2" /> <span>Python</span>
        </Tag>
      </p>
      <div className="mt-8 w-full border-t border-white/30" />
      {isLoading ? (
        <TextSkeleton className="mt-4 gap-y-2" />
      ) : (
        <>
          <Markdown className="">{job?.description}</Markdown>
        </>
      )}
      <Payout className="mt-8" isLoading={isLoading} />
      <Effort className="mt-8" isLoading={isLoading} />
      <div className="mt-8 grid sm:grid-cols-2 w-full gap-x-4 gap-y-6">
        <div className="flex flex-col gap-y-2">
          <h2 className="font-grifter text-xl">Job Link</h2>
          <CopyLink
            value={typeof window !== 'undefined' ? window.location.href : ''}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <h2 className="font-grifter text-xl">Repo Link</h2>
          <CopyLink
            value={typeof window !== 'undefined' ? window.location.href : ''}
          />
        </div>
      </div>
    </div>
  );
}
