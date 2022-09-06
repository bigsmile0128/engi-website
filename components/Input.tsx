import React, { InputHTMLAttributes } from 'react';
import classNames from 'classnames';

type InputProps = {
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={classNames(
        'bg-transparent border border-white/30 p-4',
        'text-white placeholder:text-secondary font-medium',
        'outline-none focus-visible:ring-1 ring-green-primary',
        className
      )}
      {...props}
    />
  );
}
