'use client';

import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MdModeEdit } from 'react-icons/md';
import ProfileModal from '~/app/(user)/engineer/[accountId]/ProfileModal';
import TechnologyIcon from '~/components/TechnologyIcon';
import UserAvatar from '~/components/UserAvatar';
import { Engineer } from '~/types';

type UserInfoProps = {
  accountId: string;
  className?: string;
  data: Engineer;
};

export default function UserInfo({
  className,
  data,
  accountId,
}: UserInfoProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div
      className={classNames(
        'flex items-start gap-x-12',
        'bg-secondary/10 backdrop-blur-[100px] p-8',
        className
      )}
    >
      <ProfileModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        data={data}
        onSuccess={() => router.refresh()}
      />
      <div className="shrink-0">
        <UserAvatar
          profileImageUrl={data.profileImageUrl}
          size={96}
          walletId={data.address}
        />
      </div>
      <div className="flex flex-col items-start overflow-hidden">
        <span className="font-bold text-2xl truncate w-full">
          {data.displayName ?? data.address}
        </span>
        <div className="flex items-center gap-x-8 mt-4">
          {data.technologies?.map((technology) => (
            <TechnologyIcon
              key={technology}
              className="h-8 w-8 text-white/80"
              value={technology}
            />
          ))}
        </div>
      </div>
      {accountId === 'me' && (
        <button
          className="ml-auto text-white/80 hover:text-green-primary focus-green-primary"
          onClick={() => setIsModalOpen(true)}
        >
          <MdModeEdit className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
