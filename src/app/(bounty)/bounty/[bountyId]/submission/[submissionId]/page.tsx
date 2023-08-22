import classNames from 'classnames';
import IncompleteBanner from '~/components/IncompleteBanner';
import { TestResult } from '~/types';
import BitTests from '../../BitDescription/BitTests';
import Header from './Header';
import { getSubmissionDetails } from '../../api';

export default async function SubmissionDetails({
  params,
}: {
  params: { bountyId: string; submissionId: string };
}) {
  const { bountyId, submissionId } = params;
  const submission = getSubmissionDetails(submissionId);

  return (
    <div className={classNames('')}>
      <IncompleteBanner className="mb-4" />
      <Header bountyId={bountyId} />
      <BitTests
        className="mt-8"
        data={[
          {
            id: 'subtracts 4 - 2 to equal 2',
            result: 'FAILED' as TestResult,
            required: true,
            failedResultMessage:
              'Error: expect(received).toBe(expected) // Object.is equality\n\nExpected: 2\nReceived: undefined\n    at Object.toBe (/code/calc.test.js:8:23)\n    at Promise.then.completed (/code/node_modules/jest-circus/build/utils.js:333:28)\n    at new Promise (<anonymous>)\n    at callAsyncCircusFn (/code/node_modules/jest-circus/build/utils.js:259:10)\n    at _callCircusTest (/code/node_modules/jest-circus/build/run.js:277:40)\n    at processTicksAndRejections (node:internal/process/task_queues:96:5)\n    at _runTest (/code/node_modules/jest-circus/build/run.js:209:3)\n    at _runTestsForDescribeBlock (/code/node_modules/jest-circus/build/run.js:97:9)\n    at run (/code/node_modules/jest-circus/build/run.js:31:3)\n    at runAndTransformResultsToJestFormat (/code/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:135:21)',
          },
          {
            id: 'test 2',
            result: 'FAILED' as TestResult,
            required: true,
            failedResultMessage:
              'Error: expect(received).toBe(expected) // Object.is equality\n\nExpected: 2\nReceived: undefined\n    at Object.toBe (/code/calc.test.js:8:23)\n    at Promise.then.completed (/code/node_modules/jest-circus/build/utils.js:333:28)\n    at new Promise (<anonymous>)\n    at callAsyncCircusFn (/code/node_modules/jest-circus/build/utils.js:259:10)\n    at _callCircusTest (/code/node_modules/jest-circus/build/run.js:277:40)\n    at processTicksAndRejections (node:internal/process/task_queues:96:5)\n    at _runTest (/code/node_modules/jest-circus/build/run.js:209:3)\n    at _runTestsForDescribeBlock (/code/node_modules/jest-circus/build/run.js:97:9)\n    at run (/code/node_modules/jest-circus/build/run.js:31:3)\n    at runAndTransformResultsToJestFormat (/code/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:135:21)',
          },
          {
            id: 'test 3',
            result: 'FAILED' as TestResult,
            required: true,
            failedResultMessage:
              'Error: expect(received).toBe(expected) // Object.is equality\n\nExpected: 2\nReceived: undefined\n    at Object.toBe (/code/calc.test.js:8:23)\n    at Promise.then.completed (/code/node_modules/jest-circus/build/utils.js:333:28)\n    at new Promise (<anonymous>)\n    at callAsyncCircusFn (/code/node_modules/jest-circus/build/utils.js:259:10)\n    at _callCircusTest (/code/node_modules/jest-circus/build/run.js:277:40)\n    at processTicksAndRejections (node:internal/process/task_queues:96:5)\n    at _runTest (/code/node_modules/jest-circus/build/run.js:209:3)\n    at _runTestsForDescribeBlock (/code/node_modules/jest-circus/build/run.js:97:9)\n    at run (/code/node_modules/jest-circus/build/run.js:31:3)\n    at runAndTransformResultsToJestFormat (/code/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:135:21)',
          },
        ]}
        defaultOpen
      />
    </div>
  );
}
