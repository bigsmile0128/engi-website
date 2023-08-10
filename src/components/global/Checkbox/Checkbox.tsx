import classNames from 'classnames';
import React from 'react';

export interface CheckboxProps {
  checked: boolean;
  className?: string;
  icon?: React.ReactElement;
  id: string;
  label: string;
  labelClassName?: string;
  onChange: (checked: boolean) => void;
}

export default function Checkbox({
  className,
  icon,
  id,
  label,
  checked,
  onChange,
  labelClassName,
}: CheckboxProps) {
  return (
    <div className={classNames('flex items-center relative', className)}>
      <input
        tabIndex={-1}
        type="checkbox"
        name={id}
        id={id}
        className="opacity-0 absolute h-4 w-4 peer"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div
        tabIndex={0}
        className={classNames(
          'mr-3',
          icon
            ? 'text-white/30 !bg-transparent peer-checked:text-green-primary'
            : 'bg-[#ffffff22] border border-gray-400',
          'w-4 h-4 flex flex-shrink-0 justify-center items-center outline-none',
          'focus-visible:ring-1 ring-green-primary/60'
        )}
        onKeyPress={(e) => {
          if (e.key === ' ') {
            onChange(!checked);
          }
        }}
      >
        {icon || (
          <svg
            className="fill-current hidden w-2 h-2 pointer-events-none"
            version="1.1"
            viewBox="0 0 17 12"
          >
            <g fill="none" fillRule="evenodd">
              <g
                className="fill-gray-700"
                transform="translate(-9 -11)"
                fillRule="nonzero"
              >
                <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
              </g>
            </g>
          </svg>
        )}
      </div>
      <label
        htmlFor={id}
        className={classNames('text-sm text-white select-none', labelClassName)}
      >
        {label}
      </label>
    </div>
  );
}
