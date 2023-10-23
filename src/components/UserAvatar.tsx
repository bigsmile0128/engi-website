import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import Avatar from './Avatar';

type UserAvatarProps = {
  className?: string;
  profileImageUrl?: string;
  size?: number;
  walletId: string;
};

export default function UserAvatar({
  className,
  profileImageUrl,
  size = 64,
  walletId,
}: UserAvatarProps) {
  if (profileImageUrl) {
    return (
      <Image
        className={classNames('rounded-full object-cover', className)}
        style={{ height: size, width: size }}
        src={profileImageUrl}
        height={size}
        width={size}
        alt="user-avatar"
      />
    );
  }

  return (
    <div className={classNames('', className)}>
      <Avatar size={size} style="shape" value={walletId} />
    </div>
  );
}
