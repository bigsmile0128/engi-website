import classNames from 'classnames';
import IncompleteBanner from '~/components/IncompleteBanner';
import { Submission } from '~/types';
import SubmissionFilters from './SubmissionFilters';
import SubmissionTable from './SubmissionTable';

async function getSubmissions(): Promise<Submission[]> {
  // TODO: replace when API is ready
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));

  return [
    {
      id: '100',
      stages: [],
      status: 'GOOD',
      wallet: '5HKmhgssTaohnXy2hxn8x5i98a21LG8muV4e3hTAcETjPgvf',
    },
    {
      id: '101',
      stages: [],
      status: 'GOOD',
      wallet: '5HKmhgssTaohnXy2hxn8x5i98a21LG8muV4e3hTAcETjPgvg',
    },
    {
      id: '102',
      stages: [],
      status: 'GOOD',
      wallet: '5HKmhgssTaohnXy2hxn8x5i98a21LG8muV4e3hTAcETjPgvh',
    },
  ];
}

export default async function BitSubmissions({
  params,
}: {
  params: { bountyId: string };
}) {
  const { bountyId } = params;

  const submissions = await getSubmissions();

  return (
    <div className={classNames('')}>
      <IncompleteBanner className="mb-4" />
      <SubmissionFilters numResults={submissions.length} />
      <SubmissionTable
        bountyId={bountyId}
        submissions={submissions}
        className="mt-4"
      />
    </div>
  );
}
