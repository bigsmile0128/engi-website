import React, { Fragment, useState } from 'react';
import classNames from 'classnames';
import { FiSearch } from '@react-icons/all-files/fi/FiSearch';
import { HiSortAscending } from '@react-icons/all-files/hi/HiSortAscending';
import { HiSortDescending } from '@react-icons/all-files/hi/HiSortDescending';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';
import pluralize from 'pluralize';
import SearchInput from 'components/SearchInput';

interface SearchResultsHeaderProps {
  className?: string;
  isLoading: boolean;
  numResults?: number;
  error?: Error;
}

const publishingOptions = [
  {
    title: 'Newest',
  },
  {
    title: 'Price',
  },
];

enum SortDirection {
  ASCENDING,
  DESCENDING,
}

export default function SearchResultsHeader({
  className,
  isLoading,
  numResults,
  error,
}: SearchResultsHeaderProps) {
  const [selected, setSelected] = useState(publishingOptions[0]);
  const [sortDir, setSortDir] = useState(SortDirection.DESCENDING);

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
          isLoading={isLoading}
          placeholder="Search jobs"
        />
        <div className={classNames('ml-auto', isLoading ? 'skeleton' : '')}>
          <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
              <>
                <Listbox.Label className="sr-only">Change sort</Listbox.Label>
                <div className="relative">
                  <div className="flex items-center">
                    <button
                      className="items-center py-2 outline-none focus:ring-2 focus:ring-green-primary hover:text-green-primary"
                      onClick={() =>
                        setSortDir(
                          sortDir === SortDirection.ASCENDING
                            ? SortDirection.DESCENDING
                            : SortDirection.ASCENDING
                        )
                      }
                    >
                      {sortDir === SortDirection.ASCENDING ? (
                        <HiSortAscending
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <HiSortDescending
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                    <Listbox.Button
                      className={classNames(
                        'flex items-center py-2',
                        'focus:outline-none focus:z-10 focus:ring-2 focus:ring-green-primary group'
                      )}
                    >
                      <span className="sr-only">Change sort</span>
                      <p className="ml-2.5 font-bold underline underline-offset-1 group-hover:decoration-green-primary">
                        {selected.title}
                      </p>
                      <ChevronDownIcon
                        className="h-5 w-5 ml-1 text-secondary"
                        aria-hidden="true"
                      />
                    </Listbox.Button>
                  </div>
                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="origin-top-right absolute z-10 right-0 mt-2 w-40 rounded-md overflow-hidden bg-gray-700 divide-y divide-[#ffffff22] ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {publishingOptions.map((option) => (
                        <Listbox.Option
                          key={option.title}
                          className={({ active }) =>
                            classNames(
                              active
                                ? 'text-black bg-green-primary'
                                : 'text-white',
                              'cursor-default select-none relative p-4 text-sm'
                            )
                          }
                          value={option}
                        >
                          {({ selected, active }) => (
                            <div className="flex flex-col">
                              <div className="flex justify-between">
                                <p
                                  className={
                                    selected ? 'font-semibold' : 'font-normal'
                                  }
                                >
                                  {option.title}
                                </p>
                                {selected ? (
                                  <span
                                    className={
                                      active
                                        ? 'text-white'
                                        : 'text-green-primary'
                                    }
                                  >
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        </div>
      </div>
    </header>
  );
}
