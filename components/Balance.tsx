import React from 'react';
import classNames from 'classnames';
import EngiIcon from 'components/icons/engi.svg';

type BalanceProps = {
  className?: string;
  isLoading?: boolean;
  value?: number;
};

export default function Balance({ className, value, isLoading }: BalanceProps) {
  // stored internally as fixed point decimal 18 value
  const displayValue =
    typeof value === 'number' ? (value / Math.pow(10, 18)).toFixed(2) : 'N/A';
  return (
    <div className={classNames('flex items-center gap-x-2', className)}>
      <span className="text-emerald-300 h-4 w-4 flex items-center justify-center">
        <EngiIcon />
      </span>
      <span
        className={classNames(
          typeof value === 'number' ? 'font-bold' : 'text-gray-400',
          isLoading ? 'skeleton h-3 bg-[#ffffff22] text-transparent' : ''
        )}
      >
        {displayValue ?? 'N/A'}
      </span>
    </div>
  );
}
