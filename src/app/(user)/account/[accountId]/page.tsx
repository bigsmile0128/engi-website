'use client';

import classNames from 'classnames';
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
      <UserInfo className="w-full" accountId={accountId} />
      <UserAnalytics className="w-full" />
      <UserAbout className="w-full" />
      <UserRepositories className="w-full" />
    </div>
  );
}
