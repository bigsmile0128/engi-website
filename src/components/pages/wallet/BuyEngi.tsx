import classNames from 'classnames';
import { Dispatch, useEffect, useMemo, useRef, useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import { Id, toast } from 'react-toastify';
import { PreviewMoveEngi } from '~/utils/exchange/types';
import Tooltip from '~/components/Tooltip';
import Button from '~/components/global/Button/Button';
import Input from '~/components/global/Input/Input';
import { useConnectEthereumExtension } from '~/utils/ethereum/extension';
import { useBuyEngiWithEth } from '~/utils/ethereum/purchase';

type BuyEngiProps = {
  account: string;
  className?: string;
  iconClassName?: string;
  isLoading?: boolean;
  setPreviewMove: Dispatch<PreviewMoveEngi>;
  value?: string;
  valueClassName?: string;
};

export default function BuyEngi({
  className,
  isLoading,
  // currently signed in user's substrate wallet address
  account,
  setPreviewMove,
}: BuyEngiProps) {
  // the value to purchase in WEI
  const [value, setValue] = useState(0);
  // handles unexpected NaN
  const displayValue = useMemo(() => value / Math.pow(10, 18) || 0, [value]);

  useEffect(() => {
    setPreviewMove({ amount: value, move: 'Buy' });
  }, [setPreviewMove, value]);

  const { data: ethereumAccounts } = useConnectEthereumExtension();
  const {
    mutate: buy,
    isLoading: userConfirmingBuyTransaction,
    isError: failedToBuyEngi,
    error: buyEngiError,
    data: confirmedBuyTransaction,
  } = useBuyEngiWithEth();

  // display buy states
  const buyEngiStatesDisplay = useRef<Id | null>(null);
  useEffect(() => {
    if (userConfirmingBuyTransaction) {
      buyEngiStatesDisplay.current = toast('Transaction pending...', {
        position: 'top-center',
        isLoading: true,
      });
    } else if (confirmedBuyTransaction) {
      // update loading or error toasts
      toast.update(buyEngiStatesDisplay.current as Id, {
        render: 'Purchase Successful!',
        type: toast.TYPE.SUCCESS,
        autoClose: 3000,
        isLoading: false,
      });
    } else if (failedToBuyEngi) {
      toast.update(buyEngiStatesDisplay.current as Id, {
        render: `${buyEngiError.message} Please try again.`,
        type: toast.TYPE.ERROR,
        autoClose: 5000,
        isLoading: false,
      });
    }
  }, [
    userConfirmingBuyTransaction,
    confirmedBuyTransaction,
    failedToBuyEngi,
    buyEngiError,
    buyEngiStatesDisplay,
  ]);

  return (
    <div
      className={classNames(
        'flex-col items-center whitespace-nowrap space-y-10',
        isLoading ? 'children:skeleton' : '',
        className
      )}
    >
      <div className="grid grid-cols-2 gap-6">
        <div className="truncate flex flex-col space-y-2">
          <label htmlFor="wallet-address" className="font-bold text-xl">
            Account
          </label>

          <div className="flex flex-col justify-center h-full">
            <Tooltip title="Sign in with a different account to change this value.">
              <span className="font-light text-lg truncate text-ellipsis">
                {account}
              </span>
            </Tooltip>
          </div>
        </div>

        <div className="flex-col space-y-2">
          <label htmlFor="wallet-address" className="font-bold text-xl">
            Amount
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
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore because isNaN handles strings isNaN('.1') is false, isNaN('1a') is true
                if (isNaN(target.value)) return;

                // set as wei
                setValue(parseFloat(target.value) * Math.pow(10, 18));
              }}
            />
            <RiSearchLine className="text-secondary absolute top-1/2 left-4 -translate-y-1/2 h-5 w-5" />
          </div>
        </div>
      </div>

      <Button
        className="w-full"
        onClick={() =>
          buy({ account, from: (ethereumAccounts ?? [])?.[0], amount: value })
        }
        disabled={!account || !(ethereumAccounts ?? [])?.length || !value}
        variant={'primary'}
      >
        Confirm
      </Button>
    </div>
  );
}
