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
import EngiIcon from '~/components/global/icons/EngiIcon';

type AccountNavProps = {
  accountId?: string;
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
  // TODO: enable when data is available
  // {
  //   name: 'Stats',
  //   path: '/stats',
  //   icon: <RiLineChartFill className="h-6 w-auto" />,
  // },
  {
    name: 'Notification Settings',
    path: '/notification-settings',
    icon: <RiSettingsLine className="h-6 w-auto" />,
  },
];

export default function AccountNav({ className, accountId }: AccountNavProps) {
  const pathname = usePathname() ?? '';
  const activePath = pathname.replace(`/engineer/${accountId}`, '');

  return (
    <div
      className={classNames(
        'w-full flex justify-between border-b border-white/30',
        className
      )}
    >
      {items.map(({ name, path }) => (
        <Link
          key={name}
          className={classNames(
            'py-2 border-b-2 text-xl hover:text-green-primary -mt-[1px]',
            path === activePath
              ? 'font-bold text-green-primary border-green-primary'
              : 'border-transparent'
          )}
          href={`/engineer/${accountId}${path}`}
        >
          {name}
        </Link>
      ))}
    </div>
  );
}
