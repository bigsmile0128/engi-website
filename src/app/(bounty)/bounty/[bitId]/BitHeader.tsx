import React, { useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { HiOutlineChevronLeft } from '@react-icons/all-files/hi/HiOutlineChevronLeft';
import ShareModal from './ShareModal';
import { IoMdShareAlt } from '@react-icons/all-files/io/IoMdShareAlt';
import { Bit } from '~/types';

type BitHeaderProps = {
  className?: string;
  data?: Bit;
  isLoading?: boolean;
};

export default function BitHeader({
  className,
  isLoading,
  data,
}: BitHeaderProps) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <div className={classNames('max-w-page', className)}>
        <ShareModal isOpen={modalOpen} setIsOpen={setModalOpen} />
        <div className="flex items-center">
          <Link href="/bounty" passHref className="mr-2">
            <HiOutlineChevronLeft className="h-5 w-5 tablet:h-6 tablet:w-6" />
          </Link>
          <h1
            className={classNames(
              'inline-flex items-center font-grifter flex-1 overflow-hidden',
              'text-2xl tablet:text-3xl',
              'tablet:basis-3/5 desktop:basis-auto',
              isLoading ? 'skeleton mx-2' : ''
            )}
          >
            <span className="mt-2 inline-block truncate">
              {isLoading ? 'Placeholder' : data?.name}
            </span>
            <button
              className="ml-2 tablet:hidden desktop:block"
              onClick={() => setModalOpen(true)}
            >
              <IoMdShareAlt className="h-5 w-5 tablet:h-6 tablet:w-6" />
            </button>
          </h1>
        </div>
      </div>
      {/* MOBILE: bottom bar */}
      <div className="mt-4 w-full border-t border-white/30 tablet:hidden" />
    </>
  );
}
