import React from 'react';
import classNames from 'classnames';
import Input from '~/components/global/Input/Input';
import { RiSearchLine } from 'react-icons/ri';

type WalletInputProps = {
  className?: string;
  label?: string;
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
};

export default function WalletInput({
  className,
  onChange,
  label = 'Wallet Address',
}: WalletInputProps) {
  return (
    <div className={classNames('', className)}>
      <label htmlFor="wallet-address" className="font-bold text-xl">
        {label}
      </label>
      <div className="relative mt-2">
        <Input
          className="w-full pl-11"
          type="text"
          name="wallet-address"
          placeholder="Enter a wallet address"
          {...(onChange && { onChange })}
        />
        <RiSearchLine className="text-secondary absolute top-1/2 left-4 -translate-y-1/2 h-5 w-5" />
      </div>
    </div>
  );
}
