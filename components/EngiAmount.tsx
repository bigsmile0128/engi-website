import React from 'react';
import classNames from 'classnames';
import EngiIcon from './icons/EngiIcon';

type EngiAmountProps = {
  className?: string;
  iconClassName?: string;
  valueClassName?: string;
  isLoading?: boolean;
  value?: number;
};

export default function EngiAmount({
  className,
  iconClassName,
  valueClassName,
  value,
  isLoading,
}: EngiAmountProps) {
  // stored internally as fixed point decimal 18 value
  const displayValue =
    typeof value === 'number' ? (value / Math.pow(10, 18)).toFixed(2) : 'N/A';

  return (
    <div
      className={classNames(
        'flex items-center whitespace-nowrap',
        isLoading ? 'children:skeleton' : '',
        className
      )}
    >
      <EngiIcon
        className={classNames('h-3.5 w-3.5 text-green-primary', iconClassName)}
      />
      <span
        className={classNames(
          'font-grifter text-xl text-white -mb-1 ml-1',
          {
            'text-secondary': !isLoading && displayValue === 'N/A',
          },
          valueClassName
        )}
      >
        {displayValue}
      </span>
    </div>
  );
}
