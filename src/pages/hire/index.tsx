import React, { useState } from 'react';
import classNames from 'classnames';
import GridPattern from '~/components/global/GridPattern/GridPattern';
import Steps from '~/components/global/Steps/Steps';
import RepositoryTab from '~/components/pages/jobCreation/RepositoryTab';
import TestsTab from '~/components/pages/jobCreation/TestsTab';
import DetailsTab from '~/components/pages/jobCreation/DetailsTab';
import FundingTab from '~/components/pages/jobCreation/FundingTab';
import PreviewTab from '~/components/pages/jobCreation/PreviewTab';
import IncompleteBanner from '~/components/IncompleteBanner';

type HireProps = {
  className?: string;
};

export enum JobStep {
  REPOSITORY,
  TESTS,
  DETAILS,
  FUNDING,
  PREVIEW,
}

export default function Hire({ className }: HireProps) {
  const [currentStep, setCurrentStep] = useState(JobStep.REPOSITORY);
  const [repoUrl, setRepoUrl] = useState('');
  const [jobName, setJobName] = useState('');
  const [funding, setFunding] = useState('');

  return (
    <div className={classNames('mt-24 mb-24', className)}>
      <div className="max-w-page mb-16">
        <IncompleteBanner />
      </div>
      <div
        className={classNames(
          'max-w-page relative py-12',
          'border border-white/10'
        )}
      >
        <GridPattern className="top-0 left-0" id="new-job-header" offset={-1} />
        <div className="flex flex-col items-center justify-center relative z-10">
          <h1 className="font-grifter text-5xl text-center lg:text-7xl">
            New Engi Job
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
        {currentStep === JobStep.REPOSITORY && (
          <RepositoryTab
            onChange={(repoUrl) => {
              setCurrentStep(JobStep.TESTS);
              setRepoUrl(repoUrl);
            }}
          />
        )}
        {currentStep === JobStep.TESTS && (
          <TestsTab
            onChange={(selectedTests) => {
              // TODO: set selected tests when real data is available
              console.log('selected tests', selectedTests);
              setCurrentStep(JobStep.DETAILS);
            }}
            goBack={() => setCurrentStep(JobStep.REPOSITORY)}
          />
        )}
        {currentStep === JobStep.DETAILS && (
          <DetailsTab
            defaultValue={jobName}
            onChange={({ jobName }) => {
              setJobName(jobName);
              setCurrentStep(JobStep.FUNDING);
            }}
            goBack={() => setCurrentStep(JobStep.TESTS)}
          />
        )}
        {currentStep === JobStep.FUNDING && (
          <FundingTab
            defaultValue={funding}
            onChange={({ funding }) => {
              setFunding(funding);
              setCurrentStep(JobStep.PREVIEW);
            }}
            goBack={() => setCurrentStep(JobStep.DETAILS)}
          />
        )}
        {currentStep === JobStep.PREVIEW && (
          <PreviewTab
            onChange={() => {
              // TODO: connect to job creation API
            }}
            setCurrentStep={setCurrentStep}
            jobName={jobName}
            funding={funding}
          />
        )}
      </div>
    </div>
  );
}
