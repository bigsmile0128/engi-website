import { getCurrentUser } from '~/app/(user)/api';
import Bounties from './Bounties';

export default async function BountiesContainer({
  params,
}: {
  params: { accountId: string };
}) {
  const { accountId } = params;
  const user = await getCurrentUser();
  return (
    <Bounties walletId={accountId === 'me' ? user.wallet.Id : accountId} />
  );
}
