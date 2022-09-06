import React, { useState } from 'react';
import classNames from 'classnames';
import Input from 'components/Input';
import { RiSearchLine } from 'react-icons/ri';
import Checkbox from 'components/Checkbox';
import ButtonSelect from 'components/ButtonSelect';

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
      <label htmlFor="wallet-address" className="font-bold text-xl">
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
