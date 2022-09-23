import React, { useState } from 'react';
import classNames from 'classnames';
import Button from '~/components/global/Button/Button';
import Switch from '~/components/global/Switch/Switch';
import Checkbox from '~/components/Checkbox';

type TestsTabProps = {
  className?: string;
  onChange: (selectedTests: any[]) => void;
  goBack: () => void;
};

export default function TestsTab({
  className,
  onChange,
  goBack,
}: TestsTabProps) {
  const [isShowPreview, setIsShowPreview] = useState(false);
  const [selectedTests, setSelectedTests] = useState<Set<string>>(new Set());

  return (
    <div className={classNames('', className)}>
      <h4 className="font-bold text-xl">
        Step 2: Select from the following stories and components that should be
        editable.
      </h4>
      <Switch
        className="mt-4"
        checked={isShowPreview}
        onChange={setIsShowPreview}
        label="Show all previews"
      />
      <div className="mt-8 flex flex-col gap-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-x-4 px-4 py-2 bg-black/[.14]"
          >
            <Checkbox
              checked={selectedTests.has(i.toString())}
              onChange={() => {
                const newSelectedTests = new Set(selectedTests);
                if (selectedTests.has(i.toString())) {
                  newSelectedTests.delete(i.toString());
                } else {
                  newSelectedTests.add(i.toString());
                }
                setSelectedTests(newSelectedTests);
              }}
              id={i.toString()}
              label={`Component ${i + 1}`}
              labelClassName="font-medium text-base ml-2"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-x-4 mt-8">
        <Button className="" onClick={goBack}>
          Back
        </Button>
        <Button
          className="block !px-24"
          variant="primary"
          onClick={() => onChange(Array.from(selectedTests))}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
