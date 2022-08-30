import React, { useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { HiOutlineChevronLeft } from '@react-icons/all-files/hi/HiOutlineChevronLeft';
import ShareModal from './ShareModal';
import { IoMdShareAlt } from '@react-icons/all-files/io/IoMdShareAlt';
import { Job } from 'types';

type JobHeaderProps = {
  className?: string;
  isLoading?: boolean;
  data?: Job;
};

export default function JobHeader({
  className,
  isLoading,
  data,
}: JobHeaderProps) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className={classNames('', className)}>
      <ShareModal isOpen={modalOpen} setIsOpen={setModalOpen} />
      <div className="flex items-center">
        <Link href="/jobs" passHref>
          <a>
            <HiOutlineChevronLeft className="h-6 w-6" />
          </a>
        </Link>
        <h1
          className={classNames(
            'font-grifter text-3xl px-4',
            isLoading ? `skeleton mx-2` : ''
          )}
        >
          <span className="-mb-2 block">
            {isLoading ? 'Placeholder' : data?.name}
          </span>
        </h1>
        <button className="" onClick={() => setModalOpen(true)}>
          <IoMdShareAlt className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
