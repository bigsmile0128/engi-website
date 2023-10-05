'use client';

import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { GrStatusDisabledSmall } from '@react-icons/all-files/gr/GrStatusDisabledSmall';
import { GrStatusGoodSmall } from '@react-icons/all-files/gr/GrStatusGoodSmall';
import Avvvatars from 'avvvatars-react';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import EngiAmount from '~/components/EngiAmount';
import BlockchainHealth from '~/components/modules/layout/BlockchainHealth';
import { CurrentUserInfo } from '~/types';
import { useLogOut } from '~/utils/auth/api';
import useEngiHealth from '~/utils/hooks/useEngiHealth';

type UserInfoProps = {
  blockchainHealthProps?: any;
  className?: string;
  user: CurrentUserInfo;
};

export default function UserInfo({
  className,
  user,
  blockchainHealthProps,
}: UserInfoProps) {
  const router = useRouter();
  const { isLoading: isLoadingHealth, data: health } = useEngiHealth();
  const { mutate: logOut, isSuccess: isSuccessfulLogout } = useLogOut();
  const { push: pushRoute } = useRouter();

  useEffect(() => {
    if (isSuccessfulLogout) {
      router.refresh();
    }
  }, [router, isSuccessfulLogout]);

  return (
    <div className={classNames('flex items-center gap-x-4', className)}>
      <div className="">
        <Avvvatars value={user.wallet.Id} style="shape" size={48} />
      </div>
      <div className="flex flex-col items-end">
        <Menu className="relative" as="div">
          <Menu.Button className="flex items-center whitespace-nowrap">
            {user?.display}
            <ChevronDownIcon className="h-4 w-4 ml-2" />
          </Menu.Button>
          <Transition
            as={React.Fragment}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Menu.Items
              className={classNames(
                'origin-top-right absolute right-0 top-16 z-50',
                'flex flex-col min-w-[200px]',
                'rounded-sm shadow-lg bg-secondary/80 whitespace-nowrap'
              )}
            >
              <div className="w-full pl-8 pt-4">
                <div className="flex items-center justify-between pr-8 pb-3 border-b border-white/30">
                  <div className="flex flex-col items-center gap-2">
                    <span className="font-grifter h-4">
                      {health?.peerCount ?? 'N/A'}
                    </span>
                    <span className="text-secondary">peers</span>
                  </div>
                  {isLoadingHealth && (
                    <div className="flex flex-col items-center gap-2">
                      <GrStatusGoodSmall className="h-4 w-4 text-secondary" />
                      <span className="text-secondary">connecting</span>
                    </div>
                  )}
                  {health?.status === 'ONLINE' && (
                    <div className="flex flex-col items-center gap-2 justify-between">
                      <GrStatusGoodSmall className="h-4 w-4 text-green-primary" />
                      <span className="text-secondary">online</span>
                    </div>
                  )}
                  {health?.status === 'OFFLINE' && (
                    <div className="flex flex-col items-center gap-2">
                      <GrStatusDisabledSmall className="h-4 w-4 text-red-400" />
                      <span className="text-secondary">offline</span>
                    </div>
                  )}
                  {!isLoadingHealth && !health?.status && (
                    <div className="flex flex-col items-center gap-2">
                      <GrStatusGoodSmall className="h-4 w-4 text-secondary" />
                      <span className="text-secondary">unknown</span>
                    </div>
                  )}
                </div>
              </div>
              <Menu.Item>
                <Link
                  className="hover:bg-secondary text-left pt-3 pl-8"
                  href="/engineer/me"
                >
                  <div className="pr-4 pb-3 border-b border-white/30 flex items-center justify-between">
                    <span className="text-secondary">Account</span>
                    <ChevronRightIcon className="h-4 w-4" />
                  </div>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <button
                  className="hover:bg-secondary text-left pt-3 pl-8"
                  onClick={() => {
                    logOut(null);
                    pushRoute('/login');
                  }}
                >
                  <div className="pr-4 pb-3 flex items-center justify-between">
                    <span className="text-secondary">Log out</span>
                    <ChevronRightIcon className="h-4 w-4" />
                  </div>
                </button>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
        <div className="flex items-center gap-x-4">
          <EngiAmount
            iconClassName="!h-4 !w-4"
            valueClassName="!font-default font-bold text-base mb-0 ml-1"
            value={user.balance}
          />
          <div className="h-5 w-[1px] bg-gray-400"></div>
          <BlockchainHealth
            className="!gap-x-1"
            showPeerCount={false}
            {...blockchainHealthProps}
          />
        </div>
      </div>
    </div>
  );
}
