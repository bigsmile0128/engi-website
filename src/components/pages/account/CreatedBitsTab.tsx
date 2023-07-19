import React from 'react';
import classNames from 'classnames';
import BitTable from '../../../app/(bounty)/bounty/SearchResults/BitTable';
import useBits from '~/utils/hooks/useBits';

type CreatedBitsTabProps = {
  accountId: string;
  className?: string;
};

export default function CreatedBitsTab({
  className,
  accountId,
}: CreatedBitsTabProps) {
  const { isLoading, data } = useBits({
    limit: 25,
    skip: 0,
    creator: accountId,
  });
  return (
    <div className={classNames('flex flex-col', className)}>
      <BitTable isLoading={isLoading} data={data?.result?.items} />
    </div>
  );
}
