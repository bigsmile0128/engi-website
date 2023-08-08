import classNames from 'classnames';
import TechnologyIcon from '~/components/TechnologyIcon';
import Checkbox from '~/components/global/Checkbox/Checkbox';
import useSearchFields from '~/utils/hooks/useSearchFields';

interface SearchFilterListProps {
  className?: string;
  filterClassName?: string;
  onChange: (searchParams: URLSearchParams) => void;
  searchParams: URLSearchParams;
}

export const MIN_FUNDING = 0;
export const MAX_FUNDING = 100;

export default function SearchFilterList({
  className,
  searchParams,
  onChange,
  filterClassName,
}: SearchFilterListProps) {
  const { data: searchFields, isLoading: isLoadingSearchFields } =
    useSearchFields();

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
      <div className={isLoadingSearchFields ? '' : 'hidden'}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className={classNames(filterClassName)}>
            <legend className="mb-4 skeleton">Placeholder</legend>
            <div className="flex flex-col gap-y-2">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="w-3/4 skeleton">
                  Placeholder
                </div>
              ))}
            </div>
            <div className="my-6 w-full border-t border-gray-500 opacity-50" />
          </div>
        ))}
      </div>
      <div className={isLoadingSearchFields ? 'hidden' : ''}>
        <div className={classNames(filterClassName)}>
          <legend className="mb-4">Date of Publication</legend>
          <div className="flex flex-col gap-y-2">
            {(searchFields?.createdAfter ?? []).map(({ label, value }) => (
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
            {(searchFields?.technologies ?? []).map(({ label, value }) => (
              <Checkbox
                key={value}
                id={value}
                label={label}
                icon={<TechnologyIcon value={value} className="h-4 w-4" />}
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
            {(searchFields?.status ?? []).map(({ label, value }) => (
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
        {/* <div className="my-6 w-full border-t border-gray-500 opacity-50" /> */}
        {/* <div className={classNames(filterClassName)}>
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
        </div> */}
      </div>
    </div>
  );
}
