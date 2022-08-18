import React from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import CopyButton from 'components/CopyButton';
import GridPattern from 'components/GridPattern';

type WalletDetailsProps = {
  className?: string;
};

export default function WalletDetails({ className }: WalletDetailsProps) {
  const router = useRouter();
  const { walletId } = router.query;

  return (
    <div className={classNames('mt-12 mb-24', className)}>
      <div className="relative">
        <GridPattern
          className="h-[200%] -mt-6"
          id="wallet-details"
          offset={-1}
        />
        <div className="max-w-page xl:max-w-4xl">
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
          </div>
        </div>
      </div>
    </div>
  );
}
