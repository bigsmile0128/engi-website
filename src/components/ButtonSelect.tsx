import React from 'react';
import classNames from 'classnames';
import Tag from './global/Tag/Tag';

type Option = {
  label: string;
  value: any;
};

type ButtonSelectProps = {
  buttonClassName?: string;
  className?: string;
  disabled?: boolean;
  onChange: (value) => void;
  options?: Option[];
  tagClassName?: string;
  value?: any;
};

export default function ButtonSelect({
  buttonClassName,
  className,
  options,
  value,
  onChange,
  tagClassName,
  disabled,
}: ButtonSelectProps) {
  return (
    <div className={classNames('flex items-center gap-2', className)}>
      {options.map((option) => (
        <button
          className={classNames(
            'outline-none focus-visible:ring-1 ring-green-primary/60',
            buttonClassName
          )}
          key={option.value}
          onClick={() => onChange(option.value)}
          disabled={disabled}
        >
          <Tag
            className={classNames(
              disabled ? 'text-white/60' : '',
              {
                '!border-green-primary': !disabled && option.value === value,
                'hover:border-green-primary/60':
                  !disabled && option.value !== value,
              },
              tagClassName
            )}
          >
            {option.label}
          </Tag>
        </button>
      ))}
    </div>
  );
}
