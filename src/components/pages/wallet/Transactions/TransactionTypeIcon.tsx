import React from 'react';
import classNames from 'classnames';
import { TransactionType } from '~/types';
import {
  RiArrowUpCircleLine,
  RiExchangeDollarLine,
  RiExchangeLine,
  RiMoneyDollarBoxLine,
} from 'react-icons/ri';

type TransactionTypeIconProps = {
  className?: string;
  isLoading?: boolean;
  value?: TransactionType;
};

export default function TransactionTypeIcon({
  className,
  value,
  isLoading,
}: TransactionTypeIconProps) {
  const classes = classNames('', isLoading ? 'skeleton' : '', className);
  switch (value) {
    case TransactionType.EXCHANGE:
      return <RiExchangeLine className={classes} />;
    case TransactionType.TRANSFER:
      return <RiExchangeDollarLine className={classes} />;
    case TransactionType.SPEND:
      return <RiArrowUpCircleLine className={classes} />;
    case TransactionType.INCOME:
      return <RiMoneyDollarBoxLine className={classes} />;
    default:
      return <div className={classes} />;
  }
}
