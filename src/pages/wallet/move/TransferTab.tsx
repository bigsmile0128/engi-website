import React from 'react';
import classNames from 'classnames';
import WalletInput from './WalletInput';
import Input from '~/components/global/Input/Input';
import { RiInformationLine } from 'react-icons/ri';
import dynamic from 'next/dynamic';
import { SiBitcoin, SiEthereum, SiLitecoin } from 'react-icons/si';
import IncompleteBanner from '~/components/IncompleteBanner';

const ReactTooltip = dynamic(() => import('react-tooltip'), {
  ssr: false,
});

type TransferTabProps = {
  className?: string;
};

export default function TransferTab({ className }: TransferTabProps) {
  return (
    <div className={classNames('flex flex-col', className)}>
      <IncompleteBanner className="mb-4" />
      <WalletInput />
      <label htmlFor="note" className="mt-8 font-bold text-xl">
        Amount
      </label>
      <div className="relative mt-2">
        <Input
          className="w-full pr-16"
          type="number"
          name="amount"
          placeholder="0.00"
        />
        <div className="flex items-center gap-x-1 text-secondary absolute top-1/2 right-3 -translate-y-1/2">
          <span className="text-sm">engi</span>
          <div className="test" data-tip data-for="conversion">
            <RiInformationLine className="h-4 w-4" />
          </div>
        </div>
        <ReactTooltip id="conversion" effect="solid">
          <div className="flex flex-col gap-y-3">
            <div className="flex items-center gap-x-2">
              <SiBitcoin className="text-orange-primary h-5 w-5" />
              <span className="text-sm">100 BTC</span>
            </div>
            <div className="flex items-center gap-x-2">
              <SiEthereum className="text-blue-500 h-5 w-5" />
              <span className="text-sm">100 ETH</span>
            </div>
            <div className="flex items-center gap-x-2">
              <SiLitecoin className="text-yellow-500 h-5 w-5" />
              <span className="text-sm">100 LTC</span>
            </div>
          </div>
        </ReactTooltip>
      </div>
      <label htmlFor="note" className="mt-8 font-bold text-xl">
        Note
      </label>
      <Input
        className="mt-2"
        type="text"
        name="note"
        placeholder="Write an optional message"
      />
    </div>
  );
}
