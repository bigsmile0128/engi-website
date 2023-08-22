import classNames from 'classnames';
import SubmissionFilters from './SubmissionFilters';
import SubmissionTable from './SubmissionTable';

export default async function BountySubmissions({
  params,
}: {
  params: { bountyId: string };
}) {
  const { bountyId } = params;

  const submissions = [];

  return (
    <div className={classNames('')}>
      <SubmissionFilters numResults={submissions.length} />
      <SubmissionTable
        bountyId={bountyId}
        submissions={submissions}
        className="mt-4"
      />
    </div>
  );
}
