import React from 'react';
import classNames from 'classnames';
import { User } from 'utils/contexts/userContext';
import Avvvatars from 'avvvatars-react';
import Balance from 'components/Balance';
import BlockchainHealth from 'components/layout/BlockchainHealth';
import { useQuery } from 'react-query';
import axios from 'axios';
import { gql } from 'graphql-request';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';

type UserInfoProps = {
  className?: string;
  user: User;
  setUser: (user: User) => void;
};

export default function UserInfo({ className, user, setUser }: UserInfoProps) {
  const { isLoading, data: balance } = useQuery(
    ['userInfo', user.walletId],
    async () => {
      return await getBalance(user.walletId);
    }
  );

  return (
    <div className={classNames('flex items-center gap-x-4', className)}>
      <div className="">
        <Avvvatars value={user?.walletId} style="shape" size={48} />
      </div>
      <div className="flex flex-col items-start">
        <Menu className="relative" as="div">
          <Menu.Button className="flex items-center whitespace-nowrap">
            My Wallet
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
            <Menu.Items className="origin-top-right absolute right-0 rounded-sm shadow-lg bg-[#374151ee] whitespace-nowrap">
              <Menu.Item>
                <button className="px-6 py-1" onClick={() => setUser(null)}>
                  Log out
                </button>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
        <div className="flex items-center gap-x-4">
          <Balance isLoading={isLoading} value={balance} />
          <div className="h-5 w-[1px] bg-gray-400"></div>
          <BlockchainHealth className="!gap-x-2" />
        </div>
      </div>
    </div>
  );
}

async function getBalance(walletId) {
  const response = await axios.post('/api/graphql', {
    query: gql`
      query WalletCheck($id: ID!) {
        account(id: $id) {
          data {
            free
          }
        }
      }
    `,
    variables: {
      id: walletId,
    },
  });
  return response.data?.data?.account?.data?.free ?? null;
}