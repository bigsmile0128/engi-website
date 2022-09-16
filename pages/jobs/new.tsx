import React, { useState } from 'react';
import classNames from 'classnames';
import GridPattern from 'components/GridPattern';
import Steps from 'components/Steps';
import RepositoryTab from 'components/jobCreation/RepositoryTab';

type NewJobProps = {
  className?: string;
};

export default function NewJob({ className }: NewJobProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [repoUrl, setRepoUrl] = useState('');
  return (
    <div className={classNames('mt-24 mb-24', className)}>
      <div
        className={classNames(
          'max-w-page relative py-12',
          'border border-white/10'
        )}
      >
        <GridPattern className="top-0 left-0" id="new-job-header" offset={-1} />
        <div className="flex flex-col items-center justify-center relative z-10">
          <h1 className="font-grifter text-3xl sm:text-5xl lg:text-7xl">
            Web UI + Figma job
          </h1>
          <Steps
            className="mt-8"
            current={currentStep}
            onChange={setCurrentStep}
            steps={[
              { title: 'Repository' },
              { title: 'Tests' },
              { title: 'Details' },
              { title: 'Funding' },
              { title: 'Preview' },
            ]}
          />
        </div>
      </div>
      <div className="max-w-page md:!max-w-xl mt-12">
        {currentStep === 0 && (
          <RepositoryTab
            onChange={(repoUrl) => {
              setCurrentStep(1);
              setRepoUrl(repoUrl);
            }}
          />
        )}
      </div>
    </div>
  );
}
