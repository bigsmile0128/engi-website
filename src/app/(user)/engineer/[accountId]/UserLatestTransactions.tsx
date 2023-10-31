import classNames from 'classnames';
import MobileTransactionTable from '~/components/pages/wallet/Transactions/MobileTransactionTable';
import TransactionTable from '~/components/pages/wallet/Transactions/TransactionTable';
import { getLatestTransactions } from '../../api';

type UserLatestTransactionsProps = {
  accountId: string;
  className?: string;
};

export default async function UserLatestTransactions({
  className,
  accountId,
}: UserLatestTransactionsProps) {
  const transactions = await getLatestTransactions(accountId);

  return (
    <div className={classNames('', className)}>
      <h2 className="font-bold text-2xl mb-4">Recent Activity</h2>
      <TransactionTable
        className="hidden sm:block"
        data={transactions}
        columnVisibility={{
          executor: false,
        }}
      />
      <MobileTransactionTable className="sm:hidden" data={transactions} />
    </div>
  );
}
