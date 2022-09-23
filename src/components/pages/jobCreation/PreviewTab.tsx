import React from 'react';
import classNames from 'classnames';
import Button from '~/components/Button';
import { JobStep } from '~/pages/jobs/new';
import { MdModeEdit } from 'react-icons/md';

type PreviewTabProps = {
  className?: string;
  setCurrentStep: (JobStep) => void;
  onChange: () => void;
  jobName: string;
  funding: string;
};

export default function PreviewTab({
  className,
  onChange,
  setCurrentStep,
  jobName,
  funding,
}: PreviewTabProps) {
  return (
    <div className={classNames('', className)}>
      <h4 className="font-bold text-xl">Step 5: Preview job</h4>
      <div className="h-[1px] w-full bg-white/30 my-8" />
      <h4 className="text-sm text-secondary">Job name</h4>
      <div className="flex items-center gap-x-2 font-grifter text-xl mt-4">
        <span className={jobName ? '' : 'text-tertiary'}>
          {jobName || 'N/A'}
        </span>
        <button
          className="hover:text-green-primary"
          onClick={() => setCurrentStep(JobStep.DETAILS)}
        >
          <MdModeEdit className="h-5 w-5 mb-2" />
        </button>
      </div>
      <div className="h-[1px] w-full bg-white/30 my-8" />
      <h4 className="text-sm text-secondary">Funding</h4>
      <div
        className={classNames(
          'flex items-center gap-x-2 font-grifter text-3xl mt-4'
        )}
      >
        e{funding || '0'}
        <button
          className="hover:text-green-primary"
          onClick={() => setCurrentStep(JobStep.FUNDING)}
        >
          <MdModeEdit className="h-5 w-5 mb-2" />
        </button>
      </div>
      <Button
        className="block !px-24 mt-16 ml-auto"
        variant="primary"
        onClick={() => onChange()}
        // TODO: add validation
        disabled={false}
      >
        Post Job
      </Button>
    </div>
  );
}
