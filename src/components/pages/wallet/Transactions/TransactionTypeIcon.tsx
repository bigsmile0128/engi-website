import classNames from 'classnames';
import {
  RiArrowRightCircleLine,
  RiArrowUpCircleLine,
  RiExchangeDollarLine,
  RiExchangeLine,
  RiInformationLine,
  RiMoneyDollarBoxLine,
} from 'react-icons/ri';
import Tooltip from '~/components/Tooltip';
import { TransactionType } from '~/types';

type TransactionTypeIconProps = {
  className?: string;
  isLoading?: boolean;
  showTooltip?: boolean;
  value?: TransactionType;
};

export default function TransactionTypeIcon({
  className,
  value,
  isLoading,
  showTooltip = false,
}: TransactionTypeIconProps) {
  const classes = classNames('', isLoading ? 'skeleton' : '', className);
  let icon: JSX.Element;

  switch (value) {
    case TransactionType.EXCHANGE:
      icon = <RiExchangeLine className={classes} />;
      break;
    case TransactionType.TRANSFER:
      icon = <RiArrowRightCircleLine className={classes} />;
      break;
    case TransactionType.BUY:
      icon = <RiExchangeDollarLine className={classes} />;
      break;
    case TransactionType.SPEND:
      icon = <RiArrowUpCircleLine className={classes} />;
      break;
    case TransactionType.INCOME:
      icon = <RiMoneyDollarBoxLine className={classes} />;
      break;
    default:
      icon = <RiInformationLine className={classes} />;
  }
  if (showTooltip) {
    return (
      <Tooltip title={value}>
        <span>{icon}</span>
      </Tooltip>
    );
  }

  return icon;
}
