import classNames from 'classnames';
import IncompleteBanner from '~/components/IncompleteBanner';
import UserAbout from '~/components/pages/account/UserAbout';
import UserAnalytics from '~/components/pages/account/UserAnalytics';

import UserInfo from '~/components/pages/account/UserInfo';
import UserRepositories from '~/components/pages/account/UserRepositories';

export default function AccountDetails({
  params,
}: {
  params: {
    accountId: string;
  };
}) {
  const { accountId } = params;
  return (
    <div className={classNames('flex-1 flex flex-col gap-y-12')}>
      {/* TODO: blocked by https://linear.app/engi/issue/ENGIN-1146/api-to-get-account-information-for-a-wallet-address */}
      <IncompleteBanner />
      <UserInfo className="w-full" accountId={accountId} />
      <UserAnalytics className="w-full" />
      <UserAbout className="w-full" />
      <UserRepositories className="w-full" />
    </div>
  );
}
