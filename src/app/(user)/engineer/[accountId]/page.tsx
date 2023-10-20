import classNames from 'classnames';
import UserAnalytics from '~/components/pages/account/UserAnalytics';
import UserInfo from '~/components/pages/account/UserInfo';
import { Engineer } from '~/types';
import { getCurrentUser, getUser } from '../../api';

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
    const currentUser = await getCurrentUser();
    const walletId = currentUser.wallet.Id;
    user = await getUser(walletId);
  } else {
    user = await getUser(params.accountId);
  }

  return (
    <div className={classNames('flex-1 flex flex-col gap-y-12')}>
      <UserInfo className="w-full" data={user} accountId={params.accountId} />
      <UserAnalytics className="w-full" data={user} />
      {/* TODO: enable when this data is available */}
      {/* <UserAbout className="w-full" /> */}
      {/* TODO: enable when this data is available */}
      {/* <UserRepositories className="w-full" /> */}
    </div>
  );
}
