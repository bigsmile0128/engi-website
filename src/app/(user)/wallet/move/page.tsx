'use client';

import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import { Fragment, useState } from 'react';
import EngiIcon from '~/components/global/icons/EngiIcon';
import TransferTab from '~/components/pages/wallet/TransferTab';
import WithdrawTab from '~/components/pages/wallet/WithdrawTab';
import { useBalance } from '~/utils/balances/userBalance';
import { useUser } from '~/utils/contexts/userContext';
import { displayAdaInEngi } from '~/utils/currency/conversion';
import DepositTab from '../../../../components/pages/wallet/DepositTab';

type MoveType = 'Withdraw' | 'Deposit' | 'Transfer';
const tabNames: Array<MoveType> = ['Withdraw', 'Deposit', 'Transfer'];

export type PreviewMoveEngi = {
  // +/- should be reflected in this amount
  amount: number;
  move: MoveType;
};

// display a preview of a move
const usePreviewMoveEngi = () => useState<PreviewMoveEngi>();

export default function MoveEngi() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [previewMove, setPreviewMove] = usePreviewMoveEngi();
  const { user } = useUser();
  const { data: balance } = useBalance(user?.walletId ?? '');

  return (
    <div className={classNames('max-w-page mt-12 mb-24 flex')}>
      <div className="max-w-xl">
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
              <DepositTab setPreviewMove={setPreviewMove} />
            </Tab.Panel>
            <Tab.Panel>
              <TransferTab />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>

      <div>
        {previewMove?.amount ? (
          <div className="bg-[#232323]/40 p-10 ml-20 w-full">
            <div className="flex flex-col items-center mb-10">
              <h2 className="text-3xl font-light">
                You are {previewMove.move}ing
              </h2>

              <div className="flex items-center flex-1 justify-center mt-8">
                <EngiIcon className={'h-10 w-10 text-green-primary'} />
                <span className={'font-grifter text-5xl text-white -mb-3 ml-1'}>
                  {displayAdaInEngi(previewMove.amount)}
                </span>
              </div>
            </div>

            <div className="flex space-x-10">
              <div>
                <h2 className="text-3xl font-light">Current Balance</h2>

                <div className="flex items-center flex-1 justify-center mt-8">
                  <EngiIcon className={'h-10 w-10 text-green-primary'} />
                  <span
                    className={'font-grifter text-5xl text-white -mb-3 ml-1'}
                  >
                    {displayAdaInEngi(balance)}
                  </span>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-light">New Balance</h2>

                <div className="flex items-center flex-1 justify-center mt-8">
                  <EngiIcon className={'h-10 w-10 text-green-primary'} />
                  <span
                    className={'font-grifter text-5xl text-white -mb-3 ml-1'}
                  >
                    {displayAdaInEngi((balance || 0) + previewMove.amount)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
