import classNames from 'classnames';
import Button from '~/components/global/Button/Button';
import Checkbox from '~/components/global/Checkbox/Checkbox';
import Slider from '~/components/global/Slider/Slider';
import { Language } from '~/types';

interface SearchFilterListProps {
  className?: string;
  filterClassName?: string;
  onChange: (searchParams) => void;
  searchParams: URLSearchParams;
}

// TODO: replace with enums from schema
// https://linear.app/engi/issue/ENGIN-907/query-to-get-list-of-static-values-for-job-search
export const languageOptions = [
  { label: 'C#', value: Language.C_SHARP },
  { label: 'JavaScript', value: Language.JAVA_SCRIPT },
  { label: 'Python', value: Language.PYTHON },
  { label: 'Rust', value: Language.RUST },
].sort((a, b) => a.label.localeCompare(b.label));

export enum DateOption {
  LAST_DAY = 'LAST_DAY',
  LAST_MONTH = 'LAST_MONTH',
  LAST_QUARTER = 'LAST_QUARTER',
  LAST_WEEK = 'LAST_WEEK',
  LAST_YEAR = 'LAST_YEAR',
}

export const createdAfterOptions = [
  { label: 'Last day', value: DateOption.LAST_DAY },
  { label: 'Last week', value: DateOption.LAST_WEEK },
  { label: 'Last month', value: DateOption.LAST_MONTH },
  { label: 'Last quarter', value: DateOption.LAST_QUARTER },
  { label: 'Last year', value: DateOption.LAST_YEAR },
];

export const MIN_FUNDING = 0;
export const MAX_FUNDING = 100;

export default function SearchFilterList({
  className,
  searchParams,
  onChange,
  filterClassName,
}: SearchFilterListProps) {
  const languages = searchParams.getAll('language');
  let minFunding = parseInt(searchParams.get('funding-min')) || MIN_FUNDING;
  let maxFunding = parseInt(searchParams.get('funding-max')) || MAX_FUNDING;

  if (minFunding >= maxFunding) {
    minFunding = MIN_FUNDING;
    maxFunding = MAX_FUNDING;
  }

  return (
    <div className={classNames('relative', className)}>
      <div className="flex items-center justify-between">
        <span className="font-grifter text-xl -mb-1">Filters</span>
        <Button
          variant="link"
          className="text-secondary text-sm underline font-normal hover:text-white"
          onClick={() => onChange({})}
        >
          Clear all
        </Button>
      </div>
      <div className="mt-4 mb-8 w-full border-t border-gray-500 opacity-50" />
      <div className={classNames(filterClassName)}>
        <legend className="mb-4">Date of Publication</legend>
        <div className="flex flex-col gap-y-2">
          {createdAfterOptions.map(({ label, value }) => (
            <Checkbox
              key={value}
              id={value}
              label={label}
              checked={value === searchParams.get('created-after')}
              onChange={(checked) => {
                const newSearchParams: Record<string, any> =
                  Object.fromEntries(searchParams);
                if (checked) {
                  newSearchParams['created-after'] = value;
                } else {
                  delete newSearchParams['created-after'];
                }
                onChange(newSearchParams);
              }}
            />
          ))}
        </div>
      </div>
      <div className="my-6 w-full border-t border-gray-500 opacity-50" />
      <div className={classNames(filterClassName)}>
        <legend className="mb-4">Language</legend>
        <div className="flex flex-col gap-y-2">
          {languageOptions.map(({ label, value }) => (
            <Checkbox
              key={value}
              id={value}
              label={label}
              checked={languages.includes(value)}
              onChange={(checked) => {
                const newSearchParams: Record<string, any> =
                  Object.fromEntries(searchParams);
                delete newSearchParams.page; // reset page when changing languages
                if (checked) {
                  newSearchParams.language = [...languages, value];
                } else {
                  newSearchParams.language = languages.filter(
                    (lang) => lang !== value
                  );
                }
                onChange(newSearchParams);
              }}
            />
          ))}
        </div>
      </div>
      <div className="my-6 w-full border-t border-gray-500 opacity-50" />
      <div className={classNames(filterClassName)}>
        <legend className="text-sm mb-2">Estimated Funding</legend>
        <Slider
          min={MIN_FUNDING}
          max={MAX_FUNDING}
          minDistance={1}
          value={[minFunding, maxFunding]}
          onAfterChange={([minFunding, maxFunding]) => {
            onChange({
              ...Object.fromEntries(searchParams),
              'funding-min': minFunding,
              'funding-max': maxFunding,
            });
          }}
        />
      </div>
    </div>
  );
}
