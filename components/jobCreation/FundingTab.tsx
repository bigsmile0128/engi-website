import React, { useState } from 'react';
import classNames from 'classnames';
import Button from 'components/Button';
import Input from 'components/Input';
import EngiAmount from 'components/EngiAmount';
import EngiIcon from 'components/icons/EngiIcon';

type FundingTabProps = {
  className?: string;
  onChange: ({ funding }) => void;
  goBack: () => void;
};

export default function FundingTab({
  className,
  onChange,
  goBack,
}: FundingTabProps) {
  const [funding, setFunding] = useState('');

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
      <div className="flex items-end mt-12">
        <EngiIcon className="h-8 w-8 text-green-primary mb-[18px] mr-1" />
        <input
          id="funding"
          className={classNames(
            'block w-48 mt-4',
            'font-grifter text-6xl',
            'bg-transparent border-b border-white/30',
            'outline-none focus-visible:border-b-green-primary'
          )}
          type="number"
          placeholder="0.00"
          value={funding}
          onChange={(e) => setFunding(e.target.value)}
        />
      </div>
      <Button
        className="block !px-24 mt-16"
        variant="primary"
        onClick={() => onChange({ funding })}
        disabled={!funding}
      >
        Continue
      </Button>
      <button className="mt-8 font-bold underline" onClick={goBack}>
        Back
      </button>
    </div>
  );
}
