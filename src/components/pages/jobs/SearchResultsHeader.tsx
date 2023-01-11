import classNames from 'classnames';
import pluralize from 'pluralize';
import SearchInput from '~/components/SearchInput';
import SortMenu from '~/components/SortMenu';
import { JobsOrderByProperty, OrderByDirection } from '~/types';
import { IoOptionsOutline } from 'react-icons/io5';
import Button from '~/components/global/Button/Button';

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
    value: JobsOrderByProperty.CREATED_ON,
  },
  {
    label: 'Payout',
    value: JobsOrderByProperty.FUNDING,
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

  return (
    <header className={classNames('flex items-center', className)}>
      <h4 className={classNames('font-grifter', isLoading ? 'skeleton' : '')}>
        <span className="whitespace-nowrap text-xl">
          Found {numResults ?? 0}{' '}
          <span className="text-green-primary">
            {pluralize('job', numResults ?? 0)}
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
          className="w-56 hidden desktop:block"
          placeholder="Search jobs"
          value={searchParams.get('query') ?? ''}
          onChange={(query) => {
            const newSearchParams: Record<string, any> =
              Object.fromEntries(searchParams);
            if (!query) {
              delete newSearchParams.query;
            } else {
              newSearchParams.query = query;
            }
            onChange(newSearchParams);
          }}
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
    </header>
  );
}
