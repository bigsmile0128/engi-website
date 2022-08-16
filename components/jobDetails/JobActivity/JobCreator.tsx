import React from 'react';
import classNames from 'classnames';
import Image from 'next/future/image';

import avatarImg from 'public/img/jobDetails/avatar.png';
import polygonImg from 'public/img/jobDetails/polygon.png';
import { MdVerifiedUser } from '@react-icons/all-files/md/MdVerifiedUser';
import { RiGithubFill } from 'react-icons/ri';

type JobCreatorProps = {
  className?: string;
  isLoading?: boolean;
};

export default function JobCreator({ className, isLoading }: JobCreatorProps) {
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
        <span className="font-grifter text-xl -mb-1">Author946</span>
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
        <span className="col-start-2 font-grifter text-xl">Polkadot</span>
        <div className="col-start-2 row-start-2 flex items-center gap-x-2">
          <RiGithubFill />
          <span className="text-secondary">@polkadot/website</span>
        </div>
      </div>
      <div className={classNames('flex flex-col mt-8 items-start')}>
        <span
          className={classNames(
            'font-grifter text-xl',
            isLoading ? 'skeleton' : ''
          )}
        >
          About job creator
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
          <li className="text-secondary">100 jobs posted</li>
          <li className="text-secondary">100 jobs solved</li>
          <li className="text-secondary">Member since Jul 19, 2022</li>
        </ul>
      </div>
    </div>
  );
}
