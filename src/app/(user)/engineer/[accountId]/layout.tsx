import React from 'react';
import classNames from 'classnames';
import Sidebar from '~/components/pages/account/Sidebar';
import AccountNav from '~/components/pages/account/AccountNav';

export default function AccountLayout({
  children, // will be a page or nested layout
  params,
}: {
  children: React.ReactNode;
  params: {
    accountId: string;
  };
}) {
  return (
    <div
      className={classNames(
        'max-w-page tablet:flex tablet:flex-col desktop:flex-row desktop:justify-between gap-12 xl:gap-24 py-24'
      )}
    >
      <AccountNav
        className="hidden tablet:flex desktop:hidden"
        accountId={params.accountId}
      />
      <Sidebar className="hidden desktop:flex" accountId={params.accountId} />
      {children}
    </div>
  );
}
