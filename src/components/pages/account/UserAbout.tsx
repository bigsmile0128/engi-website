import React from 'react';
import classNames from 'classnames';
import { RiDiscordFill, RiTwitterFill } from 'react-icons/ri';
import { MdLaptop } from 'react-icons/md';

type UserAboutProps = {
  className?: string;
};

export default function UserAbout({ className }: UserAboutProps) {
  return (
    <div
      className={classNames(
        'flex flex-col items-start gap-y-8',
        'bg-secondary/10 backdrop-blur-[100px] p-8',
        className
      )}
    >
      <span className="font-bold text-2xl">About</span>
      <div>
        <span className="font-medium text-xl">Social Media</span>
        <div className="mt-4 flex items-start flex-col gap-y-4 tablet:flex-row tablet:items-center gap-x-12">
          <div className="flex items-center gap-2">
            <RiTwitterFill className="h-6 w-6" />
            <span className="font-medium text-secondary">
              https://twitter.com/engi
            </span>
          </div>
          <div className="flex items-center gap-2">
            <RiDiscordFill className="h-6 w-6" />
            <span className="font-medium text-secondary">
              https://discord.com/engi
            </span>
          </div>
        </div>
      </div>
      <div>
        <span className="font-medium text-xl">Type of user</span>
        <div className="mt-4 flex items-center gap-2">
          <MdLaptop className="h-6 w-6" />
          <span className="font-medium text-secondary">Freelancer</span>
        </div>
      </div>
    </div>
  );
}
