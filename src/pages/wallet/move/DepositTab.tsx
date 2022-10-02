import React, { Dispatch, useContext } from 'react';
import classNames from 'classnames';
import BuyEngi from '~/components/pages/wallet/BuyEngi';
import UserContext from '~/utils/contexts/userContext';
import { PreviewMoveEngi } from '~/pages/wallet/move';

type DepositTabProps = {
  setPreviewMove?: Dispatch<PreviewMoveEngi>;
  className?: string;
};

export default function DepositTab({
  className,
  setPreviewMove,
}: DepositTabProps) {
  const { user } = useContext(UserContext);

  return (
    <div className={classNames('flex flex-col', className)}>
      {user?.walletId && (
        <BuyEngi account={user.walletId} setPreviewMove={setPreviewMove} />
      )}
    </div>
  );
}
