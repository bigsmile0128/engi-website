import React, { useState } from 'react';
import classNames from 'classnames';

import Button from 'components/Button';
import ShareModal from '../ShareModal';
import JobCreator from './JobCreator';

interface JobActivityProps {
  className?: string;
  isLoading?: boolean;
}

export default function JobActivity({
  className,
  isLoading,
}: JobActivityProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className={classNames('flex flex-col', className)}>
      <ShareModal isOpen={modalOpen} setIsOpen={setModalOpen} />
      <Button variant="primary">Get Started</Button>
      <JobCreator
        className="mx-auto mt-8 lg:px-10 w-full lg:w-96"
        isLoading={isLoading}
      />
      <div className="my-12 w-full border-t border-gray-400 opacity-50" />
      <Button onClick={() => setModalOpen(true)}>Share</Button>
    </div>
  );
}
