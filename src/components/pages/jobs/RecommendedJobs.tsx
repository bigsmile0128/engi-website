import React from 'react';
import classNames from 'classnames';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/outline';
import axios from 'axios';
import { useQuery } from 'react-query';
import Link from 'next/link';
import TimeEstimate from '~/components/TimeEstimate';
import EngiIcon from '~/components/global/icons/EngiIcon';

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
                        isLoading
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
  isLoading?: boolean;
  reward?: number;
  timeEstimate?: number;
  title?: string;
};

function JobCard({
  className,
  id,
  title,
  timeEstimate,
  reward,
  isLoading,
}: JobCardProps) {
  return (
    <Link
      href={isLoading ? '' : `/jobs/${id}`}
      className={classNames(
        'flex flex-col p-6 gap-y-2 items-start',
        'bg-black/[.14] hover:bg-black/40',
        isLoading ? 'pointer-events-none' : '',
        className
      )}
    >
      <span
        className={classNames(
          'px-4 py-1 rounded-full',
          'whitespace-nowrap text-sm',
          isLoading ? 'skeleton' : 'bg-[#EFEFEF]/[.13]'
        )}
      >
        Top Activity
      </span>
      <TimeEstimate
        className={isLoading ? 'skeleton' : ''}
        duration={`${timeEstimate} hours`}
      />
      <span className={classNames('font-bold', isLoading ? 'skeleton' : '')}>
        {title}
      </span>
      <Reward className="mt-auto" value={reward} isLoading={isLoading} />
    </Link>
  );
}

type RewardProps = {
  className?: string;
  isLoading?: boolean;
  value?: number;
};

function Reward({ className, value, isLoading }: RewardProps) {
  return (
    <div
      className={classNames(
        'flex items-end whitespace-nowrap',
        isLoading ? 'children:skeleton' : '',
        className
      )}
    >
      <EngiIcon className="h-4 w-auto text-green-primary mb-1" />
      <span
        className={classNames(
          'ml-1 font-grifter text-3xl',
          isLoading ? 'h-8' : '-mb-[7px]'
        )}
      >
        {isLoading ? 100 : value}
      </span>
    </div>
  );
}
