'use client';

import classNames from 'classnames';
import IncompleteBanner from '~/components/IncompleteBanner';

export default function Stats({
  params,
}: {
  params: {
    accountId: string;
  };
}) {
  const { accountId } = params;

  return (
    <div className={classNames('w-full')}>
      <IncompleteBanner className="mb-8" />
      <span className="font-grifter text-3xl">Stats</span>
      {/* INSERT CODE HERE */}
    </div>
  );
}
