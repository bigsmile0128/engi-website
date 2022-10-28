import React from 'react';
import classNames from 'classnames';
import { Job } from '~/types';
import dayjs from 'dayjs';
import TextSkeleton from '~/components/TextSkeleton';
import Payout from './Payout';
import Effort from './Effort';
import CopyLink from '~/components/CopyLink';
import Markdown from '~/components/Markdown';
import { useQuery } from 'react-query';
import axios from 'axios';
import LanguageTag from '~/components/LanguageTag';

type JobDescriptionProps = {
  className?: string;
  data?: Job;
  isLoading?: boolean;
};

export default function JobDescription({
  className,
  isLoading,
  data,
}: JobDescriptionProps) {
  const description = null;
  return (
    <div className={classNames('flex flex-col items-start', className)}>
      <p className={classNames('', isLoading ? 'skeleton' : 'text-secondary')}>
        {`Posted ${dayjs(data?.createdOn?.dateTime).fromNow()}`}
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
        <LanguageTag
          value={data?.language}
          isLoading={isLoading}
          iconClassName="text-orange-primary"
        />
      </p>
      <div className="mt-8 w-full border-t border-white/30" />
      {isLoading ? (
        <TextSkeleton className="mt-4 gap-y-2" />
      ) : !description ? (
        <div className="mt-4 text-xl text-secondary">Job Description N/A</div>
      ) : (
        <>
          <Markdown className="overflow-hidden break-words">
            {description}
          </Markdown>
        </>
      )}
      <Payout className="mt-8" isLoading={isLoading} data={data} />
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
          <CopyLink value={data?.repository?.url ?? ''} />
        </div>
      </div>
    </div>
  );
}
