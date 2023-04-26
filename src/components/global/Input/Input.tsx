import classNames from 'classnames';
import { InputHTMLAttributes } from 'react';

type InputProps = {
  className?: string;
  inputRef?: any;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  className,
  inputRef,
  disabled,
  ...props
}: InputProps) {
  return (
    <input
      className={classNames(
        'bg-transparent border border-white/30 p-4',
        'placeholder:text-secondary font-medium',
        disabled
          ? 'text-white/60 pointer-events-none'
          : 'text-white focus-green-primary',
        className
      )}
      ref={inputRef}
      {...props}
    />
  );
}
