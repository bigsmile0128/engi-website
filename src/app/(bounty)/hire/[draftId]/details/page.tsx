import { getDraftDetails } from '../api';
import DraftDetailsContent from './Details';

export default async function DraftDetails({
  params,
}: {
  params: {
    draftId: string;
  };
}) {
  const draftId = decodeURIComponent(params.draftId);
  const draft = await getDraftDetails(draftId);

  return (
    <div className="max-w-page md:!max-w-xl w-full">
      <h1 className="font-grifter text-3xl">Bounty Details</h1>
      <DraftDetailsContent className="mt-8 w-full" draft={draft} />
    </div>
  );
}
