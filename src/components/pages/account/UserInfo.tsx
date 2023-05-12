import React from 'react';
import classNames from 'classnames';
import Avvvatars from 'avvvatars-react';
import { SiPython, SiRust, SiTypescript } from 'react-icons/si';
import { MdModeEdit } from 'react-icons/md';

type UserInfoProps = {
  accountId?: string;
  className?: string;
};

export default function UserInfo({ className, accountId }: UserInfoProps) {
  return (
    <div
      className={classNames(
        'flex items-start gap-x-12',
        'bg-secondary/10 backdrop-blur-[100px] p-8',
        className
      )}
    >
      <div className="shrink-0">
        <Avvvatars value={accountId ?? 'avatar'} style="shape" size={96} />
      </div>
      <div className="flex flex-col items-start">
        <span className="font-bold text-2xl">Bessie Cooper</span>
        <div className="flex items-center gap-x-8 mt-4">
          <SiRust className="h-8 w-8 text-white/80" />
          <SiPython className="h-8 w-8 text-white/80" />
          <SiTypescript className="h-8 w-8 text-white/80" />
        </div>
      </div>
      <button className="ml-auto text-white/80 hover:text-green-primary">
        <MdModeEdit className="h-5 w-5" />
      </button>
    </div>
  );
}
