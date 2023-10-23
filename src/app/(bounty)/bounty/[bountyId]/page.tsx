import { getUser } from '~/app/(user)/api';
import BitDescription from './BitDescription';
import { getBountyDetails } from './api';

export default async function Description({
  params,
}: {
  params: { bountyId: string };
}) {
  const { bountyId } = params;
  const bounty = await getBountyDetails(bountyId);
  const user = await getUser(bounty.creator);

  return <BitDescription data={bounty} user={user} />;
}
