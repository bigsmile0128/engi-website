import React from 'react';
import classNames from 'classnames';
import { startCase } from 'lodash';

import { TransactionType } from '~/types';
import Tag from '~/components/global/Tag/Tag';
import TransactionTypeIcon from './TransactionTypeIcon';

type TransactionTypeTagProps = {
  className?: string;
  isLoading?: boolean;
  value?: TransactionType;
  valueClassName?: string;
};

export default function TransactionTypeTag({
  className,
  isLoading,
  value,
  valueClassName,
}: TransactionTypeTagProps) {
  return (
    <Tag
      className={classNames(
        'flex items-center gap-x-2 py-0 h-8',
        isLoading ? 'children:skeleton' : '',
        className
      )}
    >
      <TransactionTypeIcon value={value} className="h-5 w-5" />
      <span className={valueClassName}>
        {startCase((value ?? '').toLowerCase())}
      </span>
    </Tag>
  );
}
