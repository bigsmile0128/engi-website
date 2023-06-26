'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  RiLineChartFill,
  RiSettingsLine,
  RiUserLine,
  RiWallet3Line,
} from 'react-icons/ri';
import { isCurrentUser } from '~/app/(user)/engineer/[accountId]/utils';
import EngiIcon from '~/components/global/icons/EngiIcon';
import { useUser } from '~/utils/contexts/userContext';

type SidebarProps = {
  accountId: string;
  className?: string;
};

const items = [
  {
    name: 'Profile',
    path: '',
    icon: <RiUserLine className="h-6 w-auto" />,
  },
  {
    name: 'Wallet',
    path: '/wallet',
    icon: <RiWallet3Line className="h-6 w-auto" />,
  },
  {
    name: 'Bounties',
    path: '/bounties',
    icon: <EngiIcon className="h-4 w-auto" />,
  },
  {
    name: 'Stats',
    path: '/stats',
    icon: <RiLineChartFill className="h-6 w-auto" />,
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: <RiSettingsLine className="h-6 w-auto" />,
  },
];

export default function Sidebar({ className, accountId }: SidebarProps) {
  const pathname = usePathname() ?? '';
  const activePath = pathname.replace(`/engineer/${accountId}`, '');
  const { user } = useUser();

  // only show settings if it is the current user
  let navItems;
  if (isCurrentUser(accountId, user)) {
    navItems = items.filter((item) => item.path !== '/settings');
  } else {
    navItems = items;
  }

  return (
    <div
      className={classNames(
        'shrink-0 flex-col justify-start gap-4 bg-secondary/40 backdrop-blur-[100px] w-[200px] pt-4 pb-24',
        className
      )}
    >
      {navItems.map(({ name, icon, path }) => (
        <Link
          key={name}
          className={classNames(
            'flex items-center gap-4 px-6 py-3 border-l-2 hover:text-green-primary',
            path === activePath
              ? 'font-bold text-green-primary border-green-primary'
              : 'border-transparent'
          )}
          href={`/engineer/${accountId}${path}`}
        >
          {icon}
          <span>{name}</span>
        </Link>
      ))}
    </div>
  );
}
