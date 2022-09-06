import React from 'react';
import classNames from 'classnames';
import WalletInput from './WalletInput';
import Input from 'components/Input';

type TransferTabProps = {
  className?: string;
};

export default function TransferTab({ className }: TransferTabProps) {
  return (
    <div className={classNames('flex flex-col', className)}>
      <WalletInput />
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
