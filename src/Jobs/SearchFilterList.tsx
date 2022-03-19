import React from 'react';
import classNames from 'classnames';
import Checkbox from '../components/Checkbox';

interface SearchFilterListProps {
  className?: string;
}

const languages = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Rust',
  'C++',
  'Java',
].sort();

export default function SearchFilterList({ className }: SearchFilterListProps) {
  return (
    <div className={classNames('relative text-gray-300', className)}>
      <fieldset>
        <legend className="text-sm mb-2">Language</legend>
        <div className="flex flex-col gap-y-1">
          {languages.map((language) => (
            <Checkbox
              key={language}
              name={language}
              id={language}
              label={language}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
}
