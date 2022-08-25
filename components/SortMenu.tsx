import React, { Fragment } from 'react';
import classNames from 'classnames';
import { Listbox, Transition } from '@headlessui/react';
import { RiSortAsc, RiSortDesc } from 'react-icons/ri';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/outline';

export enum SortDirection {
  ASC,
  DESC,
}

export type Option = {
  label: string;
  value: any;
};

type SortMenuProps = {
  className?: string;
  isLoading?: boolean;
  value?: Option;
  options: Option[];
  onChange: (value: Option) => void;
  sortDirection: SortDirection;
  onChangeSortDirection: (sortDirection: SortDirection) => void;
};

export default function SortMenu({
  className,
  isLoading,
  options,
  value,
  onChange,
  sortDirection,
  onChangeSortDirection,
}: SortMenuProps) {
  return (
    <div className={classNames('', isLoading ? 'skeleton' : '', className)}>
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <>
            <Listbox.Label className="sr-only">Change sort</Listbox.Label>
            <div className="relative inline-block">
              <div className="flex items-center">
                <button
                  className={classNames(
                    'items-center py-2 outline-none',
                    'focus-visible:ring-1 focus-visible:ring-green-primary hover:text-green-primary'
                  )}
                  onClick={() =>
                    onChangeSortDirection(
                      sortDirection === SortDirection.ASC
                        ? SortDirection.DESC
                        : SortDirection.ASC
                    )
                  }
                >
                  {sortDirection === SortDirection.ASC ? (
                    <RiSortAsc
                      className="h-5 w-5 text-white"
                      aria-hidden="true"
                    />
                  ) : (
                    <RiSortDesc
                      className="h-5 w-5 text-white"
                      aria-hidden="true"
                    />
                  )}
                </button>
                <Listbox.Button
                  className={classNames(
                    'flex items-center py-2',
                    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-primary group'
                  )}
                >
                  <span className="sr-only">Change sort</span>
                  <p
                    className={classNames(
                      'ml-2.5',
                      // if option has no value, assume it's a default option and don't highlight it
                      value?.value
                        ? 'font-bold underline underline-offset-1 text-white'
                        : 'text-secondary group-hover:text-white'
                    )}
                  >
                    {value?.label ?? 'Sort by'}
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
                <Listbox.Options
                  className={classNames(
                    'origin-top-right absolute z-10 right-0 mt-2 w-40 overflow-hidden',
                    'rounded-md bg-black/50 divide-y divide-[#ffffff22]',
                    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-primary'
                  )}
                >
                  {options.map((option) => (
                    <Listbox.Option
                      key={option.value}
                      className={({ active }) =>
                        classNames(
                          active ? 'text-black bg-green-primary' : 'text-white',
                          'cursor-default select-none relative p-4 text-sm'
                        )
                      }
                      value={option}
                    >
                      {({ selected, active }) => {
                        return (
                          <div className="flex flex-col">
                            <div className="flex justify-between">
                              <p
                                className={
                                  selected ? 'font-semibold' : 'font-normal'
                                }
                              >
                                {option.label}
                              </p>
                              {selected ? (
                                <span
                                  className={
                                    active ? 'text-white' : 'text-green-primary'
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
                        );
                      }}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
}
