import React from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import Button from '~/components/Button';
import { RiExchangeLine } from 'react-icons/ri';
import EngiIcon from '~/components/icons/EngiIcon';
import CopyButton from '~/components/CopyButton';
import GridPattern from '~/components/GridPattern';
import Balance from '~/components/pages/wallet/Balance';
import Transactions from '~/components/pages/wallet/Transactions';

type WalletDetailsProps = {
  className?: string;
};

export default function WalletDetails({ className }: WalletDetailsProps) {
  const router = useRouter();
  const { walletId } = router.query;

  return (
    <div className={classNames('mt-12 mb-80', className)}>
      <div className="relative">
        <GridPattern
          className="h-[130%] -mt-6"
          id="wallet-details"
          offset={-1}
        />
        <div className="max-w-page xl:max-w-4xl relative">
          <div className="flex flex-col gap-y-8 sm:flex-row gap-x-12 justify-between">
            <div className="flex flex-col gap-y-4">
              <h1 className="font-bold text-2xl">Wallet</h1>
              <div className="flex items-center">
                <span className="text-sm text-secondary w-56 overflow-hidden text-ellipsis">
                  {walletId}{' '}
                </span>
                <CopyButton
                  className="inline-block"
                  value={walletId?.toString()}
                />
              </div>
            </div>
            <Button className="flex justify-center items-center whitespace-nowrap">
              <RiExchangeLine className="h-5 w-5" />
              <span className="ml-3">
                Move{' '}
                <EngiIcon className="inline-block h-2.5 w-2.5 text-green-primary" />
                ngi
              </span>
            </Button>
          </div>
          <Balance className="mt-12 p-6 bg-[#232323]/40 backdrop-blur-[200px]" />
        </div>
      </div>
      <div className="max-w-page">
        <Transactions className="mt-20" walletId={walletId?.toString()} />
      </div>
    </div>
  );
}
