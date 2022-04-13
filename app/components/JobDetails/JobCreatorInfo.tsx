import React from 'react';
import classNames from 'classnames';
import { MdVerifiedUser } from 'react-icons/md';

import CopyLink from '~/components/CopyLink';
import avatarImg from './avatar.png';

interface JobCreatorInfoProps {
  className?: string;
  isLoading?: boolean;
}

export default function JobCreatorInfo({
  className,
  isLoading = false,
}: JobCreatorInfoProps) {
  return (
    <div className={classNames('flex flex-col bg-[#00000022] p-6', className)}>
      <button className="mb-8 bg-gray-300 p-4 font-bold text-black outline-none hover:bg-gray-200 focus:ring-4 active:bg-gray-100">
        Get Started
      </button>
      <div
        className={classNames(
          'flex items-center gap-x-4',
          isLoading ? 'children:skeleton' : ''
        )}
      >
        <div>
          <img
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
        <span className="mb-4 font-bold">About job creator</span>
        <div className="mb-4 flex items-center gap-x-2">
          <MdVerifiedUser className="text-emerald-300" size={24} />
          <span className="text-sm">Payment method verified</span>
        </div>
        <span className="mb-1 text-sm text-gray-400">97 jobs posted</span>
        <span className="mb-0 text-sm text-gray-400">
          Member since Jul 18, 2019
        </span>
      </div>
      <div className="my-6 w-full border-t border-gray-400 opacity-50" />
      <span className="mb-2 font-bold">Job Link</span>
      <CopyLink value={window.location.href} />
    </div>
  );
}
