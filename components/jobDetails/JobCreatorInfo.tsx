import React from 'react';
import classNames from 'classnames';
import { MdVerifiedUser } from '@react-icons/all-files/md/MdVerifiedUser';
import Image from 'next/image';

import avatarImg from './avatar.png';
import CopyLink from '../CopyLink';

interface JobCreatorInfoProps {
  className?: string;
  isLoading?: boolean;
}

export default function JobCreatorInfo({
  className,
  isLoading = false,
}: JobCreatorInfoProps) {
  return (
    <div className={classNames('p-6 flex flex-col bg-[#00000022]', className)}>
      <button className="p-4 text-black mb-8 font-bold bg-gray-300 hover:bg-gray-200 active:bg-gray-100 outline-none focus:ring-4">
        Get Started
      </button>
      <div
        className={classNames(
          'flex items-center gap-x-4',
          isLoading ? 'children:skeleton' : ''
        )}
      >
        <div>
          <Image
            src={avatarImg}
            alt="avatar"
            className={classNames('h-12 w-12 rounded-full')}
          />
        </div>
        <span className="font-bold">StrawberryJam419</span>
      </div>
      <div className="my-6 w-full border-t border-gray-400 opacity-50" />
      <div
        className={classNames(
          'flex flex-col',
          isLoading ? 'children:skeleton' : ''
        )}
      >
        <span className="font-bold mb-4">About job creator</span>
        <div className="flex items-center gap-x-2 mb-4">
          <MdVerifiedUser className="text-green-primary" size={24} />
          <span className="text-sm">Payment method verified</span>
        </div>
        <span className="text-sm text-gray-400 mb-1">97 jobs posted</span>
        <span className="text-sm text-gray-400 mb-0">
          Member since Jul 18, 2019
        </span>
      </div>
      <div className="my-6 w-full border-t border-gray-400 opacity-50" />
      <span className="font-bold mb-2">Job Link</span>
      <CopyLink
        value={typeof window !== 'undefined' ? window.location.href : ''}
      />
    </div>
  );
}
