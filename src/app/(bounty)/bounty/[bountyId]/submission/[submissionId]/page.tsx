import classNames from 'classnames';
import TestTable from '~/components/TestTable';
import { getSubmissionDetails } from '../../api';
import Header from './Header';

export default async function SubmissionDetails({
  params,
}: {
  params: { bountyId: string; submissionId: string };
}) {
  const { bountyId, submissionId } = params;
  const submission = await getSubmissionDetails(submissionId);

  return (
    <div className={classNames('')}>
      <Header bountyId={bountyId} />
      <TestTable
        className="mt-8 w-full"
        data={submission.attempt?.tests ?? []}
      />
    </div>
  );
}
