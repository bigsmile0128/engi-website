import React, { useState } from 'react';
import classNames from 'classnames';
import { MdCheck, MdVerifiedUser } from 'react-icons/md';
import { RiFileCopyLine } from 'react-icons/ri';
import copy from 'copy-to-clipboard';
import ReactTooltip from 'react-tooltip';

import avatarImg from './avatar.png';

interface JobCreatorInfoProps {
  className?: string;
  isLoading?: boolean;
}

export default function JobCreatorInfo({
  className,
  isLoading = false,
}: JobCreatorInfoProps) {
  const [copied, setCopied] = useState(false);
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
        <span className="font-bold mb-4">About job creator</span>
        <div className="flex items-center gap-x-2 mb-4">
          <MdVerifiedUser className="text-emerald-300" size={24} />
          <span className="text-sm">Payment method verified</span>
        </div>
        <span className="text-sm text-gray-400 mb-1">97 jobs posted</span>
        <span className="text-sm text-gray-400 mb-0">
          Member since Jul 18, 2019
        </span>
      </div>
      <div className="my-6 w-full border-t border-gray-400 opacity-50" />
      <span className="font-bold mb-2">Job Link</span>
      <div className="flex border border-gray-400">
        <input
          type="text"
          disabled
          value={window.location.href}
          className="flex-1 p-3 pr-0 bg-transparent text-gray-300 text-sm truncate"
        />
        <button
          className="p-2 bg-transparent focus:ring-2 outline-none"
          onClick={() => {
            copy(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          data-tip="Copy Link"
          data-for="test"
        >
          {copied ? (
            <MdCheck className="text-emerald-300" size={24} />
          ) : (
            <RiFileCopyLine className="text-emerald-300" size={24} />
          )}
        </button>
        <ReactTooltip
          id="test"
          effect="solid"
          getContent={() => (copied ? 'Copied' : 'Copy Link')}
        />
      </div>
    </div>
  );
}
