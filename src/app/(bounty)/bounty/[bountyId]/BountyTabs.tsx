'use client';

import React, { useCallback } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type BountyTabsProps = {
  bountyId: string;
  className?: string;
};

export default function BountyTabs({ className, bountyId }: BountyTabsProps) {
  const pathname = usePathname() ?? '';
  const activePath = pathname.replace(`/bounty/${bountyId}`, '');
  const isActivePath = useCallback((path: string, activePath: string) => {
    return path === activePath || (path !== '' && activePath.startsWith(path));
  }, []);

  return (
    <div
      className={classNames(
        'flex w-full border-b border-white/30 gap-12 tablet:gap-16',
        className
      )}
    >
      {[
        { label: 'Description', path: '' },
        { label: 'Submissions', path: '/submission' },
        { label: 'Updates', path: '/update' },
      ].map(({ label, path }) => (
        <Link
          key={label}
          href={`/bounty/${bountyId}${path}`}
          className={classNames(
            'py-2 -mb-[1px]',
            'text-lg focus-green-primary',
            isActivePath(path, activePath)
              ? 'text-green-primary font-bold border-green-primary border-b-[3px]'
              : 'text-white/80'
          )}
        >
          <span>{label}</span>
        </Link>
      ))}
    </div>
  );
}
