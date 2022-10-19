import React, { useMemo } from 'react';
import classNames from 'classnames';
import EngiIcon from '~/components/global/icons/EngiIcon';
import { displayAdaInEngi } from '~/utils/currency/conversion';
import { v4 as uuidv4 } from 'uuid';
import dynamic from 'next/dynamic';

const ReactTooltip = dynamic(() => import('react-tooltip'), {
  ssr: false,
});

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
        typeof value === 'string' ? parseFloat(value) : value,
        modifier
      ),
    [value, modifier]
  );

  const id = useMemo(() => uuidv4(), []);

  return (
    <div
      className={classNames(
        'flex items-center whitespace-nowrap',
        isLoading ? 'children:skeleton' : '',
        className
      )}
      data-tip={`${value || 0} ADA`}
      data-tip-disabled={isLoading}
      data-place="bottom"
      data-class="font-medium"
      data-effect="solid"
      data-for={id}
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
      <ReactTooltip id={id} />
    </div>
  );
}
