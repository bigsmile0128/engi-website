import classNames from 'classnames';
import Button from '~/components/global/Button/Button';
import Checkbox from '~/components/global/Checkbox/Checkbox';
import Slider from '~/components/global/Slider/Slider';
import { BitStatus, Technology } from '~/types';

interface SearchFilterListProps {
  className?: string;
  filterClassName?: string;
  onChange: (searchParams: URLSearchParams) => void;
  searchParams: URLSearchParams;
}

// TODO: replace with enums from schema
// https://linear.app/engi/issue/ENGIN-907/query-to-get-list-of-static-values-for-job-search
export const technologyOptions = [
  { label: 'C#', value: Technology.C_SHARP },
  { label: 'JavaScript', value: Technology.JAVA_SCRIPT },
  { label: 'Python', value: Technology.PYTHON },
  { label: 'Rust', value: Technology.RUST },
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

export const statusOptions = [
  { label: 'Open', value: BitStatus.OPEN },
  { label: 'Active', value: BitStatus.ACTIVE },
  { label: 'Completed', value: BitStatus.COMPLETE },
];

export const MIN_FUNDING = 0;
export const MAX_FUNDING = 100;

export default function SearchFilterList({
  className,
  searchParams,
  onChange,
  filterClassName,
}: SearchFilterListProps) {
  const technologies = searchParams.getAll('technology');
  let minFunding =
    parseInt(searchParams.get('funding-min') ?? '0') || MIN_FUNDING;
  let maxFunding =
    parseInt(searchParams.get('funding-max') ?? '0') || MAX_FUNDING;

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
          onClick={() => onChange(new URLSearchParams())}
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
                const newSearchParams = new URLSearchParams(searchParams);
                newSearchParams.delete('page');
                if (checked) {
                  newSearchParams.set('created-after', value);
                } else {
                  newSearchParams.delete('created-after');
                }
                onChange(newSearchParams);
              }}
            />
          ))}
        </div>
      </div>
      <div className="my-6 w-full border-t border-gray-500 opacity-50" />
      <div className={classNames(filterClassName)}>
        <legend className="mb-4">Technologies</legend>
        <div className="flex flex-col gap-y-2">
          {technologyOptions.map(({ label, value }) => (
            <Checkbox
              key={value}
              id={value}
              label={label}
              checked={technologies.includes(value)}
              onChange={(checked) => {
                const newSearchParams = new URLSearchParams(searchParams);
                newSearchParams.delete('page');
                newSearchParams.delete('technology');
                if (checked) {
                  technologies.forEach((technology) =>
                    newSearchParams.append('technology', technology)
                  );
                  newSearchParams.append('technology', value);
                } else {
                  technologies
                    .filter((lang) => lang !== value)
                    .forEach((technology) =>
                      newSearchParams.append('technology', technology)
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
        <legend className="mb-4">Status</legend>
        <div className="flex flex-col gap-y-2">
          {statusOptions.map(({ label, value }) => (
            <Checkbox
              key={value}
              id={value}
              label={label}
              checked={value === searchParams.get('status')}
              onChange={(checked) => {
                const newSearchParams = new URLSearchParams(searchParams);
                newSearchParams.delete('page');
                if (checked) {
                  newSearchParams.set('status', value);
                } else {
                  newSearchParams.delete('status');
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
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.delete('page');
            newSearchParams.set('funding-min', minFunding);
            newSearchParams.set('funding-max', maxFunding);
            onChange(newSearchParams);
          }}
        />
      </div>
    </div>
  );
}
