'use client';

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
import { BitCreationStep } from '~/types';

export default function Hire() {
  const [currentStep, setCurrentStep] = useState(BitCreationStep.REPOSITORY);
  const [, setRepoUrl] = useState('');
  const [bitName, setBitName] = useState('');
  const [funding, setFunding] = useState('');

  return (
    <div className={classNames('mt-24 mb-24')}>
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
        {currentStep === BitCreationStep.REPOSITORY && (
          <RepositoryTab
            onChange={(repoUrl) => {
              setCurrentStep(BitCreationStep.TESTS);
              setRepoUrl(repoUrl);
            }}
          />
        )}
        {currentStep === BitCreationStep.TESTS && (
          <TestsTab
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onChange={(selectedTests) => {
              // TODO: set selected tests when real data is available
              setCurrentStep(BitCreationStep.DETAILS);
            }}
            goBack={() => setCurrentStep(BitCreationStep.REPOSITORY)}
          />
        )}
        {currentStep === BitCreationStep.DETAILS && (
          <DetailsTab
            defaultValue={bitName}
            onChange={({ bitName }) => {
              setBitName(bitName);
              setCurrentStep(BitCreationStep.FUNDING);
            }}
            goBack={() => setCurrentStep(BitCreationStep.TESTS)}
          />
        )}
        {currentStep === BitCreationStep.FUNDING && (
          <FundingTab
            defaultValue={funding}
            onChange={({ funding }) => {
              setFunding(funding);
              setCurrentStep(BitCreationStep.PREVIEW);
            }}
            goBack={() => setCurrentStep(BitCreationStep.DETAILS)}
          />
        )}
        {currentStep === BitCreationStep.PREVIEW && (
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
