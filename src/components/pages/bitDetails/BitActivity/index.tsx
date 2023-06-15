import React, { useState } from 'react';
import classNames from 'classnames';

import Button from '~/components/global/Button/Button';
import ShareModal from '../ShareModal';
import ActivityStats from './ActivityStats';
import { Bit } from '~/types';
import GetStarted from '../GetStarted';
import BitCreator from '../BitCreator';
import RepositoryInfo from '../RepositoryInfo';

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

  return (
    <div className={classNames('flex flex-col overflow-hidden', className)}>
      <ShareModal isOpen={modalOpen} setIsOpen={setModalOpen} />
      <GetStarted bitId={bitId} />
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
