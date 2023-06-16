'use client';

import classNames from 'classnames';
import IncompleteBanner from '~/components/IncompleteBanner';

export default function Settings({
  params,
}: {
  params: {
    accountId: string;
  };
}) {
  const { accountId } = params;

  return (
    <div className={classNames('w-full')}>
      <IncompleteBanner className="" />
      {/* INSERT CODE HERE */}
    </div>
  );
}
