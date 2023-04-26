import React, { useState } from 'react';
import classNames from 'classnames';
import GridPattern from '~/components/global/GridPattern/GridPattern';
import Steps from '~/components/global/Steps/Steps';
import RepositoryTab from '~/components/pages/bitCreation/RepositoryTab';
import TestsTab from '~/components/pages/bitCreation/TestsTab';
import DetailsTab from '~/components/pages/bitCreation/DetailsTab';
import FundingTab from '~/components/pages/bitCreation/FundingTab';
import PreviewTab from '~/components/pages/bitCreation/PreviewTab';
import IncompleteBanner from '~/components/IncompleteBanner';

type HireProps = {
  className?: string;
};

export enum BitStep {
  REPOSITORY,
  TESTS,
  DETAILS,
  FUNDING,
  PREVIEW,
}

export default function Hire({ className }: HireProps) {
  const [currentStep, setCurrentStep] = useState(BitStep.REPOSITORY);
  const [, setRepoUrl] = useState('');
  const [bitName, setBitName] = useState('');
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
        <GridPattern className="top-0 left-0" id="new-bit-header" offset={-1} />
        <div className="flex flex-col items-center justify-center relative z-10">
          <h1 className="font-grifter text-5xl text-center lg:text-7xl">
            New Engi Bit
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
        {currentStep === BitStep.REPOSITORY && (
          <RepositoryTab
            onChange={(repoUrl) => {
              setCurrentStep(BitStep.TESTS);
              setRepoUrl(repoUrl);
            }}
          />
        )}
        {currentStep === BitStep.TESTS && (
          <TestsTab
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onChange={(selectedTests) => {
              // TODO: set selected tests when real data is available
              setCurrentStep(BitStep.DETAILS);
            }}
            goBack={() => setCurrentStep(BitStep.REPOSITORY)}
          />
        )}
        {currentStep === BitStep.DETAILS && (
          <DetailsTab
            defaultValue={bitName}
            onChange={({ bitName }) => {
              setBitName(bitName);
              setCurrentStep(BitStep.FUNDING);
            }}
            goBack={() => setCurrentStep(BitStep.TESTS)}
          />
        )}
        {currentStep === BitStep.FUNDING && (
          <FundingTab
            defaultValue={funding}
            onChange={({ funding }) => {
              setFunding(funding);
              setCurrentStep(BitStep.PREVIEW);
            }}
            goBack={() => setCurrentStep(BitStep.DETAILS)}
          />
        )}
        {currentStep === BitStep.PREVIEW && (
          <PreviewTab
            onChange={() => {
              // TODO: connect to bit creation API
            }}
            setCurrentStep={setCurrentStep}
            bitName={bitName}
            funding={funding}
          />
        )}
      </div>
    </div>
  );
}
