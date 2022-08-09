import React from 'react';
import classNames from 'classnames';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/outline';
import axios from 'axios';
import { useQuery } from 'react-query';
import Link from 'next/link';
import TimeEstimate from 'components/TimeEstimate';
import EngiIcon from 'components/icons/EngiIcon';

type RecommendedJobsProps = {
  className?: string;
};

export default function RecommendedJobs({ className }: RecommendedJobsProps) {
  const { isLoading, data } = useQuery(
    ['fetchRecommendedJobs'],
    fetchRecommendedJobs
  );

  return (
    <div className={classNames('', className)}>
      <Disclosure defaultOpen>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex items-center gap-x-2 mb-4">
              <h2 className="font-grifter text-2xl inline -mb-1">
                Recommended
              </h2>
              {/*
              Use the `open` render prop to rotate the icon when the panel is open
            */}
              <ChevronUpIcon
                className={classNames(
                  'h-5 w-5 mb-1',
                  open ? 'transform rotate-180' : ''
                )}
              />
            </Disclosure.Button>
            <Transition
              show={open}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel>
                {isLoading ? (
                  <div className="flex items-center gap-x-4 md:justify-between">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <JobCard
                        key={i}
                        className={classNames(
                          'shrink-0 flex-1 h-[215px]',
                          // only display enough cards to fit view
                          i === 1 ? 'hidden sm:flex' : '',
                          i === 2 ? 'hidden md:flex' : '',
                          i === 3 ? 'hidden lg:flex' : '',
                          i === 4 ? 'hidden xl:flex' : ''
                        )}
                        isSkeleton
                      />
                    ))}
                  </div>
                ) : data?.length > 0 ? (
                  <div className="flex items-center gap-x-4 md:justify-between">
                    {data.map((job, i) => (
                      <JobCard
                        key={job.id}
                        className={classNames(
                          'shrink-0 flex-1 h-[215px]',
                          // only display enough cards to fit view
                          i === 1 ? 'hidden sm:flex' : '',
                          i === 2 ? 'hidden md:flex' : '',
                          i === 3 ? 'hidden lg:flex' : '',
                          i === 4 ? 'hidden xl:flex' : '',
                          i >= 5 ? 'hidden' : ''
                        )}
                        {...job}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-secondary">No current jobs.</p>
                )}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
}

async function fetchRecommendedJobs() {
  const response = await axios.get('/api/jobs/recommended');
  return response.data;
}

type JobCardProps = {
  className?: string;
  id?: string;
  title?: string;
  timeEstimate?: number;
  reward?: number;
  isSkeleton?: boolean;
};

function JobCard({
  className,
  id,
  title,
  timeEstimate,
  reward,
  isSkeleton,
}: JobCardProps) {
  return (
    <Link href={isSkeleton ? '' : `/jobs/${id}`}>
      <a
        className={classNames(
          'flex flex-col p-6 gap-y-2 items-start',
          'bg-black/[.14] hover:bg-black/40',
          isSkeleton ? 'pointer-events-none' : '',
          className
        )}
      >
        <span
          className={classNames(
            'px-4 py-1 rounded-full',
            'whitespace-nowrap text-sm',
            isSkeleton ? 'skeleton' : 'bg-[#EFEFEF]/[.13]'
          )}
        >
          Top Activity
        </span>
        <TimeEstimate
          className={isSkeleton ? 'skeleton' : ''}
          duration={`${timeEstimate} hours`}
        />
        <span className={classNames('font-bold', isSkeleton ? 'skeleton' : '')}>
          {title}
        </span>
        <Reward className="mt-auto" value={reward} isSkeleton={isSkeleton} />
      </a>
    </Link>
  );
}

type RewardProps = {
  className?: string;
  value?: number;
  isSkeleton?: boolean;
};

function Reward({ className, value, isSkeleton }: RewardProps) {
  return (
    <div
      className={classNames(
        'flex items-end whitespace-nowrap',
        isSkeleton ? 'children:skeleton' : '',
        className
      )}
    >
      <EngiIcon className="h-4 w-auto text-green-primary mb-1" />
      <span
        className={classNames(
          'ml-1 font-grifter text-3xl',
          isSkeleton ? 'h-8' : '-mb-[7px]'
        )}
      >
        {isSkeleton ? 100 : value}
      </span>
      <div className="flex items-center ml-4 text-white/60">
        <span>e</span>
        <span className="ml-0.5">{isSkeleton ? 100 : value + 30}</span>
      </div>
    </div>
  );
}
