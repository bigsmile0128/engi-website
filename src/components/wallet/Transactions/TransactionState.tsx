import React from 'react';
import classNames from 'classnames';

type TransactionStateProps = {
  className?: string;
  isLoading?: boolean;
  value?: boolean;
};

export default function TransactionState({
  className,
  isLoading,
  value,
}: TransactionStateProps) {
  return (
    <div
      className={classNames(
        'flex items-center justify-center px-4 h-8',
        'font-medium text-sm',
        {
          'children:skeleton text-transparent bg-black/10': isLoading,
          'bg-green-primary/10 text-green-primary': !isLoading && value,
          'bg-red-primary/10 text-red-primary': !isLoading && !value,
        },
        className
      )}
    >
      {value ? 'Success' : 'Failure'}
    </div>
  );
}
