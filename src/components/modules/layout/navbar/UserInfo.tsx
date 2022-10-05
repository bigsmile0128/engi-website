import React from 'react';
import classNames from 'classnames';
import { User } from '~/utils/contexts/userContext';
import Avvvatars from 'avvvatars-react';
import EngiAmount from '~/components/EngiAmount';
import BlockchainHealth from '~/components/modules/layout/BlockchainHealth';
import { useQuery } from 'react-query';
import axios from 'axios';
import { gql } from 'graphql-request';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import copy from 'copy-to-clipboard';
import { toast } from 'react-toastify';
import MenuItemLink from '~/components/MenuItemLink';
import { useBalance } from '~/utils/balances/userBalance';
import { useRouter } from 'next/router';

type UserInfoProps = {
  blockchainHealthProps?: any;
  className?: string;
  setUser: (user: User) => void;
  user: User;
};

export default function UserInfo({
  className,
  user,
  setUser,
  blockchainHealthProps,
}: UserInfoProps) {
  const {
    isLoading: isLoadingBalance,
    data: balance,
    isFetched: hasLoadedBalanceAtLeastOnce,
  } = useBalance(user.walletId);
  const { push: pushRoute } = useRouter();

  return (
    <div className={classNames('flex items-center gap-x-4', className)}>
      <div className="">
        <Avvvatars value={user?.walletId} style="shape" size={48} />
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
            <Menu.Items className="origin-top-right absolute right-0 rounded-sm shadow-lg bg-[#374151] whitespace-nowrap flex flex-col z-10">
              <Menu.Item>
                <MenuItemLink
                  className="px-6 py-1 text-gray-300 hover:text-white"
                  href={`/wallet/${user?.walletId}`}
                >
                  View Wallet
                </MenuItemLink>
              </Menu.Item>
              <Menu.Item>
                <button
                  className="px-6 py-1 text-gray-300 hover:text-white"
                  onClick={() => {
                    copy(user?.walletId);
                    toast.success('Copied wallet address.', {
                      position: 'bottom-right',
                    });
                  }}
                >
                  Copy Wallet Address
                </button>
              </Menu.Item>
              <Menu.Item>
                <MenuItemLink
                  className="px-6 py-1 text-gray-300 hover:text-white"
                  href="/settings"
                >
                  Settings
                </MenuItemLink>
              </Menu.Item>
              <Menu.Item>
                <button
                  className="px-6 py-1 text-gray-300 hover:text-white"
                  onClick={() => {
                    setUser(null);
                    pushRoute('/signup');
                  }}
                >
                  Log out
                </button>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
        <div className="flex items-center gap-x-4">
          <EngiAmount
            iconClassName="!h-4 !w-4"
            valueClassName="!font-default font-bold text-base mb-0 ml-2"
            isLoading={isLoadingBalance && !hasLoadedBalanceAtLeastOnce}
            value={balance}
          />
          <div className="h-5 w-[1px] bg-gray-400"></div>
          <BlockchainHealth className="!gap-x-2" {...blockchainHealthProps} />
        </div>
      </div>
    </div>
  );
}
