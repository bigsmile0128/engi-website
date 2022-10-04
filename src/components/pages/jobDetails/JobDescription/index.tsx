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
  const {
    isLoading: isLoadingDescription,
    isError,
    data: description,
  } = useQuery(['jobDescription', data?.id], () => {
    // TODO: remove regex after schema is updated with ENGIN-520
    const url = data.repository?.url;
    // const url = 'https://github.com/ravendb/ravendb';
    const urlMatch = url.match(/github\.com\/(.*?)\/(.*)$/);
    if (!urlMatch) {
      return null;
    }
    const owner = urlMatch[1];
    const name = urlMatch[2];
    return fetchReadme({ owner, name });
  });

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
        <LanguageTag value={data?.language} isLoading={isLoading} />
      </p>
      <div className="mt-8 w-full border-t border-white/30" />
      {isLoading || isLoadingDescription ? (
        <TextSkeleton className="mt-4 gap-y-2" />
      ) : isError || !description ? (
        <div className="mt-4 text-xl text-secondary">
          Unable to load job description.
        </div>
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

async function fetchReadme({ owner, name }) {
  const response = await axios.get(`/api/repos/${owner}/${name}/readme`);
  return response.data;
}
