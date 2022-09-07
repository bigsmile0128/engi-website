import React, { useState, useEffect, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import EngiIcon from '../icons/EngiIcon';
import Input from 'components/Input';
import Button from 'components/Button';
import { RiSearchLine } from 'react-icons/ri';
import Web3 from 'web3';
const uc = require('@polkadot/util-crypto');
import engiPurchaseAbi from './engiPurchaseAbi.json';

type EngiAmountProps = {
  account: string;
  className?: string;
  iconClassName?: string;
  valueClassName?: string;
  isLoading?: boolean;
  value?: string;
};

const PURCHASE_CONTRACT_ADDRESS = '0xF7150Be741157ef36EFF47D5464028b950a0df1C';

function substrateToHex(address) {
  var ar = uc.decodeAddress(address);

  return (
    '0x' +
    Array.from(ar, function (byte: any) {
      return ('0' + (byte & 0xff).toString(16)).slice(-2);
    }).join('')
  );
}

export default function EngiAmount({
  className,
  iconClassName,
  valueClassName,
  isLoading,
  // currently signed in user's substrate wallet address
  account,
}: EngiAmountProps) {
  console.log(account);
  // the value to purchase in WEI
  const [value, setValue] = useState(0);
  const [ethereum, setEthereum] = useState();

  useEffect(() => {
    (async () => {
      // @ts-ignore
      if (window.ethereum) {
        // @ts-ignore
        const ethereumAccounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setEthereum(ethereumAccounts[0]);
      }
    })();
  }, []);

  const web3 = useMemo(() => new Web3(Web3.givenProvider), []);

  const EngiPurchaseContract = useMemo(
    () =>
      new web3.eth.Contract(
        // @ts-ignore
        engiPurchaseAbi,
        PURCHASE_CONTRACT_ADDRESS
      ),
    []
  );

  const buy = useCallback(async () => {
    await web3.eth.sendTransaction({
      from: ethereum,
      to: PURCHASE_CONTRACT_ADDRESS,
      value,
      data: EngiPurchaseContract.methods
        .deposit(substrateToHex(account))
        .encodeABI(),
    });
  }, [ethereum, account, value, EngiPurchaseContract]);

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
            Purchase ENGI with ETH
          </label>
          <div className="relative mt-2">
            <Input
              className="w-full pl-11"
              type="number"
              name="wallet-address"
              placeholder="Enter ETH"
              value={value / Math.pow(10, 18)}
              onChange={({ target }) =>
                setValue(parseFloat(target.value) * Math.pow(10, 18))
              }
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
            {value / Math.pow(10, 18)}
          </span>
        </div>
      </div>
      <Button onClick={buy}>buy</Button>
    </div>
  );
}
