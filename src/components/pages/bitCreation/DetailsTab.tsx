import React, { useState } from 'react';
import classNames from 'classnames';
import Button from '~/components/global/Button/Button';
import Input from '~/components/global/Input/Input';

type DetailsTabProps = {
  className?: string;
  defaultValue?: string;
  goBack: () => void;
  onChange: ({ bitName }) => void;
};

export default function DetailsTab({
  className,
  onChange,
  goBack,
  defaultValue,
}: DetailsTabProps) {
  const [bitName, setBitName] = useState(defaultValue ?? '');

  return (
    <div className={classNames('', className)}>
      <h4 className="font-bold text-xl">Step 3: Bit Details</h4>
      <label className="block font-bold text-xl mt-12" htmlFor="bit-name">
        Name of the bit
      </label>
      <Input
        id="bit-name"
        className="block mt-4 w-full max-w-sm"
        type="text"
        placeholder="Name of the bit"
        value={bitName}
        onChange={(e) => setBitName(e.target.value)}
      />
      <div className="flex justify-end gap-x-4 mt-8">
        <Button className="" onClick={goBack}>
          Back
        </Button>
        <Button
          className="block !px-24"
          variant="primary"
          onClick={() => onChange({ bitName })}
          disabled={!bitName}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
