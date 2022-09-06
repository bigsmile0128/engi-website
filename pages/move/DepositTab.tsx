import React from 'react';
import classNames from 'classnames';
import Input from 'components/Input';
import { RiSearchLine } from 'react-icons/ri';

type DepositTabProps = {
  className?: string;
};

export default function DepositTab({ className }: DepositTabProps) {
  return (
    <div className={classNames('flex flex-col', className)}>
      <label htmlFor="wallet-address" className="font-bold text-xl">
        Wallet Address
      </label>
      <div className="relative mt-2">
        <Input
          className="w-full pl-11"
          type="text"
          name="wallet-address"
          placeholder="Enter a wallet address"
        />
        <RiSearchLine className="text-secondary absolute top-1/2 left-4 -translate-y-1/2 h-5 w-5" />
      </div>
    </div>
  );
}
