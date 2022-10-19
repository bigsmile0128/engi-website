import React, { useState } from 'react';
import classNames from 'classnames';
import Input from '~/components/global/Input/Input';
import { RiArrowLeftRightLine } from 'react-icons/ri';
import Checkbox from '~/components/global/Checkbox/Checkbox';
import ButtonSelect from '~/components/ButtonSelect';
import { SiBitcoin, SiEthereum, SiLitecoin } from 'react-icons/si';
import Button from '~/components/global/Button/Button';
import WalletInput from './WalletInput';
import IncompleteBanner from '~/components/IncompleteBanner';

type WithdrawTabProps = {
  className?: string;
};

enum RepeatFrequency {
  DAILY = 'DAILY',
  EVERY_OTHER_WEEK = 'EVERY_OTHER_WEEK',
  MONTHLY = 'MONTHLY',
  WEEKLY = 'WEEKLY',
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
      <IncompleteBanner className="mb-4" />
      <CurrencySelect className="" />
      <WalletInput className="mt-8" />
      <label htmlFor="amount" className="mt-8 font-bold text-xl">
        {"What's the amount?"}
      </label>
      <div className="flex items-center mt-2 gap-x-4">
        <div className="relative flex-1">
          <Input
            className="pr-20 w-full"
            type="number"
            name="amount"
            placeholder="0.00"
          />
          <Button
            variant="tag"
            className="absolute top-1/2 right-3 -translate-y-1/2"
          >
            Max
          </Button>
        </div>
        <button className="hover:text-green-primary">
          <RiArrowLeftRightLine className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <Input
            className=""
            type="number"
            name="converted"
            placeholder="0.00"
          />
        </div>
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
