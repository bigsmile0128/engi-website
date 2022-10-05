import React, { useMemo } from 'react';
import classNames from 'classnames';
import EngiIcon from '~/components/global/icons/EngiIcon';
import { displayAdaInEngi } from '~/utils/currency/conversion';

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
  let displayValue: string = useMemo(
    () =>
      displayAdaInEngi(typeof value === 'string' ? parseFloat(value) : value),
    [value]
  );

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
