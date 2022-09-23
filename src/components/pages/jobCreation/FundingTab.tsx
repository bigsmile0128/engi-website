import React, { useState } from 'react';
import classNames from 'classnames';
import Button from '~/components/global/Button/Button';
import EngiAmount from '~/components/EngiAmount';

type FundingTabProps = {
  className?: string;
  onChange: ({ funding }) => void;
  goBack: () => void;
  defaultValue?: string;
};

export default function FundingTab({
  className,
  onChange,
  goBack,
  defaultValue,
}: FundingTabProps) {
  const [funding, setFunding] = useState(defaultValue ?? '');

  return (
    <div className={classNames('', className)}>
      <div className="flex flex-col sm:flex-row sm:items-start gap-x-8 gap-y-4">
        <div>
          <h4 className="font-bold text-xl">Step 4: Add funding</h4>
          <p className="text-secondary mt-4">
            Enter existing repository URL for creating a new job. The directory
            must be a Rust project and have a .git directory.
          </p>
        </div>
        <div className="py-4 px-8 bg-black/[.14]">
          <span className="text-lg text-secondary whitespace-nowrap">
            Wallet Balance
          </span>
          <EngiAmount className="mt-4" value={123} />
        </div>
      </div>
      <div className="flex items-end mt-12 font-grifter text-6xl">
        <span className="mr-1">e</span>
        <input
          id="funding"
          className={classNames(
            'block w-48 mt-4',
            'bg-transparent border-b border-white/30',
            'outline-none focus-visible:border-b-green-primary'
          )}
          type="number"
          placeholder="0.00"
          value={funding}
          onChange={(e) => setFunding(e.target.value)}
        />
      </div>
      <div className="flex justify-end gap-x-4 mt-16">
        <Button className="" onClick={goBack}>
          Back
        </Button>
        <Button
          className="block !px-24"
          variant="primary"
          onClick={() => onChange({ funding })}
          disabled={!funding}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
