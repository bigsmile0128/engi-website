import BitDescription from './BitDescription';
import { getBountyDetails } from './api';

export default async function Description({
  params,
}: {
  params: { bountyId: string };
}) {
  const { bountyId } = params;
  const bounty = await getBountyDetails(bountyId);

  return <BitDescription data={bounty} />;
}
