import React from 'react';
import classNames from 'classnames';
import Button from '~/components/global/Button/Button';
import { MdModeEdit } from 'react-icons/md';
import { BitCreationStep } from '~/types';

type PreviewTabProps = {
  bitName: string;
  className?: string;
  funding: string;
  onChange: () => void;
  setCurrentStep: (BitCreationStep) => void;
};

export default function PreviewTab({
  className,
  onChange,
  setCurrentStep,
  bitName,
  funding,
}: PreviewTabProps) {
  return (
    <div className={classNames('', className)}>
      <h4 className="font-bold text-xl">Step 5: Preview bit</h4>
      <div className="h-[1px] w-full bg-white/30 my-8" />
      <h4 className="text-sm text-secondary">Bit name</h4>
      <div className="flex items-center gap-x-2 font-grifter text-xl mt-4">
        <span className={bitName ? '' : 'text-tertiary'}>
          {bitName || 'N/A'}
        </span>
        <button
          className="hover:text-green-primary"
          onClick={() => setCurrentStep(BitCreationStep.DETAILS)}
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
          onClick={() => setCurrentStep(BitCreationStep.FUNDING)}
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
        Post Bounty
      </Button>
    </div>
  );
}
