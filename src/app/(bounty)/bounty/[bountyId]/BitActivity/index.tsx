import classNames from 'classnames';

import BountyStatus from '~/components/BountyStatus';
import { Bit } from '~/types';
import BitCreator from '../BitCreator';
import RepositoryInfo from '../RepositoryInfo';
import ActivityStats from './ActivityStats';
import { getCurrentUser } from '~/app/(user)/api';
import { getSubmissions } from '../api';

interface BitActivityProps {
  className?: string;
  data: Bit;
}

export default async function BitActivity({
  className,
  data,
}: BitActivityProps) {
  let walletId: string;
  try {
    const currentUser = await getCurrentUser();
    walletId = currentUser.wallet.Id;
  } catch (e) {
    walletId = '';
  }

  const submissions = await getSubmissions({
    jobId: data.id,
    skip: 0,
    limit: 100,
  });

  return (
    <div className={classNames('flex flex-col overflow-hidden', className)}>
      <div className="bg-secondary/40">
        <BountyStatus
          className="w-full px-12 py-8"
          data={data}
          userId={walletId}
        />
        <ActivityStats
          className="p-12"
          data={data}
          submissions={submissions.items}
        />
      </div>
      <div className="mt-8 px-12 py-8 bg-secondary/40">
        {/* TODO: update when engineer lookup is available */}
        <BitCreator className="" data={data?.creator} />
        <div className="my-8 w-full border-t border-white/30" />
        <RepositoryInfo
          className=""
          organizationName={data.repository?.organization}
          repositoryName={data.repository?.fullName}
        />
      </div>
    </div>
  );
}
