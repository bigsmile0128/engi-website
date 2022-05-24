import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

import LogoSvg from './logo.svg';
import LogoAltSvg from './logo_alt.svg';
import { SiDiscord, SiLinkedin, SiTiktok, SiTwitter } from 'react-icons/si';

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <div
      className={classNames(
        'bg-[#070706bb] flex items-center justify-center px-12 py-16 xs:py-6',
        className
      )}
    >
      <div className="w-full max-w-3xl lg:max-w-4xl flex flex-col xs:flex-row items-center justify-between gap-x-12 sm:gap-x-16">
        <LogoSvg className="h-8 fill-emerald-300 shrink-0 hidden xs:block" />
        <LogoAltSvg className="h-10 mb-12 block xs:hidden" />
        <div className="flex items-center gap-x-8">
          <button className="p-2 text-2xl hover:text-gray-300">
            <SiDiscord />
          </button>
          <button className="p-2 text-2xl hover:text-gray-300">
            <SiTiktok />
          </button>
          <button className="p-2 text-2xl hover:text-gray-300">
            <SiLinkedin />
          </button>
          <button className="p-2 text-2xl hover:text-gray-300">
            <SiTwitter />
          </button>
        </div>
      </div>
    </div>
  );
}
