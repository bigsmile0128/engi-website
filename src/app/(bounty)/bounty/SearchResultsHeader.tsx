import classNames from 'classnames';
import pluralize from 'pluralize';
import SearchInput from '~/components/SearchInput';
import SortMenu from '~/components/SortMenu';
import { BitsOrderByProperty, OrderByDirection } from '~/types';
import { IoOptionsOutline } from 'react-icons/io5';
import Button from '~/components/global/Button/Button';
import { useCallback, useMemo } from 'react';
import Input from '~/components/global/Input/Input';
import { RiSearchLine } from 'react-icons/ri';
import { debounce } from 'lodash';
import SearchChips from './SearchResults/SearchChips';

interface SearchResultsHeaderProps {
  className?: string;
  error?: Error;
  isLoading: boolean;
  numResults?: number;
  onChange: (searchParams: URLSearchParams) => void;
  onChangeVisible: (visible: boolean) => void;
  searchParams: URLSearchParams;
}

const sortOptions = [
  {
    label: 'Newest',
    value: BitsOrderByProperty.CREATED_ON,
  },
  {
    label: 'Payout',
    value: BitsOrderByProperty.FUNDING,
  },
];

export default function SearchResultsHeader({
  className,
  isLoading,
  numResults,
  // error,
  onChange,
  onChangeVisible,
  searchParams,
}: SearchResultsHeaderProps) {
  const sortField = sortOptions.find(
    (option) => option.value === searchParams.get('sort-field')
  );

  const onSearch = useCallback(
    (e) => {
      const value = e.target.value;
      const newSearchParams = new URLSearchParams(searchParams);
      if (!value) {
        newSearchParams.delete('query');
      } else {
        newSearchParams.set('query', value);
      }
      onChange(newSearchParams);
    },
    [searchParams, onChange]
  );

  const debouncedSearch = useMemo(() => debounce(onSearch, 300), [onSearch]);

  return (
    <header className={classNames('', className)}>
      {/* MOBILE/TABLET search input */}
      <div className="relative flex items-center desktop:hidden mb-12">
        <Input
          className="w-full pl-12 font-normal"
          placeholder="Search Bounties"
          defaultValue={searchParams.get('query') ?? ''}
          onChange={debouncedSearch}
        />
        <div className="absolute pointer-events-none ml-4">
          <RiSearchLine className="h-5 w-5 text-white" />
        </div>
      </div>
      <div className="flex items-center">
        <h4 className={classNames('font-grifter', isLoading ? 'skeleton' : '')}>
          <span className="whitespace-nowrap text-base xs:text-xl">
            Found {numResults ?? 0}{' '}
            <span className="text-green-primary">
              {pluralize('bounty', numResults ?? 0)}
            </span>
          </span>
        </h4>
        {/* DESKTOP */}
        <div
          className={classNames(
            'hidden desktop:flex justify-between w-full',
            'mt-0 ml-12'
          )}
        >
          <SearchInput
            className="w-56 inline-block"
            placeholder="Search Bounties"
            value={searchParams.get('query') ?? ''}
            onChange={onSearch}
          />
          <SortMenu
            className="ml-auto"
            isLoading={isLoading}
            options={sortOptions}
            value={sortField}
            onChange={(option) => {
              const newSearchParams = new URLSearchParams(searchParams);
              newSearchParams.set('sort-field', option.value);
              newSearchParams.set('sort-dir', OrderByDirection.DESC);
              onChange(newSearchParams);
            }}
            sortDirection={
              (searchParams.get('sort-dir') as OrderByDirection) ??
              OrderByDirection.DESC
            }
            onChangeSortDirection={(sortDir) => {
              const newSearchParams = new URLSearchParams(searchParams);
              newSearchParams.set('sort-dir', sortDir);
              onChange(newSearchParams);
            }}
          />
        </div>
        {/* MOBILE, TABLET */}
        <Button
          className="desktop:hidden flex items-center gap-2 ml-auto !px-4 !py-2 tablet:!px-8 tablet:!py-4"
          onClick={() => onChangeVisible(true)}
          isLoading={isLoading}
        >
          <IoOptionsOutline className="h-5 w-5" />
          <span className="tablet:hidden">Filters</span>
          <span className="hidden tablet:inline-block">Filter & Sort</span>
        </Button>
      </div>
      <SearchChips
        className="mt-4 hidden desktop:flex"
        onChange={onChange}
        searchParams={searchParams}
      />
    </header>
  );
}
