import React, { useState } from 'react';
import classNames from 'classnames';
import Button from 'components/Button';
import Input from 'components/Input';

type DetailsTabProps = {
  className?: string;
  onChange: ({ jobName }) => void;
  goBack: () => void;
  defaultValue?: string;
};

export default function DetailsTab({
  className,
  onChange,
  goBack,
  defaultValue,
}: DetailsTabProps) {
  const [jobName, setJobName] = useState(defaultValue ?? '');

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
      <div className="flex justify-end gap-x-4 mt-8">
        <Button className="" onClick={goBack}>
          Back
        </Button>
        <Button
          className="block !px-24"
          variant="primary"
          onClick={() => onChange({ jobName })}
          disabled={!jobName}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
