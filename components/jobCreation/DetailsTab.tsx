import React, { useState } from 'react';
import classNames from 'classnames';
import Button from 'components/Button';
import Switch from 'components/Switch';
import Checkbox from 'components/Checkbox';
import Input from 'components/Input';

type DetailsTabProps = {
  className?: string;
  onChange: ({ jobName }) => void;
  goBack: () => void;
};

export default function DetailsTab({
  className,
  onChange,
  goBack,
}: DetailsTabProps) {
  const [jobName, setJobName] = useState('');

  return (
    <div className={classNames('', className)}>
      <h4 className="font-bold text-xl">Step 3: Job Details</h4>
      <label className="block font-bold text-xl mt-12" htmlFor="job-name">
        Name of the job
      </label>
      <Input
        id="job-name"
        className="block mt-4 w-full max-w-sm"
        type="text"
        placeholder="Name of the job"
        value={jobName}
        onChange={(e) => setJobName(e.target.value)}
      />
      <Button
        className="block !px-24 mt-8"
        variant="primary"
        onClick={() => onChange({ jobName })}
        disabled={!jobName}
      >
        Continue
      </Button>
      <button className="mt-8 font-bold underline" onClick={goBack}>
        Back
      </button>
    </div>
  );
}
