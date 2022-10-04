import React from 'react';
import classNames from 'classnames';
import EngiIcon from '~/components/global/icons/EngiIcon';

type EngiAmountProps = {
  className?: string;
  iconClassName?: string;
  isLoading?: boolean;
  suffix?: string;
  value?: number | string;
  valueClassName?: string;
};

export default function EngiAmount({
  className,
  iconClassName,
  valueClassName,
  value,
  isLoading,
  suffix,
}: EngiAmountProps) {
  let displayValue: string;

  // returned as fixed point decimal 18 value in D40 string for Jobs
  // e.g. 0000000000000000000000000000000000000001
  // use first 24 digits to display 2 decimal places because the rightmost 18 represent decimals
  // remove leading zeros
  if (typeof value === 'string') {
    displayValue =
      value.length === 40
        ? (value.slice(0, 22) + '.' + value.slice(22, 24)).replace(
            /^0{0,21}/,
            ''
          )
        : 'N/A';
  } else {
    // if returned as number, display latest two decimal places
    displayValue = (value / Math.pow(10, 18)).toFixed(2);
  }

  return (
    <div
      className={classNames(
        'flex items-center whitespace-nowrap',
        isLoading ? 'children:skeleton' : '',
        className
      )}
    >
      <EngiIcon
        className={classNames(
          'text-green-primary',
          iconClassName || 'h-3.5 w-3.5'
        )}
      />
      <span
        className={classNames(
          {
            'text-secondary': !isLoading && displayValue === 'N/A',
          },
          valueClassName || 'font-grifter text-xl text-white -mb-1 ml-1'
        )}
      >
        {displayValue}
        {suffix}
      </span>
    </div>
  );
}
