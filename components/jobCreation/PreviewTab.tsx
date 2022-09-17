import React, { useState } from 'react';
import classNames from 'classnames';
import Button from 'components/Button';
import Input from 'components/Input';
import EngiAmount from 'components/EngiAmount';
import EngiIcon from 'components/icons/EngiIcon';
import { JobStep } from 'pages/jobs/new';

type PreviewTabProps = {
  className?: string;
  setCurrentStep: (JobStep) => void;
  onChange: () => void;
};

export default function PreviewTab({ className, onChange }: PreviewTabProps) {
  return (
    <div className={classNames('', className)}>
      <h4 className="font-bold text-xl">Step 5: Preview job</h4>
      <Button
        className="block !px-24 mt-16"
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
