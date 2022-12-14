import React, { useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { HiOutlineChevronLeft } from '@react-icons/all-files/hi/HiOutlineChevronLeft';
import ShareModal from './ShareModal';
import { IoMdShareAlt } from '@react-icons/all-files/io/IoMdShareAlt';
import { Job } from '~/types';
import Button from '~/components/global/Button/Button';

type JobHeaderProps = {
  className?: string;
  data?: Job;
  isLoading?: boolean;
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
            'inline-flex items-center font-grifter text-3xl pl-4 pr-2 md:basis-3/5 lg:basis-auto flex-1 overflow-hidden',
            isLoading ? 'skeleton mx-2' : ''
          )}
        >
          <span className="mt-2 inline-block truncate">
            {isLoading ? 'Placeholder' : data?.name}
          </span>
          <button className="ml-2" onClick={() => setModalOpen(true)}>
            <IoMdShareAlt className="h-6 w-6" />
          </button>
        </h1>
        <Button
          variant="primary"
          className={classNames(
            'ml-8 self-end whitespace-nowrap !px-12',
            'hidden md:block lg:hidden'
          )}
          isLoading={isLoading}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}
