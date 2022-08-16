import React from 'react';
import classNames from 'classnames';
import { Job } from 'types';
import Tag from 'components/Tag';
import dayjs from 'dayjs';
import { SiPython } from '@react-icons/all-files/si/SiPython';
import TextSkeleton from 'components/TextSkeleton';
import Payout from './Payout';
import Effort from './Effort';

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
        Languages required
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
      <h2
        className={classNames(
          'mt-8 font-grifter text-xl',
          isLoading ? 'skeleton' : ''
        )}
      >
        Job Description
      </h2>
      {isLoading ? (
        <TextSkeleton className="mt-4 gap-y-2" />
      ) : (
        <p className="mt-4 text-secondary leading-7">{job?.description}</p>
      )}
      <Payout className="mt-8" isLoading={isLoading} />
      <Effort className="mt-8" isLoading={isLoading} />
    </div>
  );
}
