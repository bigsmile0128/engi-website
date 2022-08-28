import React from 'react';
import classNames from 'classnames';
import { AiTwotoneCalendar } from 'react-icons/ai';
import dayjs from 'dayjs';

const localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat);

type TransactionTimeProps = {
  className?: string;
  iconClassName?: string;
  valueClassName?: string;
  isLoading?: boolean;
  value?: string;
};

export default function TransactionTime({
  className,
  isLoading,
  value,
  iconClassName,
  valueClassName,
}: TransactionTimeProps) {
  return (
    <div className={classNames('flex items-start gap-x-2', className)}>
      <AiTwotoneCalendar
        className={classNames(
          'h-4 w-4 mt-0.5 text-secondary',
          isLoading ? 'skeleton' : '',
          iconClassName
        )}
      />
      <div
        className={classNames(
          'flex gap-x-1 gap-y-0.5 text-sm whitespace-nowrap',
          isLoading ? 'children:skeleton' : '',
          valueClassName
        )}
      >
        <span>{dayjs(value).format('ll')}</span>
        <span>{dayjs(value).format('h:mm A')}</span>
      </div>
    </div>
  );
}
