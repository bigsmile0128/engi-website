import React from 'react';
import classNames from 'classnames';
import WalletInput from './WalletInput';

type DepositTabProps = {
  className?: string;
};

export default function DepositTab({ className }: DepositTabProps) {
  return (
    <div className={classNames('flex flex-col', className)}>
      <WalletInput />
    </div>
  );
}