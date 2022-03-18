import React from 'react';
import classNames from 'classnames';

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
            <div className="flex items-center" key={language}>
              <input
                className="mr-4 h-4 w-4 accent-green-400 rounded-none"
                type="checkbox"
                name={language}
                id={language}
              />
              <label htmlFor={language} className="text-sm">
                {language}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
