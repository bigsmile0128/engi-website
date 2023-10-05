import classNames from 'classnames';
import { Dispatch } from 'react';
import BuyEngi from '~/components/pages/wallet/BuyEngi';
import { CurrentUserInfo } from '~/types';

type DepositTabProps = {
  className?: string;
  setDepositAmount: Dispatch<number>;
  user: CurrentUserInfo;
};

export default function DepositTab({
  className,
  setDepositAmount,
  user,
}: DepositTabProps) {
  return (
    <div className={classNames('flex flex-col', className)}>
      <BuyEngi account={user.wallet.Id} setDepositAmount={setDepositAmount} />
    </div>
  );
}
