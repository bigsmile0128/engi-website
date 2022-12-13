import classNames from 'classnames';
import dayjs from 'dayjs';
import CopyLink from '~/components/CopyLink';
import LanguageTag from '~/components/LanguageTag';
import Markdown from '~/components/Markdown';
import TextSkeleton from '~/components/TextSkeleton';
import { Job } from '~/types';
import Effort from './Effort';
import Payout from './Payout';

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
  const description = data?.repository?.readme;
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
      <div
        className={classNames(
          'mt-8 grid sm:grid-cols-2 w-full gap-x-4 gap-y-6',
          isLoading ? 'children:children:skeleton' : ''
        )}
      >
        <div className="flex flex-col gap-y-2">
          <h2 className="font-grifter text-xl inline-block self-start">
            Job Link
          </h2>
          <CopyLink
            className="!rounded-none"
            value={typeof window !== 'undefined' ? window.location.href : ''}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <h2 className="font-grifter text-xl inline-block self-start">
            Repo Link
          </h2>
          <CopyLink
            className="!rounded-none"
            value={data?.repository?.url ?? ''}
          />
        </div>
      </div>
    </div>
  );
}
