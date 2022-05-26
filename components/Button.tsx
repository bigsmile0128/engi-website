import React from 'react';
import classNames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: any;
  disabled?: boolean;
}

export default function Button({
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={classNames(
        'relative bg-white font-bold text-sm text-black focus:outline-none focus:ring-1 focus:ring-emerald-200 peer px-8 py-4 text-md disabled:text-gray-400 border-t border-t-white border-b border-b-transparent',
        // hover and active states
        disabled
          ? ''
          : "active:bg-gray-300 before:border-b-2 before:border-emerald-300 before:content-[''] before:absolute before:inset-0 before:bottom-[-1px] before:mx-auto before:w-0 before:ease-in-out before:duration-500 hover:before:w-full",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
