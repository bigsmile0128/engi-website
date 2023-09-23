import Link from 'next/link';
import Button from '~/components/global/Button/Button';
import Select from '~/components/global/Select';
import { getDraftDetails } from '../api';

export default async function DraftRepository({
  params,
}: {
  params: {
    draftId: string;
  };
}) {
  const draftId = decodeURIComponent(params.draftId);
  const draft = await getDraftDetails(draftId);

  const analysis = draft.analysis;

  const repoName = (analysis?.repositoryUrl ?? '').replace(
    /^.*github\.com\//,
    ''
  );
  const branch = analysis?.branch ?? '';
  const commit = analysis?.commit ?? '';

  return (
    <div className="max-w-page md:!max-w-xl">
      <h4 className="font-bold text-xl">Step 1: Select Repository</h4>
      <p className="text-secondary mt-4">
        Select an existing repository URL for creating a new bounty. The
        directory must be a Rust project and have a .git directory.
      </p>
      <div className="flex items-center gap-2 mt-8">
        <label className="font-bold text-xl">Repository</label>
      </div>
      <Select
        className="mt-2"
        isDisabled
        value={{ label: repoName, value: repoName }}
      />
      <div className="flex items-center gap-2 mt-6">
        <label className="font-bold text-xl">Branch</label>
      </div>
      <Select
        className="mt-2"
        placeholder="Select a branch..."
        isDisabled
        value={{ label: branch, value: branch }}
      />
      <div className="flex items-center gap-2 mt-6">
        <label className="font-bold text-xl">Commit</label>
      </div>
      <Select
        className="mt-2"
        isDisabled
        value={{ label: commit, value: commit }}
      />
      <Link
        className="mt-8 block"
        href={`/hire/${encodeURIComponent(draftId)}/tests`}
      >
        <Button variant="primary" className="relative ml-auto !px-24">
          Continue
        </Button>
      </Link>
    </div>
  );
}
