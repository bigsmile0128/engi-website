import classNames from 'classnames';
import { Dispatch } from 'react';
import BuyEngi from '~/components/pages/wallet/BuyEngi';
import { useUser } from '~/utils/contexts/userContext';

type DepositTabProps = {
  className?: string;
  setDepositAmount: Dispatch<number>;
};

export default function DepositTab({
  className,
  setDepositAmount,
}: DepositTabProps) {
  const { user } = useUser();

  return (
    <div className={classNames('flex flex-col', className)}>
      {user?.walletId && (
        <BuyEngi account={user.walletId} setDepositAmount={setDepositAmount} />
      )}
    </div>
  );
}
