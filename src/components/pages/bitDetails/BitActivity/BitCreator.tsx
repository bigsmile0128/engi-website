import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';

import avatarImg from 'public/img/bitDetails/avatar.png';
import polygonImg from 'public/img/bitDetails/polygon.png';
import { MdVerifiedUser } from '@react-icons/all-files/md/MdVerifiedUser';
import { RiGithubFill } from 'react-icons/ri';

type BitCreatorProps = {
  className?: string;
  isLoading?: boolean;
};

export default function BitCreator({ className, isLoading }: BitCreatorProps) {
  return (
    <div className={classNames('', className)}>
      <div
        className={classNames(
          'flex items-center gap-x-4',
          isLoading ? 'children:skeleton' : ''
        )}
      >
        <div>
          <Image src={avatarImg} alt="avatar" className="h-[48px] w-[48px]" />
        </div>
        <span className="font-grifter text-xl -mb-1">Author N/A</span>
      </div>
      <div className="my-8 w-full border-t border-gray-400 opacity-50" />
      <div
        className={classNames(
          'grid grid-cols-[48px_1fr] gap-x-4 gap-y-1',
          isLoading ? 'children:skeleton' : ''
        )}
      >
        <div className="h-[48px] w-[48px] row-span-2">
          <Image
            className="h-[48px] w-[48px]"
            src={polygonImg}
            alt="organization"
          />
        </div>
        {/* TODO: replace with repo owner */}
        <span className="col-start-2 font-grifter text-xl">Repo Owner N/A</span>
        <div className="col-start-2 row-start-2 flex items-center gap-x-2">
          <RiGithubFill />
          {/* TODO: replace with owner/repo (e.g. @polkadot/website) */}
          <span className="text-secondary">repository N/A</span>
        </div>
      </div>
      <div className={classNames('flex flex-col mt-8 items-start')}>
        <span
          className={classNames(
            'font-grifter text-xl',
            isLoading ? 'skeleton' : ''
          )}
        >
          About bounty creator
        </span>
        <div
          className={classNames(
            'flex items-center gap-x-2 mt-6',
            isLoading ? 'children:skeleton' : ''
          )}
        >
          <MdVerifiedUser className="text-[#BA54EC]" size={24} />
          <span className="">Payment method verified</span>
        </div>
        <ul
          className={classNames(
            'list-disc list-inside mt-2 children:mt-4',
            isLoading ? 'children:skeleton' : ''
          )}
        >
          <li className="text-secondary">N/A bounties posted</li>
          <li className="text-secondary">N/A bounties solved</li>
          <li className="text-secondary">Member since N/A</li>
        </ul>
      </div>
    </div>
  );
}
