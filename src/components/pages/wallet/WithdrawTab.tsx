import classNames from 'classnames';
import { useCallback, useState, useEffect, useRef } from 'react';
import { RiArrowLeftRightLine } from 'react-icons/ri';
import { SiBitcoin, SiEthereum, SiTether } from 'react-icons/si';
import ButtonSelect from '~/components/ButtonSelect';
import IncompleteBanner from '~/components/IncompleteBanner';
import Button from '~/components/global/Button/Button';
import Checkbox from '~/components/global/Checkbox/Checkbox';
import Input from '~/components/global/Input/Input';
import WalletInput from './WalletInput';
import { toast } from 'react-toastify';

import DatePicker from '~/components/DatePicker';
import { useSellEngiForEth } from '~/utils/exchange/useSellEngi';
import { useUser } from '~/utils/contexts/userContext';
import { engiToWoz } from '~/utils/currency/conversion';

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
    label: 'Every two weeks',
    value: RepeatFrequency.EVERY_OTHER_WEEK,
  },
  {
    label: 'Monthly',
    value: RepeatFrequency.MONTHLY,
  },
];

export default function WithdrawTab({ className }: WithdrawTabProps) {
  const { user } = useUser();
  const [amount, setAmount] = useState(0);
  const [sellToEthAccount, setSellToEthAccount] = useState<string>(null);
  const [repeatTransaction, setRepeatTransaction] = useState(false);
  const [repeatFrequency, setRepeatFrequency] =
    useState<RepeatFrequency | null>(RepeatFrequency.DAILY);

  // TODO: clear wallet address, value, etc.
  const clear = useCallback(() => {
    setRepeatTransaction(false);
    setRepeatFrequency(RepeatFrequency.DAILY);
  }, []);

  const {
    mutate: sellEngiForEth,
    isLoading: userConfirmingSellTransaction,
    isError: failedToSellEngi,
    error: sellEngiError,
    data: confirmedSellTransaction,
  } = useSellEngiForEth();

  // display sell states
  const sellEngiStatesDisplay = useRef(null);
  useEffect(() => {
    if (userConfirmingSellTransaction) {
      sellEngiStatesDisplay.current = toast('Transaction pending...', {
        position: 'top-center',
        isLoading: true,
      });
    } else if (confirmedSellTransaction) {
      // update loading or error toasts
      toast.update(sellEngiStatesDisplay.current, {
        render: 'Sell Successful!',
        type: toast.TYPE.SUCCESS,
        autoClose: 3000,
        isLoading: false,
      });
    } else if (failedToSellEngi) {
      toast.update(sellEngiStatesDisplay.current, {
        render: `${sellEngiError.message} Please try again.`,
        type: toast.TYPE.ERROR,
        isLoading: false,
      });
    }
  }, [
    userConfirmingSellTransaction,
    confirmedSellTransaction,
    failedToSellEngi,
    sellEngiError,
    sellEngiStatesDisplay,
  ]);

  return (
    <div className={classNames('flex flex-col', className)}>
      <IncompleteBanner className="mb-4" />
      <CurrencySelect className="" />
      <WalletInput
        className="mt-8"
        onChange={(event) => setSellToEthAccount(event.currentTarget.value)}
      />
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
            value={amount}
            onChange={(event) => setAmount(parseFloat(event.target.value))}
          />
          <Button
            variant="tag"
            className="absolute top-1/2 right-3 -translate-y-1/2"
            disabled // TODO
          >
            Max
          </Button>
        </div>
        <button className="hover:text-green-primary">
          <RiArrowLeftRightLine className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <Input
            className="w-full"
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
        className="mt-3 gap-3"
        options={repeatOptions}
        value={repeatFrequency}
        onChange={(repeatFrequency) => setRepeatFrequency(repeatFrequency)}
        disabled={!repeatTransaction}
        tagClassName="!py-[1px]"
      />
      <DatePicker className="mt-4" disabled={!repeatTransaction} />
      <div className="mt-8 w-full flex items-center justify-end gap-4">
        <Button onClick={clear}>Clear</Button>
        <Button
          variant="primary"
          className="px-20"
          disabled={
            !amount || !sellToEthAccount || userConfirmingSellTransaction
          }
          onClick={() => {
            sellEngiForEth({
              fromUser: user,
              toAccount: sellToEthAccount,
              amount: engiToWoz(amount),
            });
          }}
        >
          Confirm
        </Button>
      </div>
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
    label: 'Tether',
    value: Currency.TETHER,
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
            'flex-1 flex flex-col items-center justify-center pt-4 pb-3 px-4',
            'outline-none focus-visible:ring-1 ring-green-primary/60',
            option.value === value
              ? 'font-bold text-white border border-green-primary bg-[#313D33]'
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
          {option.value === Currency.TETHER && (
            <SiTether
              className={classNames(
                'h-8 w-8',
                option.value === value ? 'text-green-primary' : ''
              )}
            />
          )}
          <span className="mt-4">{option.label}</span>
          {option.value === Currency.BITCOIN && (
            <span className="font-normal text-sm mt-2">1 engi - ? BTC</span>
          )}
          {option.value === Currency.ETHEREUM && (
            <span className="font-normal text-sm mt-2">1 engi - 1 ETH</span>
          )}
          {option.value === Currency.TETHER && (
            <span className="font-normal text-sm mt-2">1 engi - ? USDT</span>
          )}
        </button>
      ))}
    </div>
  );
}
