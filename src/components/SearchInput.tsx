import { Combobox, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { Fragment, InputHTMLAttributes, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { RiSearchLine } from 'react-icons/ri';
import { Bit } from '~/types';
import useBits from '~/utils/hooks/useBits';
import useDebounce from '~/utils/hooks/useDebounce';

type SearchInputProps = {
  className?: string;
  isLoading?: boolean;
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
};

export default function SearchInput({
  className,
  isLoading,
  placeholder,
  value,
  onChange,
}: InputHTMLAttributes<HTMLInputElement> & SearchInputProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const debouncedQuery = useDebounce(query, 300);
  const { isLoading: isLoadingBits, data } = useBits({
    skip: 0,
    limit: 10,
    search: debouncedQuery,
  });

  return (
    <div
      className={classNames(
        'relative flex items-center',
        'border-b border-white/40 focus-within:border-green-primary',
        isLoading ? 'border-b-0 skeleton' : 'transition-colors duration-300',
        className
      )}
    >
      <div className="flex items-center justify-center absolute pointer-events-none">
        <RiSearchLine className="h-5 w-5 text-white" />
      </div>
      <Combobox
        value={value}
        onChange={(value) => {
          // if bit ID, navigate directly to the bit
          if (/^\d{10,}$/.test(value ?? '')) {
            router.push(`/bits/${value}`);
          } else {
            onChange(value ?? '');
          }
        }}
        nullable
      >
        <Combobox.Input
          onChange={(e) => {
            // don't require pressing enter if clearing search query
            if (e.target.value === '') {
              onChange('');
            } else {
              setQuery(e.target.value);
            }
          }}
          className={classNames(
            'block w-full bg-transparent outline-none pl-8',
            'border-b border-transparent',
            'placeholder:text-secondary'
          )}
          placeholder={placeholder ?? 'Search for a bounty...'}
        />
        {isLoadingBits && (
          <div className="absolute top-1/2 right-1 -translate-y-1/2">
            <AiOutlineLoading className="h-4 w-4 animate-spin" />
          </div>
        )}
        <Transition
          as={Fragment}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Combobox.Options
            className={classNames(
              'absolute top-12 max-h-60 w-full overflow-auto',
              'bg-[#232323]/60 backdrop-blur-[12.5px] py-1',
              !debouncedQuery || query === '' ? 'hidden' : ''
            )}
          >
            <Combobox.Option
              key={query}
              value={query}
              className={({ active }) =>
                classNames(
                  'relative cursor-default select-none py-2 px-4',
                  active ? 'bg-green-primary/20 text-white' : ''
                )
              }
            >
              Search for {query}
            </Combobox.Option>
            {data?.result?.items?.map((bit: Bit) => (
              <Combobox.Option
                key={bit.id}
                value={bit.id}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 px-4',
                    active ? 'bg-green-primary/20 text-white' : ''
                  )
                }
              >
                {bit.name}
              </Combobox.Option>
            ))}
            {isLoadingBits && (
              <Combobox.Option
                className="relative cursor-default select-none py-2 px-4 text-secondary bg-gray-300/20"
                value={''}
                disabled
              >
                Searching for bounties...
              </Combobox.Option>
            )}
          </Combobox.Options>
        </Transition>
      </Combobox>
    </div>
  );
}
