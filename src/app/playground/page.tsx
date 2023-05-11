'use client';

import React, { useState } from 'react';
import classNames from 'classnames';
import BitUserStatus from '~/components/BitUserStatus';
import Button from '~/components/global/Button/Button';

const statusOptions = [
  'OPEN',
  'PROGRESS',
  'ANALYZING',
  'SUBMITTED',
  'FAILED',
  'COMPLETE',
];

export default function Playground() {
  const [status, setStatus] = useState('OPEN');

  const optionIndex = statusOptions.findIndex(
    (option) => option === status
  ) as number;

  const prevOption = () => setStatus(statusOptions[optionIndex - 1]);
  const nextOption = () => setStatus(statusOptions[optionIndex + 1]);
  return (
    <div className={classNames('max-w-page py-24')}>
      <div className="flex items-center gap-8">
        <Button onClick={() => prevOption()} disabled={optionIndex === 0}>
          Prev
        </Button>
        <Button
          onClick={() => nextOption()}
          disabled={optionIndex === statusOptions.length - 1}
        >
          Next
        </Button>
      </div>
      <BitUserStatus className="mt-8" status={status as any} />
    </div>
  );
}
