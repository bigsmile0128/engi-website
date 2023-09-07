'use client';

import classNames from 'classnames';
import { useMemo } from 'react';
import TestTable from '~/components/TestTable';
import Button from '~/components/global/Button/Button';
import { TestResult } from '~/types';

type TestsTabProps = {
  className?: string;
};

export default function TestsTab({ className }: TestsTabProps) {
  const mockData = useMemo(
    () => [
      {
        id: 'Placeholder test 1',
        result: TestResult.FAILED,
        required: true,
        failedResultMessage:
          'System.NotImplementedException : Not fully implemented.',
      },
      {
        id: 'Placeholder test 2',
        result: TestResult.FAILED,
        required: true,
        failedResultMessage:
          'System.NotImplementedException : Not fully implemented.',
      },
      {
        id: 'Placeholder test 3',
        result: TestResult.FAILED,
        required: true,
        failedResultMessage:
          'System.NotImplementedException : Not fully implemented.',
      },
      {
        id: 'Placeholder test 4',
        result: TestResult.PASSED,
        required: true,
        failedResultMessage:
          'System.NotImplementedException : Not fully implemented.',
      },
    ],
    []
  );

  const defaultRowSelection = useMemo(() => {
    const rowSelection = {};

    mockData.forEach((test, i) => {
      rowSelection[i] = test.result === TestResult.FAILED;
    });

    return rowSelection;
  }, [mockData]);

  return (
    <div className={classNames('', className)}>
      <h1 className="font-grifter text-3xl">Analysis Results</h1>
      <div className="mt-4 text-xl text-secondary">
        3 failing tests will be auto selected. These tests must be passing in
        order to complete the bounty.
      </div>
      <TestTable
        className="mt-12 w-full"
        data={mockData}
        defaultRowSelection={defaultRowSelection}
      />
      <div className="flex justify-end gap-x-4 mt-8">
        <Button className="">Back</Button>
        <Button className="block !px-24" variant="primary">
          Continue
        </Button>
      </div>
    </div>
  );
}
