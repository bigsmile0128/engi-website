import { Dialog, Tab } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import classNames from 'classnames';

import { Fragment, useState } from 'react';
import EngiAmount from '~/components/EngiAmount';
import Modal, { ModalProps } from '~/components/global/Modal/Modal';
import DepositTab from '~/components/pages/wallet/DepositTab';
import TransferTab from '~/components/pages/wallet/TransferTab';
import WithdrawTab from '~/components/pages/wallet/WithdrawTab';
import { useBalance } from '~/utils/balances/userBalance';
import { useUser } from '~/utils/contexts/userContext';
import { MoveType } from '~/utils/exchange/types';

const tabNames: Array<MoveType> = ['Buy', 'Withdraw', 'Transfer'];

enum MoveTab {
  BUY = 0,
  WITHDRAW = 1,
  TRANSFER = 2,
}

export default function MoveEngiModal({ isOpen, setIsOpen }: ModalProps) {
  const [selectedIndex, setSelectedIndex] = useState(MoveTab.BUY);
  const { user } = useUser();
  const { data: balance } = useBalance(user?.walletId ?? '');

  // amounts in WOZ
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [transferAmount, setTransferAmount] = useState(0);

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      className="!max-w-none !w-auto h-[90vh] overflow-y-auto !p-8"
    >
      <div className="flex items-center justify-between">
        <Dialog.Title
          as="h3"
          className="font-grifter text-4xl align-baseline -mb-2"
        >
          Move Engi
        </Dialog.Title>
        <button
          type="button"
          className="rounded-md text-gray-400 hover:text-gray-300 active:text-gray-200 focus-green-primary"
          onClick={() => setIsOpen?.(false)}
        >
          <span className="sr-only">Close</span>
          <XIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div className={classNames('mt-12 mb-24 flex items-start gap-8')}>
        <div className="w-[580px]">
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
                <DepositTab setDepositAmount={setDepositAmount} />
              </Tab.Panel>
              <Tab.Panel>
                <WithdrawTab setWithdrawAmount={setWithdrawAmount} />
              </Tab.Panel>
              <Tab.Panel>
                <TransferTab setTransferAmount={setTransferAmount} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
        <div className="bg-[#232323]/10 py-4">
          <div className="flex flex-col items-center gap-4">
            <span className="text-xl text-white/80">
              You are{' '}
              {selectedIndex === MoveTab.BUY
                ? 'buying'
                : selectedIndex === MoveTab.WITHDRAW
                ? 'withdrawing'
                : 'transferring'}
            </span>
            <EngiAmount
              value={
                selectedIndex === MoveTab.BUY
                  ? depositAmount
                  : selectedIndex === MoveTab.WITHDRAW
                  ? withdrawAmount
                  : transferAmount
              }
              iconClassName="h-6"
              valueClassName="text-4xl -mb-2 ml-1"
            />
          </div>
          <div className="mt-8 flex items-center justify-center divide-x divide-white/30">
            <div className="flex flex-col items-center gap-2 px-4 text-center">
              <span className="text-xl text-white/80">Current Balance</span>
              <EngiAmount value={balance} />
            </div>
            <div className="flex flex-col items-center gap-2 px-4 text-center">
              <span className="text-xl text-white/80">New Balance</span>
              <EngiAmount
                value={
                  (balance || 0) +
                  (selectedIndex === MoveTab.BUY
                    ? depositAmount
                    : selectedIndex === MoveTab.WITHDRAW
                    ? -1 * withdrawAmount
                    : -1 * transferAmount)
                }
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
