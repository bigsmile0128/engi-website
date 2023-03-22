import classNames from 'classnames';
import dayjs from 'dayjs';
import { useState } from 'react';
import {
  RiCheckboxCircleLine,
  RiGroupFill,
  RiLineChartFill,
} from 'react-icons/ri';
import CopyLink from '~/components/CopyLink';
import Button from '~/components/global/Button/Button';
import ProgressBar from '~/components/global/ProgressBar/ProgressBar';
import LanguageTag from '~/components/LanguageTag';
import Markdown from '~/components/Markdown';
import Statistic from '~/components/Statistic';
import TextSkeleton from '~/components/TextSkeleton';
import { Bit } from '~/types';
import BitCreator from '../BitCreator';
import GetStarted from '../GetStarted';
import RepositoryInfo from '../RepositoryInfo';
import ShareModal from '../ShareModal';
import Payout from './Payout';

type BitDescriptionProps = {
  className?: string;
  data?: Bit;
  isLoading?: boolean;
};

export default function BitDescription({
  className,
  isLoading,
  data,
}: BitDescriptionProps) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const description = data?.repository?.readme;

  return (
    <div className={classNames('flex flex-col items-start', className)}>
      <ShareModal isOpen={isShareModalOpen} setIsOpen={setIsShareModalOpen} />
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
      <h2
        className={classNames(
          'mt-8 font-grifter text-xl',
          isLoading ? 'skeleton' : ''
        )}
      >
        Bit Description
      </h2>
      {isLoading ? (
        <TextSkeleton className="mt-4 gap-y-2" />
      ) : !description ? (
        <div className="mt-4 text-xl text-secondary">N/A</div>
      ) : (
        <>
          <Markdown className="w-full mt-4">{description}</Markdown>
        </>
      )}
      <Payout className="mt-8" isLoading={isLoading} data={data} />
      {/* TABLET START */}
      <div className="hidden tablet:w-full tablet:flex tablet:flex-col desktop:hidden">
        <div className="mt-8 w-full border-t border-white/30" />
        <div
          className={classNames(
            'flex flex-col mt-8 p-6 w-full overflow-hidden',
            'bg-[#232323]/10 backdrop-blur-[100px]'
          )}
        >
          <div className="flex items-center justify-between gap-16">
            <BitCreator data={data?.creator} isLoading={isLoading} />
            <RepositoryInfo
              className="shrink-0"
              organizationName={data?.repository?.organization}
              repositoryName={data?.repository?.fullName}
              isLoading={isLoading}
            />
          </div>
          <div className="mt-8 w-full border-t border-white/30" />
          <h2
            className={classNames(
              'font-grifter text-xl mt-12 mb-6',
              isLoading ? 'skeleton' : ''
            )}
          >
            Activity
          </h2>
          <Statistic
            className="col-span-2"
            icon={<RiLineChartFill className="text-green-primary h-5 w-5" />}
            value="Average Progress"
            title={
              <ProgressBar
                className="w-full"
                percentage={
                  data?.averageProgress?.numerator ??
                  0 / (data?.averageProgress?.denominator ?? 1)
                }
                label={`${data?.averageProgress?.numerator ?? 0}/${
                  data?.averageProgress?.denominator ?? 0
                }`}
              />
            }
            isLoading={isLoading}
            inline
          />
          <div className="flex gap-8 mt-4">
            <Statistic
              className="col-span-1"
              icon={<RiGroupFill className="text-green-primary h-5 w-5" />}
              value={data?.solutionUserCount}
              title="Total Contributors"
              isLoading={isLoading}
            />
            <Statistic
              className="col-span-1"
              icon={
                <RiCheckboxCircleLine className="text-purple-primary h-5 w-5" />
              }
              value={data?.attemptCount}
              title="Total Submissions"
              isLoading={isLoading}
            />
          </div>
        </div>
        <Button
          className="self-center mt-8 px-32"
          isLoading={isLoading}
          onClick={() => setIsShareModalOpen(true)}
        >
          Share
        </Button>
        <div className="mt-8 w-full border-t border-white/30" />
      </div>
      {/* TABLET END */}
      {/* MOBILE START */}
      <div className="w-full mb-4 tablet:hidden">
        <div className="my-8 w-full border-t border-white/30" />
        <GetStarted bitId={data?.id} />
        <div className="mt-16 px-4">
          <BitCreator data={data?.creator} isLoading={isLoading} />
          <div className="my-8 w-full border-t border-white/30" />
          <RepositoryInfo
            className="shrink-0"
            organizationName={data?.repository?.organization}
            repositoryName={data?.repository?.fullName}
            isLoading={isLoading}
          />
          <h2
            className={classNames(
              'mt-24 mb-4 pb-4 font-grifter text-xl',
              'border-b border-white/30',
              isLoading ? 'skeleton' : ''
            )}
          >
            Activity
          </h2>
          <div className="flex flex-col gap-2">
            <Statistic
              icon={<RiLineChartFill className="text-green-primary h-5 w-5" />}
              value="Average Progress"
              title={
                <ProgressBar
                  className="w-full"
                  percentage={
                    data?.averageProgress?.numerator ??
                    0 / (data?.averageProgress?.denominator ?? 1)
                  }
                  label={`${data?.averageProgress?.numerator ?? 0}/${
                    data?.averageProgress?.denominator ?? 0
                  }`}
                />
              }
              isLoading={isLoading}
            />
            <Statistic
              icon={<RiGroupFill className="text-green-primary h-5 w-5" />}
              value={data?.solutionUserCount}
              title="Total Contributors"
              isLoading={isLoading}
            />
            <Statistic
              icon={
                <RiCheckboxCircleLine className="text-purple-primary h-5 w-5" />
              }
              value={data?.attemptCount}
              title="Total Submissions"
              isLoading={isLoading}
            />
          </div>
        </div>
        <Button
          className="w-full mt-12"
          isLoading={isLoading}
          onClick={() => setIsShareModalOpen(true)}
        >
          Share
        </Button>
        <div className="mt-8 w-full border-t border-white/30" />
      </div>
      {/* MOBILE END */}
      <div
        className={classNames(
          'mt-4 tablet:mt-8 grid tablet:grid-cols-2 w-full gap-x-4 gap-y-6',
          isLoading ? 'children:children:skeleton' : ''
        )}
      >
        <div className="flex flex-col gap-y-2">
          <h2 className="font-grifter text-xl inline-block self-start">
            Bit Link
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
