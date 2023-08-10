'use client';

import classNames from 'classnames';
import { useMemo } from 'react';
import 'react-popper-tooltip/dist/styles.css';
import EngiIcon from '~/components/global/icons/EngiIcon';
import { displayAdaInEngi } from '~/utils/currency/conversion';
import Tooltip from './Tooltip';

type EngiAmountProps = {
  className?: string;
  iconClassName?: string;
  isLoading?: boolean;
  modifier?: number;
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
  modifier = 1,
}: EngiAmountProps) {
  const displayValue: string = useMemo(
    () =>
      displayAdaInEngi(
        typeof value === 'string' ? parseFloat(value) : value || 0,
        modifier
      ),
    [value, modifier]
  );

  return (
    <Tooltip
      title={
        <span>
          {typeof value === 'string' ? parseFloat(value) : value || 0} WOZ
        </span>
      }
    >
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
            iconClassName || 'h-3.5 w-auto'
          )}
        />
        <span
          className={classNames(
            'font-grifter text-white',
            {
              'text-secondary': !isLoading && displayValue === 'N/A',
              'text-red-primary': displayValue.startsWith('-'),
            },
            valueClassName || 'text-xl -mb-1 ml-1'
          )}
        >
          {displayValue}
          {suffix}
        </span>
      </div>
    </Tooltip>
  );
}
