'use client';
import { ChevronRightIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import metamaskIcon from 'public/img/metamask-icon.png';
import talismanIcon from 'public/img/talisman-icon.png';
import React, { useEffect, useRef, useState } from 'react';
import { RiAlarmWarningLine } from 'react-icons/ri';
import { Id, toast } from 'react-toastify';
import { useConnectEthereumExtension } from '~/utils/ethereum/extension';
import { useBuyEngiWithEth } from '~/utils/ethereum/purchase';
import Button from './global/Button/Button';
import EngiCircleIcon from './global/icons/EngiCircleIcon';

type BuyEngiProps = {
  className?: string;
  walletId: string;
};

export default function BuyEngi({ className, walletId }: BuyEngiProps) {
  const [value, setValue] = useState('0');
  const [inputWidth, setInputWidth] = useState(0);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setInputWidth(spanRef.current?.offsetWidth || 0);
  }, [value]);

  const { data: ethereumAccounts, isError } = useConnectEthereumExtension();
  const {
    mutate: buy,
    isLoading: userConfirmingBuyTransaction,
    isError: failedToBuyEngi,
    error: buyEngiError,
    data: confirmedBuyTransaction,
  } = useBuyEngiWithEth();

  const toastId = React.useRef<Id | null>(null);
  useEffect(() => {
    if (userConfirmingBuyTransaction) {
      toastId.current = toast.loading('Transaction pending...');
    } else if (confirmedBuyTransaction) {
      toast.dismiss(toastId.current as Id);
      toast.success('Purhase successful.');
    } else if (failedToBuyEngi) {
      toast.dismiss(toastId.current as Id);
      toast.error(`${buyEngiError.message} Please try again.`);
    }
  }, [
    userConfirmingBuyTransaction,
    confirmedBuyTransaction,
    failedToBuyEngi,
    buyEngiError,
  ]);

  if (isError || ethereumAccounts?.length === 0) {
    return (
      <div
        className={classNames(
          'w-full max-w-md py-12 px-12 bg-black/[.21] flex flex-col items-center gap-4',
          className
        )}
      >
        <RiAlarmWarningLine className="h-16 w-auto" />
        <span className="text-secondary">
          Check out our guide or download one of the options below
        </span>
        <Link
          className="w-full"
          target="_blank"
          href="https://links.engi.network/cookbook"
        >
          <Button variant="default" className="w-full">
            View Guide
          </Button>
        </Link>
        <div className="w-full flex flex-col divide-y divide-white/30">
          <Link
            target="_blank"
            href="https://metamask.io/"
            className="px-2 py-4 flex items-center hover:bg-white/10"
          >
            <Image src={metamaskIcon} alt="metamask" width={32} height={32} />
            <span className="ml-4 text-xl">Metamask</span>
            <ChevronRightIcon className="ml-auto h-6 w-6" />
          </Link>
          <Link
            target="_blank"
            href="https://www.talisman.xyz/"
            className="px-2 py-4 flex items-center hover:bg-white/10"
          >
            <Image src={talismanIcon} alt="talisman" width={32} height={32} />
            <span className="ml-4 text-xl">Talisman</span>
            <ChevronRightIcon className="ml-auto h-6 w-6" />
          </Link>
        </div>
      </div>
    );
  }

  let wozAmount;
  if (!isNaN(parseFloat(value))) {
    wozAmount = parseFloat(value) * Math.pow(10, 18);
  } else {
    wozAmount = 0;
  }

  return (
    <div
      className={classNames(
        'border border-white/60 flex flex-col bg-dropdown',
        className
      )}
    >
      <div className="px-4 py-2 flex items-center justify-between bg-dropdown border-b border-white/60">
        <div className="flex items-center gap-2">
          <EngiCircleIcon className="h-4 w-4 text-green-primary" />
          <span className="text-secondary">You can always buy ENGI later</span>
        </div>
        <Link href="/engineer/me/wallet">
          <Button variant="link" className="text-sm">
            Exchange page
          </Button>
        </Link>
      </div>
      <div className="flex flex-col items-center p-6">
        <div className="w-full px-8 flex items-center justify-between py-8">
          <div className="flex flex-col gap-2">
            <span className="text-lg">{value || '0'} ETH</span>
            <span className="font-medium text-secondary">ETH balance</span>
          </div>
          <ChevronRightIcon className="h-8 w-8" />
          <div className="flex flex-col gap-2">
            <span className="text-lg">{value || '0'} ENGI</span>
            <span className="font-medium text-secondary">ENGI balance</span>
          </div>
        </div>
        <div className="self-center border-b border-white/30 focus-within:border-green-primary">
          <div className="px-2 pb-3 flex items-center gap-2">
            <div className="font-grifter text-4xl">
              <span
                className="absolute opacity-0 pointer-events-none"
                ref={spanRef}
              >
                {value ?? '0'}
              </span>
              <input
                type="number"
                className="bg-transparent outline-none text-right"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="0"
                style={{ width: inputWidth || 26 }}
              />
            </div>
            <span className="text-xl text-secondary">ETH</span>
          </div>
        </div>
        <Button
          variant="primary"
          className="w-full mt-12"
          onClick={() =>
            buy({
              account: walletId,
              from: ethereumAccounts[0],
              amount: wozAmount,
            })
          }
          disabled={!wozAmount}
        >
          Buy Engi
        </Button>
      </div>
    </div>
  );
}
