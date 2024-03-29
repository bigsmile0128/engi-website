import classNames from 'classnames';
import { Dispatch, useMemo, useState } from 'react';
import { RiInformationLine } from 'react-icons/ri';
import { SiBitcoin, SiEthereum, SiLitecoin } from 'react-icons/si';
import IncompleteBanner from '~/components/IncompleteBanner';
import Tooltip from '~/components/Tooltip';
import Button from '~/components/global/Button/Button';
import Input from '~/components/global/Input/Input';
import WalletInput from './WalletInput';
import { CurrentUserInfo } from '~/types';

type TransferTabProps = {
  className?: string;
  setTransferAmount: Dispatch<number>;
  user: CurrentUserInfo;
};

export default function TransferTab({
  className,
  setTransferAmount,
  user,
}: TransferTabProps) {
  const [value, setValue] = useState(0);

  const displayValue = useMemo(() => value / Math.pow(10, 18) || 0, [value]);

  return (
    <div className={classNames('flex flex-col', className)}>
      <IncompleteBanner className="mb-4" />
      <WalletInput />
      <label htmlFor="note" className="mt-8 font-bold text-xl">
        Amount
      </label>
      <div className="relative mt-2">
        <Input
          className="w-full pr-16"
          type="number"
          name="amount"
          placeholder="0.00"
          value={displayValue}
          onChange={(e) => {
            // set as wei
            const value = parseFloat(e.target.value) * Math.pow(10, 18);
            setValue(value);
            setTransferAmount(value);
          }}
        />
        <div className="flex items-center gap-x-1 text-secondary absolute top-1/2 right-3 -translate-y-1/2">
          <span className="text-sm">engi</span>
          <Tooltip
            title={
              <div className="flex flex-col gap-y-4">
                <div className="flex items-center gap-x-2">
                  <SiBitcoin className="text-orange-primary h-4 w-4" />
                  <span className="text-sm">? BTC</span>
                </div>
                <div className="flex items-center gap-x-2">
                  <SiEthereum className="text-blue-500 h-4 w-4" />
                  <span className="text-sm">? ETH</span>
                </div>
                <div className="flex items-center gap-x-2">
                  <SiLitecoin className="text-yellow-500 h-4 w-4" />
                  <span className="text-sm">? LTC</span>
                </div>
              </div>
            }
          >
            <div className="test" data-tip data-for="conversion">
              <RiInformationLine className="h-4 w-4" />
            </div>
          </Tooltip>
        </div>
      </div>
      <label htmlFor="note" className="mt-8 font-bold text-xl">
        Note
      </label>
      <Input
        className="mt-2"
        type="text"
        name="note"
        placeholder="Write an optional message"
      />
      <div className="mt-8 w-full flex items-center justify-end gap-4">
        <Button>Cancel</Button>
        <Button variant="primary" className="px-20">
          Continue
        </Button>
      </div>
    </div>
  );
}
