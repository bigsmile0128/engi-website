import EngiAmount from '~/components/EngiAmount';
import { getBalance, getDraftDetails } from '../api';
import DraftFundingContent from './Funding';
import { wozToEngi } from '~/utils/currency/conversion';

export default async function DraftFunding({
  params,
}: {
  params: {
    draftId: string;
  };
}) {
  const draftId = decodeURIComponent(params.draftId);
  const draft = await getDraftDetails(draftId);
  const balance = await getBalance();

  if (draft.funding)
    return (
      <div className="max-w-page md:!max-w-xl w-full">
        <h1 className="font-grifter text-3xl">Add Funding</h1>
        <div className="mt-8 w-full flex items-center justify-between p-8 bg-black/[.14]">
          <span className="font-bold text-xl">Wallet Balance</span>
          <EngiAmount value={balance} />
        </div>
        <DraftFundingContent
          className="mt-8"
          defaultFunding={
            draft.funding ? wozToEngi(draft.funding).toString() : ''
          }
          draftId={draftId}
        />
      </div>
    );
}
