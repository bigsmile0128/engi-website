import classNames from 'classnames';
import SubmissionFilters from './SubmissionFilters';
import SubmissionTable from './SubmissionTable';
import { getSubmissions } from '../api';

export default async function BountySubmissions({
  params,
}: {
  params: { bountyId: string };
}) {
  const { bountyId } = params;

  const submissions = await getSubmissions({
    jobId: bountyId,
    skip: 0,
    limit: 100,
  });

  return (
    <div className={classNames('')}>
      <SubmissionFilters numResults={submissions.totalCount} />
      <SubmissionTable
        bountyId={bountyId}
        submissions={submissions.items}
        className="mt-4"
      />
    </div>
  );
}
