import React from 'react';
import classNames from 'classnames';
import { RiSearchLine } from 'react-icons/ri';
import SearchInput from 'components/SearchInput';

type TransactionsProps = {
  className?: string;
  isLoading?: boolean;
};

export default function Transactions({
  className,
  isLoading,
}: TransactionsProps) {
  return (
    <div className={classNames('', className)}>
      <h2 className="font-bold text-2xl">Transactions</h2>
      <div className="flex items-center">
        <SearchInput
          className="mt-8 w-64"
          isLoading={isLoading}
          placeholder="Search jobs"
        />
      </div>
    </div>
  );
}
