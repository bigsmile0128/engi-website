import Avvvatars from 'avvvatars-react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import Link from 'next/link';
import pluralize from 'pluralize';
import { ImSpinner } from 'react-icons/im';
import {
  RiCheckFill,
  RiFlashlightFill,
  RiIndeterminateCircleFill,
  RiTrophyFill,
} from 'react-icons/ri';
import { BitStatus, Solution, Submission } from '~/types';
import { COOKBOOK_LINK } from '~/utils/links';
import CopyLink from '../CopyLink';
import SubmissionStages from './SubmissionStages';

type BountyStatusProps = {
  attemptCount?: number;
  className?: string;
  created?: string;
  creator?: string;
  currentUserSubmission?: Submission;
  id?: string;
  isLoading?: boolean;
  solution?: Solution;
  status?: BitStatus;
  userId?: string;
};

export default function BountyStatus({
  attemptCount,
  className,
  created,
  creator,
  currentUserSubmission,
  id,
  isLoading,
  solution,
  status,
  userId,
}: BountyStatusProps) {
  const isCreator = creator === userId;
  const submissionStatus = currentUserSubmission?.status;

  return (
    <div
      className={classNames(
        'inline-block bg-secondary/80 backdrop-blur-[100px] p-6',
        className
      )}
    >
      {isLoading ? (
        <div className="w-full children:skeleton flex flex-col gap-2">
          <div className="whitespace-pre"> </div>
          <div className="whitespace-pre w-3/4"> </div>
          <div className="whitespace-pre w-3/4"> </div>
        </div>
      ) : isCreator ? (
        <div className="flex items-center gap-4">
          <div
            className="shrink-0 h-12 w-12 grid place-items-center border border-white/20 rounded-full"
            style={{
              background:
                'linear-gradient(97.66deg, rgba(255, 255, 255, 0.1) 8%, rgba(255, 255, 255, 0) 92.75%)',
            }}
          >
            {status === BitStatus.COMPLETE ? (
              <RiCheckFill className="h-6 w-auto text-green-primary" />
            ) : status == BitStatus.ACTIVE ? (
              <RiFlashlightFill className="h-6 w-auto text-purple-primary" />
            ) : (
              <RiIndeterminateCircleFill className="h-6 w-auto text-white/30" />
            )}
          </div>
          <div className="flex flex-col gap-1">
            <span className="-mb-1 font-grifter text-xl">
              {status === BitStatus.COMPLETE
                ? 'Bounty completed'
                : `Posted ${dayjs(created).fromNow()}`}
            </span>
            <span className="flex items-center gap-2 text-secondary text-sm">
              {status === BitStatus.COMPLETE ? (
                <>
                  {/* TODO: use Solution.author.profileImageUrl after blocker */}
                  {/* https://linear.app/engi/issue/ENGIN-1212/references-to-author-or-user-to-include-additional-information */}
                  <Avvvatars value="Test User" size={24} />
                  <Link
                    href={solution?.patchUrl ?? ''}
                    className="font-medium underline"
                  >
                    View pull request
                  </Link>
                </>
              ) : status === BitStatus.ACTIVE ? (
                pluralize('attempt', attemptCount, true)
              ) : (
                'No activity'
              )}
            </span>
          </div>
        </div>
      ) : status === BitStatus.COMPLETE ? (
        <div className="flex items-start gap-4">
          <div
            className="shrink-0 h-12 w-12 grid place-items-center border border-white/20 rounded-full"
            style={{
              background:
                'linear-gradient(97.66deg, rgba(255, 255, 255, 0.1) 8%, rgba(255, 255, 255, 0) 92.75%)',
            }}
          >
            {userId === solution?.author ? (
              <RiTrophyFill className="h-6 w-auto text-green-primary" />
            ) : (
              <RiCheckFill className="h-6 w-auto text-green-primary" />
            )}
          </div>
          <span className="-mb-1 font-grifter text-xl max-w-[300px]">
            {userId === solution?.author?.Id
              ? 'You have completed the bounty'
              : 'Bounty completed'}
          </span>
        </div>
      ) : currentUserSubmission ? (
        // is user
        <div className="flex items-start gap-4">
          <div className="relative">
            {/* TODO: update with user profile icon */}
            <Avvvatars value={userId ?? ''} size={48} />
            {submissionStatus === 'ANALYZING' && (
              <div className="absolute right-1 bottom-1 bg-[#424031] rounded-full p-1 translate-x-1/3 translate-y-1/3">
                <ImSpinner className="h-4 w-auto text-green-primary animate-spin-slow" />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <span className="-mb-1 font-grifter text-xl max-w-[300px]">
              {submissionStatus === 'ANALYZING'
                ? "You have made a submission! It's being analyzed."
                : 'You are currently working on this bounty'}
            </span>
            {status === BitStatus.ACTIVE && (
              <div className="flex flex-col">
                <SubmissionStages stages={currentUserSubmission.stages} />
              </div>
            )}
          </div>
        </div>
      ) : (
        // user has not submitted anything
        <div className="flex flex-col gap-y-4">
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
                  ? `docker compose run cli engi job get ${id} | tee /tmp/demo-csharp-job.json`
                  : ''
              }
            />
            <span className="font-medium text-xs mt-2">
              First time starting a job? Check out our{' '}
              <Link
                href={COOKBOOK_LINK}
                className="underline hover:text-green-primary"
              >
                documentation
              </Link>
              .
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
