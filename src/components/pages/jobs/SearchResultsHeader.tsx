import classNames from 'classnames';
import pluralize from 'pluralize';
import SearchInput from '~/components/SearchInput';
import SortMenu from '~/components/SortMenu';
import { JobsOrderByProperty, OrderByDirection } from '~/types';

interface SearchResultsHeaderProps {
  className?: string;
  error?: Error;
  isLoading: boolean;
  numResults?: number;
  onChange: (searchParams) => void;
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
  searchParams,
}: SearchResultsHeaderProps) {
  const sortField = sortOptions.find(
    (option) => option.value === searchParams.get('sort-field')
  );

  return (
    <header className={classNames('md:flex items-center', className)}>
      <h4 className={classNames('font-grifter', isLoading ? 'skeleton' : '')}>
        <span className="whitespace-nowrap text-xl">
          Found {numResults ?? 0}{' '}
          <span className="text-green-primary">
            {pluralize('job', numResults ?? 0)}
          </span>
        </span>
      </h4>
      <div
        className={classNames(
          'flex justify-between w-full',
          'mt-4 md:mt-0 md:ml-12'
        )}
      >
        <SearchInput
          className="sm:w-56"
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
    </header>
  );
}
