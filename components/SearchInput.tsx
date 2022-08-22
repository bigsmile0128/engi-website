import React, { InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import { RiSearchLine } from 'react-icons/ri';

type SearchInputProps = {
  className?: string;
  isLoading?: boolean;
};

export default function SearchInput({
  className,
  isLoading,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & SearchInputProps) {
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
      <input
        type="text"
        className={classNames(
          'block w-full bg-transparent outline-none pl-8',
          'placeholder:text-secondary',
          'border-b border-transparent'
        )}
        autoComplete="off"
        {...props}
      />
    </div>
  );
}
