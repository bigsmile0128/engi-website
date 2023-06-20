import React, { useState } from 'react';
import classNames from 'classnames';

import Button from '~/components/global/Button/Button';
import ShareModal from '../ShareModal';
import ActivityStats from './ActivityStats';
import { Bit } from '~/types';
import GetStarted from '../GetStarted';
import BitCreator from '../BitCreator';
import RepositoryInfo from '../RepositoryInfo';
import { useUser } from '~/utils/contexts/userContext';
import BountyStatus from '~/components/BountyStatus';

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
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useUser();

  return (
    <div className={classNames('flex flex-col overflow-hidden', className)}>
      <ShareModal isOpen={modalOpen} setIsOpen={setModalOpen} />
      <BountyStatus
        attemptCount={data?.attemptCount}
        created={data?.createdOn?.dateTime}
        creator={data?.creator}
        id={data?.id}
        isLoading={isLoading}
        solution={data?.solution}
        status={data?.status}
        userId={user?.walletId}
      />
      <BitCreator className="mt-8" isLoading={isLoading} data={data?.creator} />
      <div className="my-8 w-full border-t border-gray-400 opacity-50" />
      <RepositoryInfo
        className=""
        organizationName={data?.repository?.organization}
        repositoryName={data?.repository?.fullName}
        isLoading={isLoading}
      />
      <div className="my-12 w-full border-t border-gray-400 opacity-50" />
      <ActivityStats className="sm:px-6" isLoading={isLoading} data={data} />
      <Button className="mt-16" onClick={() => setModalOpen(true)}>
        Share
      </Button>
    </div>
  );
}
