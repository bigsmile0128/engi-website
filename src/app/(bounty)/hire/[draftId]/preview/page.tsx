import classNames from 'classnames';
import Link from 'next/link';
import { RiEdit2Fill } from 'react-icons/ri';
import TestTable from '~/components/TestTable';
import Button from '~/components/global/Button/Button';
import { wozToEngi } from '~/utils/currency/conversion';
import { getDraftDetails, getWalletId } from '../api';
import PostButton from './PostButton';

export default async function DraftPreview({
  params,
}: {
  params: {
    draftId: string;
  };
}) {
  const draftId = decodeURIComponent(params.draftId);
  const draft = await getDraftDetails(draftId);
  const walletId = await getWalletId();

  const tests = draft?.analysis?.tests ?? [];

  return (
    <div className="max-w-page md:!max-w-xl w-full">
      <h1 className="font-grifter text-3xl">Preview</h1>
      <div className="my-8 w-full border-t border-white/30" />
      <div className="flex flex-col gap-4">
        <div className="">
          <span className="mb-2 block text-sm text-secondary">Bounty name</span>
          <span className="flex items-center gap-2">
            <span
              className={classNames(
                'font-grifter text-xl -mb-1',
                !draft.name ? 'text-red-primary' : ''
              )}
            >
              {draft.name ?? 'Bounty is missing name.'}
            </span>
            <Link
              href={`/hire/${encodeURIComponent(draftId)}/details`}
              className="hover:text-green-primary"
            >
              <RiEdit2Fill className="h-5 w-5" />
            </Link>
          </span>
        </div>
        <div className="my-4 w-full border-t border-white/30" />
        <div className="">
          <span className="mb-2 block text-sm text-secondary">Funding</span>
          <span className="flex items-center gap-2">
            <span
              className={classNames(
                'font-grifter text-xl -mb-1',
                !draft.funding ? 'text-red-primary' : ''
              )}
            >
              {draft.funding
                ? `e${wozToEngi(draft.funding)}`
                : 'Bounty is missing funding.'}
            </span>
            <Link
              href={`/hire/${encodeURIComponent(draftId)}/funding`}
              className="hover:text-green-primary"
            >
              <RiEdit2Fill className="h-5 w-5" />
            </Link>
          </span>
        </div>
        <div className="my-4 w-full border-t border-white/30" />
        <div className="">
          <span className="mb-2 block text-sm text-secondary">Tests</span>
          {tests.length > 0 ? (
            <TestTable className="mt-6 w-full" data={tests} />
          ) : (
            <p
              className={classNames(
                'mt-4',
                tests.length === 0 ? 'text-red-primary' : 'text-secondary'
              )}
            >
              No tests were detected.
            </p>
          )}
        </div>
      </div>
      <div className="my-8 w-full border-t border-white/30" />
      <div className="flex justify-end gap-x-4 mt-12">
        <Link href={`/hire/${encodeURIComponent(draftId)}/funding`}>
          <Button className="">Back</Button>
        </Link>
        <PostButton draft={draft} walletId={walletId} />
      </div>
    </div>
  );
}
