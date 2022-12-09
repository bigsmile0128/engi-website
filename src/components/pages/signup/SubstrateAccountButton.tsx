import { uuid4 } from '@sentry/utils';
import Avvvatars from 'avvvatars-react';
import classNames from 'classnames';
import { ButtonHTMLAttributes, useMemo } from 'react';
import { SubstrateAccount } from '~/types';

type SubstrateAccountButtonProps = {
  account?: SubstrateAccount;
  className?: string;
  isLoading?: boolean;
};

export default function SubstrateAccountButton({
  className,
  account,
  isLoading,
  ...props
}: SubstrateAccountButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  const avatarId = useMemo(() => {
    return account?.address ?? uuid4();
  }, [account]);
  return (
    <button
      className={classNames(
        'flex items-center py-4 px-8 bg-black/20 gap-4 text-left',
        isLoading ? '' : 'hover:bg-black/30 active:bg-black/40',
        className
      )}
      {...props}
    >
      <div
        className={classNames(
          'shrink-0 h-14 w-14',
          isLoading ? 'skeleton' : ''
        )}
      >
        <Avvvatars value={avatarId} style="shape" size={56} />
      </div>
      <div
        className={classNames(
          'flex-1 flex flex-col overflow-hidden gap-1',
          isLoading ? 'children:skeleton' : ''
        )}
      >
        <p className="text-lg font-bold">{account?.meta?.name ?? 'Name'}</p>
        <p className="text-sm font-light truncate w-full">
          {account?.address || 'Address'}
        </p>
      </div>
    </button>
  );
}
