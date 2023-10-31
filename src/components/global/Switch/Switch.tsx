import React from 'react';
import classNames from 'classnames';
import { Switch as BaseSwitch } from '@headlessui/react';

type SwitchProps = {
  checked: boolean;
  className?: string;
  label?: string;
  onChange: (checked: boolean) => void;
};

export default function Switch({
  className,
  checked,
  label,
  onChange,
}: SwitchProps) {
  return (
    <BaseSwitch.Group>
      <div className={classNames('flex items-center', className)}>
        <BaseSwitch
          checked={checked}
          onChange={onChange}
          className={classNames(
            'relative inline-flex h-[18px] w-[42px] items-center rounded-full',
            checked ? 'bg-orange-primary' : 'bg-white/10'
          )}
        >
          <span
            className={classNames(
              'inline-block h-3.5 w-3.5 transform rounded-full bg-white transition shadow-2xl',
              checked ? 'translate-x-[26px]' : 'translate-x-[2px]'
            )}
          />
        </BaseSwitch>
        {label && (
          <BaseSwitch.Label className="ml-4 font-medium">
            {label}
          </BaseSwitch.Label>
        )}
      </div>
    </BaseSwitch.Group>
  );
}
