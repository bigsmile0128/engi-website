import React from 'react';
import classNames from 'classnames';
import EngiIcon from './icons/EngiIcon';

type EngiAmountProps = {
  className?: string;
  iconClassName?: string;
  valueClassName?: string;
  isLoading?: boolean;
  value?: string;
};

export default function EngiAmount({
  className,
  iconClassName,
  valueClassName,
  value,
  isLoading,
}: EngiAmountProps) {
  // stored as fixed point decimal 18 value in D40 string
  // e.g. 0000000000000000000000000000000000000001
  // use first 24 digits to display 2 decimal places because the rightmost 18 represent decimals
  // remove leading zeros
  const displayValue =
    value?.length === 40
      ? (value.slice(0, 22) + '.' + value.slice(22, 24)).replace(/^0{0,21}/, '')
      : 'N/A';

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
