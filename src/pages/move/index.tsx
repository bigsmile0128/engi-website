import React, { Fragment, useState } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { Tab } from '@headlessui/react';
import DepositTab from './DepositTab';
import TransferTab from './TransferTab';
import WithdrawTab from './WithdrawTab';

type MoveEngiProps = {
  className?: string;
};

export default function MoveEngi({ className }: MoveEngiProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const query = router.query;
  const tabNames = ['Withdraw', 'Deposit', 'Transfer'];
  return (
    <div className={classNames('max-w-page mt-12 mb-24', className)}>
      <div className="max-w-lg">
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab.List className="flex w-full">
            {tabNames.map((name, i) => (
              <Tab as={Fragment} key={name}>
                {({ selected }) => (
                  <button
                    className={classNames(
                      'flex flex-1 items-center justify-center w-40 py-4',
                      'outline-none focus-visible:ring-1 ring-green-primary',
                      i !== tabNames.length - 1
                        ? 'border-r border-white/30'
                        : '',
                      selected ? 'bg-[#232323]/40' : 'bg-[#445146]'
                    )}
                  >
                    <span
                      className={classNames(
                        'text-xl',
                        selected
                          ? 'font-bold font-grifter -mb-2'
                          : 'text-white/80'
                      )}
                    >
                      {name}
                    </span>
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="bg-[#232323]/40 p-4">
            <Tab.Panel>
              <WithdrawTab />
            </Tab.Panel>
            <Tab.Panel>
              <DepositTab />
            </Tab.Panel>
            <Tab.Panel>
              <TransferTab />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
