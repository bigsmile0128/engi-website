'use client';

import React from 'react';
import classNames from 'classnames';
import GridPattern from '~/components/global/GridPattern/GridPattern';
import Steps from '~/components/global/Steps/Steps';
import { usePathname, useRouter } from 'next/navigation';
import _ from 'lodash';

type NavProps = {
  className?: string;
  disabled?: boolean;
  draftId: string;
};

enum Step {
  DETAILS = 'DETAILS',
  FUNDING = 'FUNDING',
  PREVIEW = 'PREVIEW',
  REPOSITORY = 'REPOSITORY',
  TESTS = 'TESTS',
}

const pathToStep = {
  tests: Step.TESTS,
  details: Step.DETAILS,
  funding: Step.FUNDING,
  preview: Step.PREVIEW,
  repository: Step.REPOSITORY,
};
const stepToPath = _.invert(pathToStep);

export default function Nav({ className, draftId, disabled }: NavProps) {
  const router = useRouter();
  const pathname = usePathname();
  const currentPath = (pathname ?? '').replace(/^.*\//, '');

  let current;
  switch (currentPath) {
    case 'tests':
      current = Step.TESTS;
      break;
    case 'details':
      current = Step.DETAILS;
      break;
    case 'funding':
      current = Step.FUNDING;
      break;
    case 'preview':
      current = Step.PREVIEW;
      break;
    default:
      current = Step.REPOSITORY;
  }

  return (
    <div className={classNames('', className)}>
      <div
        className={classNames(
          'max-w-page relative py-12',
          'border border-white/10'
        )}
      >
        <GridPattern className="top-0 left-0" id="draft-header" offset={-1} />
        <div className="flex flex-col items-center justify-center relative z-10">
          <h1 className="font-grifter text-5xl text-center lg:text-7xl">
            New Engi Bounty
          </h1>
          <Steps
            className="mt-8"
            current={current}
            onChange={(value) => {
              const path = stepToPath[value] ?? '';
              router.push(`/hire/${encodeURIComponent(draftId)}/${path}`);
            }}
            steps={[
              { title: 'Repository', value: Step.REPOSITORY, disabled },
              { title: 'Tests', value: Step.TESTS, disabled },
              { title: 'Details', value: Step.DETAILS, disabled },
              { title: 'Funding', value: Step.FUNDING, disabled },
              { title: 'Preview', value: Step.PREVIEW, disabled },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
