import React from 'react';
import classNames from 'classnames';
import WalletInput from './WalletInput';

type TransferTabProps = {
  className?: string;
};

export default function TransferTab({ className }: TransferTabProps) {
  return (
    <div className={classNames('flex flex-col', className)}>
      <WalletInput />
    </div>
  );
}
