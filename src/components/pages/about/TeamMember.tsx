import React from 'react';
import classNames from 'classnames';
import { HiUser } from '@react-icons/all-files/hi/HiUser';
import randomColor from 'randomcolor';

import AppleSvg from 'public/img/about/apple.svg';
import GoogleSvg from 'public/img/about/google.svg';
import AmazonSvg from 'public/img/about/amazon.svg';

type TeamMemberProps = {
  className?: string;
  name: string;
  role: string;
  companies: string[];
};

export default function TeamMember({
  className,
  name,
  role,
  companies,
}: TeamMemberProps) {
  const backgroundColor = randomColor({
    seed: name + companies.toString(),
    luminosity: 'light',
  });

  return (
    <div className={classNames('flex flex-col', className)}>
      <div
        className={classNames('h-32 flex items-center justify-center px-12')}
        style={{
          backgroundColor,
        }}
      >
        <HiUser size={80} />
      </div>
      <div className="flex flex-col p-4 bg-black/20 border border-white/30 border-t-0">
        <p className="text-green-primary">{role}</p>
        <p className="font-bold border-b border-white/30 pb-2 mb-2">{name}</p>
        <p className="whitespace-nowrap">Previously Building @</p>
        <div className="flex items-center gap-x-4 mt-2">
          {companies.includes('Apple') && <AppleSvg className="h-5" />}
          {companies.includes('Google') && <GoogleSvg className="h-5" />}
          {companies.includes('Amazon') && <AmazonSvg className="h-5" />}
        </div>
      </div>
    </div>
  );
}
