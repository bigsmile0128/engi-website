import React, { useContext } from 'react';
import classNames from 'classnames';
import WalletInput from './WalletInput';
import BuyEngi from 'components/wallet/BuyEngi';
import UserContext from 'utils/contexts/userContext';

type DepositTabProps = {
  className?: string;
};

export default function DepositTab({ className }: DepositTabProps) {
  const { user } = useContext(UserContext);

  return (
    <div className={classNames('flex flex-col', className)}>
      {user?.walletId && <BuyEngi account={user.walletId} />}
    </div>
  );
}
