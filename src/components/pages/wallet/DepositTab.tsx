import classNames from 'classnames';
import { Dispatch } from 'react';
import { PreviewMoveEngi } from '~/utils/exchange/types';
import BuyEngi from '~/components/pages/wallet/BuyEngi';
import { useUser } from '~/utils/contexts/userContext';

type DepositTabProps = {
  className?: string;
  setPreviewMove: Dispatch<PreviewMoveEngi>;
};

export default function DepositTab({
  className,
  setPreviewMove,
}: DepositTabProps) {
  const { user } = useUser();

  return (
    <div className={classNames('flex flex-col', className)}>
      {user?.walletId && (
        <BuyEngi account={user.walletId} setPreviewMove={setPreviewMove} />
      )}
    </div>
  );
}
