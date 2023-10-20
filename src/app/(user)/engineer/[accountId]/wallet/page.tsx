import classNames from 'classnames';
import { getCurrentUser } from '~/app/(user)/api';
import CopyButton from '~/components/CopyButton';
import EngiAmount from '~/components/EngiAmount';
import Transactions from '~/components/pages/wallet/Transactions';
import MoveEngiButton from './MoveEngiButton';

export default async function WalletPage({
  params,
}: {
  params: {
    accountId: string;
  };
}) {
  const { accountId } = params;
  const user = await getCurrentUser();

  return (
    <div className={classNames('w-full')}>
      <div className="w-full flex flex-col gap-y-8 sm:flex-row gap-x-12 justify-between">
        <div className="flex flex-col gap-y-4">
          <h1 className="font-bold text-2xl">Wallet</h1>
          <div className="flex items-center">
            <span className="text-sm text-secondary w-56 overflow-hidden text-ellipsis">
              {accountId === 'me' ? user.wallet.Id : accountId}{' '}
            </span>
            <CopyButton
              className="inline-block"
              value={accountId === 'me' ? user.wallet.Id : accountId}
            />
          </div>
        </div>
        {accountId === 'me' && !!user && (
          <MoveEngiButton className="hidden laptop:block" user={user} />
        )}
      </div>
      <div
        className={classNames(
          'mt-12 p-6 bg-[#232323]/40 backdrop-blur-[200px]',
          'flex flex-col sm:flex-row sm:items-center'
        )}
      >
        <h2 className="font-bold text-2xl">Balance</h2>
        <div className="flex items-center whitespace-nowrap sm:ml-auto mt-8 sm:mt-0">
          <EngiAmount
            value={user.balance}
            iconClassName="h-6 w-6"
            valueClassName="font-grifter text-4xl -mb-1 ml-1"
          />
        </div>
        {/* TODO: engi in last 7d */}
        {/* BLOCKED: https://github.com/engi-network/engi-blockchain-gql/issues/124 */}
        {/* <div className="flex items-center whitespace-nowrap text-secondary mt-4 sm:mt-0 sm:ml-12 sm:mb-4">
          <RiArrowUpLine className="h-5 w-5 text-green-primary" />
          <EngiIcon className="h-3 w-3 ml-1 -mb-[3px]" />
          <span className="text-lg ml-1">N/A</span>
        </div> */}
      </div>
      <div className="w-full">
        <Transactions
          className="mt-12"
          walletId={accountId === 'me' ? user.wallet.Id : accountId}
        />
      </div>
    </div>
  );
}
