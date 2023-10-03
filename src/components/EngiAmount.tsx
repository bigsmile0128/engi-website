'use client';

import classNames from 'classnames';
import { useMemo } from 'react';
import 'react-popper-tooltip/dist/styles.css';
import EngiIcon from '~/components/global/icons/EngiIcon';
import { displayAdaInEngi, wozToEngi } from '~/utils/currency/conversion';
import Tooltip from './Tooltip';
import axios from 'axios';
import { useQuery } from 'react-query';

type EngiAmountProps = {
  className?: string;
  formatter?: Intl.NumberFormat;
  iconClassName?: string;
  isCurrencyVisible?: boolean;
  isLoading?: boolean;
  modifier?: number;
  suffix?: string;
  value?: number | string;
  valueClassName?: string;
};

const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export default function EngiAmount({
  className,
  formatter = usdFormatter,
  iconClassName,
  isCurrencyVisible = false,
  valueClassName,
  value,
  isLoading,
  suffix,
  modifier = 1,
}: EngiAmountProps) {
  const { data: exchangeRates } = useQuery<any, any>(
    ['exchangeRates'],
    async () => {
      const response = await axios.get('/api/exchange');
      return response.data.data.data.rates;
    }
  );

  const engiValue = wozToEngi(
    typeof value === 'string' ? parseFloat(value) : value || 0
  );

  const displayValue: string = useMemo(
    () =>
      displayAdaInEngi(
        typeof value === 'string' ? parseFloat(value) : value || 0,
        modifier
      ),
    [value, modifier]
  );

  const usdValue = exchangeRates?.USD
    ? engiValue * parseFloat(exchangeRates.USD)
    : '';

  return (
    <Tooltip
      title={
        <div className="flex flex-col items-end font-mono whitespace-pre">
          <span>
            {engiValue.toFixed(2)} {'ETH/ENGI'.padStart(4, ' ')}
          </span>
          {usdValue && (
            <span>
              {usdValue.toFixed(2)} {'USD'.padStart(4, ' ')}
            </span>
          )}
          <span>
            {typeof value === 'string' ? parseFloat(value) : value || 0}{' '}
            {'WOZ'.padStart(4, ' ')}
          </span>
        </div>
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
          {isCurrencyVisible && usdValue && ` (${formatter.format(usdValue)})`}
        </span>
      </div>
    </Tooltip>
  );
}
