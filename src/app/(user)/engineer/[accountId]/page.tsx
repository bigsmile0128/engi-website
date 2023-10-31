import classNames from 'classnames';
import UserAbout from '~/components/pages/account/UserAbout';
import UserAnalytics from '~/components/pages/account/UserAnalytics';
import UserInfo from '~/components/pages/account/UserInfo';
import { CurrentUserInfo, Engineer } from '~/types';
import { getCurrentUser, getUser } from '../../api';
import UserLatestTransactions from './UserLatestTransactions';

export default async function AccountDetails({
  params,
}: {
  params: {
    accountId: string;
  };
}) {
  let user: Engineer;
  if (params.accountId === 'me') {
    // current user will not be null because layout.tsx will fetch and redirect if missing
    const currentUser = (await getCurrentUser()) as CurrentUserInfo;
    const walletId = currentUser.wallet.Id;
    user = await getUser(walletId);
  } else {
    user = await getUser(params.accountId);
  }

  return (
    <div className={classNames('flex-1 flex flex-col gap-y-12')}>
      <UserInfo className="w-full" data={user} accountId={params.accountId} />
      <UserAbout className="w-full" data={user} accountId={params.accountId} />
      <UserAnalytics className="w-full" data={user} />
      {/* @ts-expect-error Server Component */}
      <UserLatestTransactions className="w-full" accountId={user.address} />
      {/* TODO: enable when this data is available */}
      {/* TODO: enable when this data is available */}
      {/* <UserRepositories className="w-full" /> */}
    </div>
  );
}
