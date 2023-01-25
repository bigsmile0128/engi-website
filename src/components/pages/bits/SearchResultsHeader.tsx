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

interface SearchResultsHeaderProps {
  className?: string;
  error?: Error;
  isLoading: boolean;
  numResults?: number;
  onChange: (searchParams) => void;
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
  error,
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
      const newSearchParams: Record<string, any> =
        Object.fromEntries(searchParams);
      if (!value) {
        delete newSearchParams.query;
      } else {
        newSearchParams.query = value;
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
          placeholder="Search bits"
          defaultValue={searchParams.get('query') ?? ''}
          onChange={debouncedSearch}
        />
        <div className="absolute pointer-events-none ml-4">
          <RiSearchLine className="h-5 w-5 text-white" />
        </div>
      </div>
      <div className="flex items-center">
        <h4 className={classNames('font-grifter', isLoading ? 'skeleton' : '')}>
          <span className="whitespace-nowrap text-xl">
            Found {numResults ?? 0}{' '}
            <span className="text-green-primary">
              {pluralize('bit', numResults ?? 0)}
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
            placeholder="Search bits"
            value={searchParams.get('query') ?? ''}
            onChange={onSearch}
          />
          <SortMenu
            className="ml-auto"
            isLoading={isLoading}
            options={sortOptions}
            value={sortField}
            onChange={(option) => {
              const newSearchParams: Record<string, any> =
                Object.fromEntries(searchParams);
              newSearchParams['sort-field'] = option.value;
              newSearchParams['sort-dir'] = OrderByDirection.DESC;
              onChange(newSearchParams);
            }}
            sortDirection={
              (searchParams.get('sort-dir') as OrderByDirection) ??
              OrderByDirection.DESC
            }
            onChangeSortDirection={(sortDir) => {
              const newSearchParams: Record<string, any> =
                Object.fromEntries(searchParams);
              newSearchParams['sort-dir'] = sortDir;
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
    </header>
  );
}
