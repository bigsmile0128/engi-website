'use client';

import classNames from 'classnames';
import { useState } from 'react';
import Roadmap from '../(marketing)/about/Roadmap';

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
    <div className={classNames('py-24 -mr-[400px]')}>
      <div className="overflow-x-auto">
        <Roadmap
          className="py-64"
          items={[
            {
              date: '2020',
              title: 'Technologies Developed',
              subtitle: 'Academia',
              color: 'green-primary',
            },
            {
              date: '2021',
              title: 'Technologies Developed',
              subtitle: 'Academia',
              color: 'green-primary',
            },
            {
              date: '2022',
              title: 'Technologies Developed',
              subtitle: 'Academia',
              color: 'green-primary',
            },
            {
              date: '2023',
              title: 'Technologies Developed',
              subtitle: 'Academia',
              color: 'orange-primary',
            },
            {
              date: '2024',
              title: 'Technologies Developed',
              subtitle: 'Academia',
              color: 'purple-primary',
            },
            {
              date: '2025',
              title: 'Technologies Developed',
              subtitle: 'Academia',
              color: 'purple-primary',
            },
            {
              date: '2026',
              title: 'Technologies Developed',
              subtitle: 'Academia',
              color: 'purple-primary',
            },
            {
              date: '2024',
              title: 'Technologies Developed',
              subtitle: 'Academia',
              color: 'purple-primary',
            },
            {
              date: '2025',
              title: 'Technologies Developed',
              subtitle: 'Academia',
              color: 'purple-primary',
            },
            {
              date: '2026',
              title: 'Technologies Developed',
              subtitle: 'Academia',
              color: 'purple-primary',
            },
            {
              date: '2027',
              title: 'Technologies Developed',
              subtitle: 'Academia',
              color: 'purple-primary',
            },
          ]}
        />
      </div>
    </div>
  );
}
