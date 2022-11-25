import React, { Fragment } from 'react';
import classNames from 'classnames';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/outline';

export type Option = {
  label: string;
  value: any;
};

type SelectMenuProps = {
  buttonLabel: string;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  labelClassName?: string;
  onChange: (value: Option) => void;
  optionClassName?: string;
  options: Option[];
  optionsContainerClassName?: string;
  value?: Option;
};

export default function SelectMenu({
  className,
  labelClassName,
  isLoading,
  options,
  value,
  onChange,
  optionClassName,
  optionsContainerClassName,
  buttonLabel,
  disabled,
}: SelectMenuProps) {
  return (
    <div className={classNames('', isLoading ? 'skeleton' : '', className)}>
      <Listbox value={value} onChange={onChange} disabled={disabled}>
        {({ open }) => (
          <>
            <div className="relative inline-block">
              <div className="flex items-center">
                <Listbox.Button
                  className={classNames(
                    'flex items-center py-2',
                    'outline-none focus-visible:ring-1 focus-visible:ring-green-primary group'
                  )}
                >
                  <p
                    className={classNames(
                      'ml-2.5 group-hover:decoration-green-primary',
                      // if option has no value, assume it's a default option and don't highlight it
                      value?.value
                        ? 'font-bold underline underline-offset-1 text-white'
                        : 'text-secondary group-hover:text-white',
                      labelClassName
                    )}
                  >
                    {value?.label ?? buttonLabel}
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
                    'rounded-md bg-black/90 divide-y divide-[#ffffff22]',
                    'outline-none focus-visible:ring-1 focus-visible:ring-green-primary',
                    optionsContainerClassName
                  )}
                >
                  {options.map((option) => (
                    <Listbox.Option
                      key={option.value}
                      className={({ active }) =>
                        classNames(
                          active ? 'text-black bg-green-primary' : 'text-white',
                          'cursor-default select-none relative p-4 text-sm',
                          optionClassName
                        )
                      }
                      value={option}
                    >
                      {({ selected, active }) => {
                        return (
                          <div className="flex flex-col">
                            <div className="flex justify-between">
                              <p
                                className={classNames(
                                  'truncate',
                                  selected ? 'font-semibold' : 'font-normal'
                                )}
                              >
                                {option.label}
                              </p>
                              {selected ? (
                                <span
                                  className={
                                    active ? 'text-black' : 'text-green-primary'
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
