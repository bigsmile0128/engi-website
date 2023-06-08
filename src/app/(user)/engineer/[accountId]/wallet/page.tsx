import classNames from 'classnames';
import Link from 'next/link';
import { RiExchangeLine } from 'react-icons/ri';
import CopyButton from '~/components/CopyButton';
import Button from '~/components/global/Button/Button';
import EngiIcon from '~/components/global/icons/EngiIcon';
import Balance from '~/components/pages/wallet/Balance';
import Transactions from '~/components/pages/wallet/Transactions';

export default function WalletPage({
  params,
}: {
  params: {
    accountId: string;
  };
}) {
  const { accountId } = params;

  return (
    <div className={classNames('w-full')}>
      <div className="w-full flex flex-col gap-y-8 sm:flex-row gap-x-12 justify-between">
        <div className="flex flex-col gap-y-4">
          <h1 className="font-bold text-2xl">Wallet</h1>
          <div className="flex items-center">
            <span className="text-sm text-secondary w-56 overflow-hidden text-ellipsis">
              {accountId}{' '}
            </span>
            <CopyButton className="inline-block" value={accountId} />
          </div>
        </div>
        <Link href="/wallet/move">
          <Button className="flex justify-center items-center whitespace-nowrap">
            <RiExchangeLine className="h-5 w-5" />
            <span className="ml-3">
              Move{' '}
              <EngiIcon className="inline-block h-2.5 w-2.5 text-green-primary" />
              ngi
            </span>
          </Button>
        </Link>
      </div>
      <Balance
        className="mt-12 p-6 bg-[#232323]/40 backdrop-blur-[200px]"
        walletId={accountId}
      />
      <div className="w-full">
        <Transactions className="mt-12" walletId={accountId?.toString()} />
      </div>
    </div>
  );
}
