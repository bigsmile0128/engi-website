import React, { useMemo, useState } from 'react';
import classNames from 'classnames';
import EngiIcon from '~/components/global/icons/EngiIcon';
import Input from '~/components/global/Input/Input';
import Button from '~/components/global/Button/Button';
import { RiSearchLine } from 'react-icons/ri';
import { useConnectEthereumExtension } from '~/utils/ethereum/extension';
import { useBuyEngiWithEth } from '~/utils/ethereum/purchase';

type BuyEngiProps = {
  account: string;
  className?: string;
  iconClassName?: string;
  valueClassName?: string;
  isLoading?: boolean;
  value?: string;
};

export default function BuyEngi({
  className,
  iconClassName,
  valueClassName,
  isLoading,
  // currently signed in user's substrate wallet address
  account,
}: BuyEngiProps) {
  // the value to purchase in WEI
  const [value, setValue] = useState(0);
  // handles unexpected NaN
  const displayValue = useMemo(() => value / Math.pow(10, 18) || 0, [value]);
  const { data: ethereumAccounts } = useConnectEthereumExtension();
  const { mutate: buy } = useBuyEngiWithEth();

  return (
    <div
      className={classNames(
        'flex-col items-center whitespace-nowrap',
        isLoading ? 'children:skeleton' : '',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex-col">
          <label htmlFor="wallet-address" className="font-bold text-xl">
            How much would you like to purchase?
          </label>
          <div className="relative mt-2">
            <Input
              className="w-full pl-11"
              type="number"
              name="wallet-address"
              placeholder="Enter ETH"
              // display WEI in ETH
              // - unpin value when NaN, undefined, or start of decimal
              //   for easy clearing and starting of fractional purchase
              //   amount
              // - shows placeholder or raw input when unset
              {...(value && { value: displayValue })}
              onChange={({ target }) => {
                // @ts-ignore because isNaN handles strings isNaN('.1') is false, isNaN('1a') is true
                if (isNaN(target.value)) return;

                // set as wei
                setValue(parseFloat(target.value) * Math.pow(10, 18));
              }}
            />
            <RiSearchLine className="text-secondary absolute top-1/2 left-4 -translate-y-1/2 h-5 w-5" />
          </div>
        </div>
        <div className="flex items-center flex-1 justify-center mt-8">
          <EngiIcon
            className={classNames('h-5 w-5 text-green-primary', iconClassName)}
          />
          <span
            className={classNames(
              'font-grifter text-2xl text-white -mb-1 ml-1',
              valueClassName
            )}
          >
            {displayValue}
          </span>
        </div>
      </div>
      <Button
        onClick={() =>
          buy({ account, from: ethereumAccounts?.[0], amount: value })
        }
        disabled={!ethereumAccounts || ethereumAccounts.length == 0}
      >
        buy
      </Button>
    </div>
  );
}
