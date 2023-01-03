import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';

import { SiDiscord } from '@react-icons/all-files/si/SiDiscord';
import { SiTwitter } from '@react-icons/all-files/si/SiTwitter';
import { SiLinkedin } from '@react-icons/all-files/si/SiLinkedin';

type SocialMediaProps = {
  className?: string;
};

export default function SocialMedia({ className }: SocialMediaProps) {
  return (
    <div
      className={classNames('flex items-center gap-x-8 text-2xl', className)}
    >
      <Link
        href="https://discord.gg/S67BnJWN27"
        className="p-2 hover:text-gray-300"
        target="_blank"
        rel="noreferrer"
      >
        <SiDiscord />
      </Link>
      <Link
        href="https://linkedin.com/company/engi-network"
        className="p-2 hover:text-gray-300"
        target="_blank"
        rel="noreferrer"
      >
        <SiLinkedin />
      </Link>
      <Link
        href="https://twitter.com/engi_network"
        className="p-2 hover:text-gray-300"
        target="_blank"
        rel="noreferrer"
      >
        <SiTwitter />
      </Link>
    </div>
  );
}
