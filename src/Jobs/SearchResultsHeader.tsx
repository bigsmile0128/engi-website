import React, { Fragment, useState } from 'react';
import classNames from 'classnames';
import { FiSearch } from 'react-icons/fi';
import { HiSortAscending, HiSortDescending } from 'react-icons/hi';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';
import pluralize from 'pluralize';

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
  const placeholderStyle = 'bg-[#00000022] rounded-full children:invisible';

  return (
    <header
      className={classNames(
        'flex items-center',
        { 'animate-pulse': isLoading },
        className
      )}
    >
      <h4
        className={classNames(
          'font-grifter',
          isLoading ? placeholderStyle : ''
        )}
      >
        <span>
          Found {numResults ?? 0}{' '}
          <span className="text-green-400">
            {pluralize('job', numResults ?? 0)}
          </span>
        </span>
      </h4>
      <div
        className={classNames(
          'ml-12 border-b border-[#ffffff22] focus-within:border-green-400 flex items-center pb-1 relative',
          isLoading ? ` border-b-0 ${placeholderStyle}` : ''
        )}
      >
        <div className="flex items-center justify-center absolute pointer-events-none">
          <FiSearch className="h-5 w-5 text-gray-300" />
        </div>
        <input
          type="text"
          name="name"
          id="name"
          className="block w-56 border-b border-transparent bg-transparent outline-none text-sm pl-7"
          placeholder="Search for a job"
          autoComplete="off"
        />
      </div>
      <div className={classNames('ml-auto', isLoading ? placeholderStyle : '')}>
        <Listbox value={selected} onChange={setSelected}>
          {({ open }) => (
            <>
              <Listbox.Label className="sr-only">Change sort</Listbox.Label>
              <div className="relative">
                <div className="flex items-center">
                  <button
                    className="items-center py-2 text-gray-200 outline-none focus:ring-2 focus:ring-green-400 hover:text-green-400"
                    onClick={() =>
                      setSortDir(
                        sortDir === SortDirection.ASCENDING
                          ? SortDirection.DESCENDING
                          : SortDirection.ASCENDING
                      )
                    }
                  >
                    {sortDir === SortDirection.ASCENDING ? (
                      <HiSortAscending className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <HiSortDescending
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                  <Listbox.Button className="flex items-center py-2 text-sm font-medium focus:outline-none focus:z-10 focus:ring-2 focus:ring-green-400 group">
                    <span className="sr-only">Change sort</span>
                    <p className="ml-2.5 text-sm font-medium underline underline-offset-1 group-hover:decoration-green-400">
                      {selected.title}
                    </p>
                    <ChevronDownIcon
                      className="h-5 w-5 ml-1"
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
                  <Listbox.Options className="origin-top-right absolute z-10 right-0 mt-2 w-40 rounded-md overflow-hidden bg-[#00000022] divide-y divide-[#ffffff22] ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {publishingOptions.map((option) => (
                      <Listbox.Option
                        key={option.title}
                        className={({ active }) =>
                          classNames(
                            active ? 'text-black bg-green-400' : 'text-white',
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
                                    active ? 'text-white' : 'text-green-400'
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
    </header>
  );
}
