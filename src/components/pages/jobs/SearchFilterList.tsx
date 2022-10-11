import React from 'react';
import classNames from 'classnames';
import Checkbox from '~/components/global/Checkbox/Checkbox';
import Slider from '~/components/global/Slider/Slider';

interface SearchFilterListProps {
  className?: string;
  filterClassName?: string;
  onChange: (searchParams) => void;
  searchParams: URLSearchParams;
}

const languages = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Rust',
  'C++',
  'Java',
].sort();

const MIN_HOURS = 0;
const MAX_HOURS = 20;
const MIN_FUNDING = 0;
const MAX_FUNDING = 100;

export default function SearchFilterList({
  className,
  searchParams,
  onChange,
  filterClassName,
}: SearchFilterListProps) {
  const selectedLanguages = searchParams.getAll('language');
  let minHours = parseInt(searchParams.get('minHours')) || MIN_HOURS;
  let maxHours = parseInt(searchParams.get('maxHours')) || MAX_HOURS;
  let minFunding = parseInt(searchParams.get('minFunding')) || MIN_FUNDING;
  let maxFunding = parseInt(searchParams.get('maxFunding')) || MAX_FUNDING;

  // handle incorrect range in query params
  if (minHours >= maxHours) {
    minHours = MIN_HOURS;
    maxHours = MAX_HOURS;
  }
  if (minFunding >= maxFunding) {
    minFunding = MIN_FUNDING;
    maxFunding = MAX_FUNDING;
  }

  return (
    <div className={classNames('relative text-gray-300', className)}>
      <div className={classNames(filterClassName)}>
        <legend className="text-sm mb-2">Language</legend>
        <div className="flex flex-col gap-y-1">
          {languages.map((language) => (
            <Checkbox
              key={language}
              id={language}
              label={language}
              checked={selectedLanguages.includes(language)}
              onChange={(checked) => {
                const newSearchParams: Record<string, any> =
                  Object.fromEntries(searchParams);
                delete newSearchParams.page; // reset page when changing languages
                if (checked) {
                  newSearchParams.language = [...selectedLanguages, language];
                } else {
                  newSearchParams.language = selectedLanguages.filter(
                    (lang) => lang !== language
                  );
                }
                onChange(newSearchParams);
              }}
            />
          ))}
        </div>
      </div>
      <div className="my-6 w-full border-t border-gray-500 opacity-50 hidden lg:block" />
      <div className={classNames(filterClassName)}>
        <legend className="text-sm mb-2">Estimated Time</legend>
        <Slider
          min={MIN_HOURS}
          max={MAX_HOURS}
          minDistance={1}
          value={[minHours, maxHours]}
          onAfterChange={([minHours, maxHours]) => {
            onChange({
              ...Object.fromEntries(searchParams),
              minHours,
              maxHours,
            });
          }}
        />
      </div>
      <div className="my-6 w-full border-t border-gray-500 opacity-50 hidden lg:block" />
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
              minFunding,
              maxFunding,
            });
          }}
        />
      </div>
    </div>
  );
}
