import React from 'react';
import classNames from 'classnames';
import Tag from './Tag';

type Option = {
  label: string;
  value: any;
};

type ButtonSelectProps = {
  className?: string;
  options?: Option[];
  value?: any;
  onChange: (value) => void;
  disabled?: boolean;
};

export default function ButtonSelect({
  className,
  options,
  value,
  onChange,
  disabled,
}: ButtonSelectProps) {
  return (
    <div className={classNames('flex items-center gap-2', className)}>
      {options.map((option) => (
        <button
          className="outline-none focus-visible:ring-1 ring-green-primary/60"
          key={option.value}
          onClick={() => onChange(option.value)}
          disabled={disabled}
        >
          <Tag
            className={classNames(disabled ? 'text-white/60' : '', {
              '!border-green-primary': !disabled && option.value === value,
              'hover:border-green-primary/60':
                !disabled && option.value !== value,
            })}
          >
            {option.label}
          </Tag>
        </button>
      ))}
    </div>
  );
}
