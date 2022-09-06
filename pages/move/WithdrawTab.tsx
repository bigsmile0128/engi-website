import React, { useState } from 'react';
import classNames from 'classnames';
import Input from 'components/Input';
import { RiSearchLine } from 'react-icons/ri';
import Checkbox from 'components/Checkbox';
import ButtonSelect from 'components/ButtonSelect';
import { SiBitcoin, SiEthereum, SiLitecoin } from 'react-icons/si';

type WithdrawTabProps = {
  className?: string;
};

enum RepeatFrequency {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  EVERY_OTHER_WEEK = 'EVERY_OTHER_WEEK',
  MONTHLY = 'MONTHLY',
}

const repeatOptions = [
  {
    label: 'Daily',
    value: RepeatFrequency.DAILY,
  },
  {
    label: 'Weekly',
    value: RepeatFrequency.WEEKLY,
  },
  {
    label: 'Every Other Week',
    value: RepeatFrequency.EVERY_OTHER_WEEK,
  },
  {
    label: 'Monthly',
    value: RepeatFrequency.MONTHLY,
  },
];

export default function WithdrawTab({ className }: WithdrawTabProps) {
  const [repeatTransaction, setRepeatTransaction] = useState(false);
  const [repeatFrequency, setRepeatFrequency] =
    useState<RepeatFrequency | null>(RepeatFrequency.DAILY);

  return (
    <div className={classNames('flex flex-col', className)}>
      <CurrencySelect className="" />
      <label htmlFor="wallet-address" className="font-bold text-xl mt-8">
        Wallet Address
      </label>
      <div className="relative mt-2">
        <Input
          className="w-full pl-11"
          type="text"
          name="wallet-address"
          placeholder="Enter a wallet address"
        />
        <RiSearchLine className="text-secondary absolute top-1/2 left-4 -translate-y-1/2 h-5 w-5" />
      </div>
      <Checkbox
        className="font-medium mt-8"
        id="repeat-transaction"
        label="Repeat this transaction"
        checked={repeatTransaction}
        onChange={(repeatTransaction) =>
          setRepeatTransaction(repeatTransaction)
        }
      />
      <ButtonSelect
        className="mt-2"
        options={repeatOptions}
        value={repeatFrequency}
        onChange={(repeatFrequency) => setRepeatFrequency(repeatFrequency)}
        disabled={!repeatTransaction}
      />
    </div>
  );
}

enum Currency {
  BITCOIN = 'BITCOIN',
  ETHEREUM = 'ETHEREUM',
  LITECOIN = 'LITECOIN',
  TETHER = 'TETHER',
}

const currencyOptions = [
  {
    label: 'Bitcoin',
    value: Currency.BITCOIN,
  },
  {
    label: 'Ethereum',
    value: Currency.ETHEREUM,
  },
  {
    label: 'Litecoin',
    value: Currency.LITECOIN,
  },
];

function CurrencySelect({ className }) {
  const [value, setValue] = useState(Currency.BITCOIN);

  return (
    <div className={classNames('flex items-center gap-x-4', className)}>
      {currencyOptions.map((option) => (
        <button
          key={option.value}
          className={classNames(
            'flex-1 flex flex-col items-center justify-center py-6',
            'outline-none focus-visible:ring-1 ring-green-primary/60',
            option.value === value
              ? 'font-bold text-white border border-green-primary'
              : 'font-medium text-white/80 border border-white/20'
          )}
          onClick={() => setValue(option.value)}
        >
          {option.value === Currency.BITCOIN && (
            <SiBitcoin
              className={classNames(
                'h-8 w-8',
                option.value === value ? 'text-green-primary' : ''
              )}
            />
          )}
          {option.value === Currency.ETHEREUM && (
            <SiEthereum
              className={classNames(
                'h-8 w-8',
                option.value === value ? 'text-green-primary' : ''
              )}
            />
          )}
          {option.value === Currency.LITECOIN && (
            <SiLitecoin
              className={classNames(
                'h-8 w-8',
                option.value === value ? 'text-green-primary' : ''
              )}
            />
          )}
          <span className="mt-4">{option.label}</span>
          {option.value === Currency.BITCOIN && (
            <span className="font-normal text-sm mt-2">1 engi - 2000</span>
          )}
          {option.value === Currency.ETHEREUM && (
            <span className="font-normal text-sm mt-2">1 engi - 1000</span>
          )}
          {option.value === Currency.LITECOIN && (
            <span className="font-normal text-sm mt-2">1 engi - 500</span>
          )}
        </button>
      ))}
    </div>
  );
}
