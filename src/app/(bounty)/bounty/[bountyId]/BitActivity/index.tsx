'use client';

import classNames from 'classnames';

import BountyStatus from '~/components/BountyStatus';
import { Bit } from '~/types';
import { useUser } from '~/utils/contexts/userContext';
import BitCreator from '../BitCreator';
import RepositoryInfo from '../RepositoryInfo';
import ActivityStats from './ActivityStats';

interface BitActivityProps {
  bitId: string;
  className?: string;
  data?: Bit;
  isLoading?: boolean;
}

export default function BitActivity({
  bitId,
  className,
  isLoading,
  data,
}: BitActivityProps) {
  const { user } = useUser();

  return (
    <div className={classNames('flex flex-col overflow-hidden', className)}>
      <div className="bg-secondary/40">
        <BountyStatus
          className="w-full px-12 py-8"
          attemptCount={data?.attemptCount}
          created={data?.createdOn?.dateTime}
          creator={data?.creator}
          id={data?.id}
          isLoading={isLoading}
          solution={data?.solution}
          status={data?.status}
          userId={user?.walletId}
        />
        <ActivityStats className="p-12" isLoading={isLoading} data={data} />
      </div>
      <div className="mt-8 px-12 py-8 bg-secondary/40">
        <BitCreator className="" isLoading={isLoading} data={data?.creator} />
        <div className="my-8 w-full border-t border-white/30" />
        <RepositoryInfo
          className=""
          organizationName={data?.repository?.organization}
          repositoryName={data?.repository?.fullName}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
