'use client';

import { IoMdRefresh } from '@react-icons/all-files/io/IoMdRefresh';
import classNames from 'classnames';
import Button from '~/components/global/Button/Button';
import BitTable from '~/app/(bounty)/bounty/SearchResults/BitTable';
import MobileBitTable from '~/app/(bounty)/bounty/SearchResults/MobileBitTable';
import useBits from '~/utils/hooks/useBits';

export default function Bounties({
  params,
}: {
  params: {
    accountId: string;
  };
}) {
  const { accountId } = params;

  const { isError, isLoading, data, error, refetch } = useBits({
    creator: accountId,
    limit: 20,
    skip: 0,
  });

  const results = data?.result?.items ?? [];

  return (
    <div className={classNames('w-full')}>
      {isLoading ? (
        <>
          <BitTable className="hidden sm:block" isLoading />
          <MobileBitTable className="sm:hidden" isLoading />
        </>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="font-grifter text-3xl mb-6">Something went wrong...</p>
          {error?.message && (
            <code className="p-4 mb-6 bg-black/[.14] text-red-400">
              {error?.message}
            </code>
          )}
          <Button
            className="flex items-center justify-center gap-2"
            variant="primary"
            onClick={() => refetch()}
          >
            <IoMdRefresh className="h-5 w-5 mr-2" />
            Try again
          </Button>
        </div>
      ) : results.length > 0 ? (
        <>
          <BitTable className="hidden sm:block" data={results} />
          <MobileBitTable className="sm:hidden" data={results} />
        </>
      ) : (
        <div className="flex items-center justify-center py-16">
          <span className="font-grifter text-3xl">No bounties found.</span>
        </div>
      )}
    </div>
  );
}
