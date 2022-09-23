import React from 'react';
import classNames from 'classnames';
import { startCase } from 'lodash';

import { TransactionType } from '~/types';
import {
  RiArrowUpCircleLine,
  RiExchangeDollarLine,
  RiExchangeLine,
  RiMoneyDollarBoxLine,
} from 'react-icons/ri';
import Tag from '~/components/global/Tag/Tag';

type TransactionTypeTagProps = {
  className?: string;
  isLoading?: boolean;
  value?: TransactionType;
};

export default function TransactionTypeTag({
  className,
  isLoading,
  value,
}: TransactionTypeTagProps) {
  let icon;
  switch (value) {
    case TransactionType.EXCHANGE:
      icon = <RiExchangeLine className="h-5 w-5" />;
      break;
    case TransactionType.TRANSFER:
      icon = <RiExchangeDollarLine className="h-5 w-5" />;
      break;
    case TransactionType.SPEND:
      icon = <RiArrowUpCircleLine className="h-5 w-5" />;
      break;
    case TransactionType.INCOME:
      icon = <RiMoneyDollarBoxLine className="h-5 w-5" />;
      break;
    default:
      icon = <div className="h-5 w-5" />;
  }
  return (
    <Tag
      className={classNames(
        'flex items-center gap-x-2 py-0 h-8',
        isLoading ? 'children:skeleton' : '',
        className
      )}
    >
      {icon}
      <span className="text">{startCase((value ?? '').toLowerCase())}</span>
    </Tag>
  );
}
