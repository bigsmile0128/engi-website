import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import { Fragment } from 'react';
import { RiSortAsc, RiSortDesc } from 'react-icons/ri';

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
  onChange: (value: Option) => void;
  onChangeSortDirection: (sortDirection: SortDirection) => void;
  options: Option[];
  sortDirection: SortDirection;
  value?: Option;
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
                    'focus-visible:ring-1 focus-visible:ring-green-primary text-white hover:text-green-primary'
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
                    <RiSortAsc className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <RiSortDesc className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
                <Listbox.Button
                  className={classNames(
                    'flex items-center py-2',
                    'outline-none focus-visible:ring-1 focus-visible:ring-green-primary group'
                  )}
                >
                  <span className="sr-only">Change sort</span>
                  <p
                    className={classNames(
                      'ml-2.5 text-secondary group-hover:text-white'
                    )}
                  >
                    {value?.label && (
                      <span className="font-medium text-white">Sort by: </span>
                    )}
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
                    'origin-top-right absolute z-10 right-0 mt-2 w-48 overflow-hidden',
                    'bg-[#232323]/80 backdrop-blur-[12.5px]',
                    'outline-none focus-visible:ring-1 focus-visible:ring-green-primary'
                  )}
                >
                  {options.map((option, i) => (
                    <Listbox.Option
                      key={option.value}
                      className={() =>
                        classNames(
                          'hover:bg-[#232323]',
                          'select-none cursor-pointer'
                        )
                      }
                      value={option}
                    >
                      {() => (
                        <div className="">
                          <p
                            className={classNames(
                              'text-white w-full ml-6 pr-4 py-3',
                              i !== options.length - 1
                                ? 'border-b border-white/30'
                                : ''
                            )}
                          >
                            {option.label}
                          </p>
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
  );
}
