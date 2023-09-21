import Link from 'next/link';
import TestTable from '~/components/TestTable';
import Button from '~/components/global/Button/Button';
import { getDraftDetails } from '../api';

export default async function DraftTests({
  params,
}: {
  params: {
    draftId: string;
  };
}) {
  const draftId = decodeURIComponent(params.draftId);
  const draft = await getDraftDetails(draftId);

  const analysis = draft.analysis;

  return (
    <div className="max-w-page md:!max-w-xl">
      <h1 className="font-grifter text-3xl">Analysis Results</h1>
      <TestTable className="mt-8 w-full" data={analysis?.tests ?? []} />
      <div className="flex justify-end gap-x-4 mt-8">
        <Link href={`/hire/${encodeURIComponent(draftId)}/repository`}>
          <Button className="">Back</Button>
        </Link>
        <Link href={`/hire/${encodeURIComponent(draftId)}/details`}>
          <Button className="block !px-24" variant="primary">
            Continue
          </Button>
        </Link>
      </div>
    </div>
  );
}
