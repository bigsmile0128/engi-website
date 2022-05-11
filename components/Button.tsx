import React from 'react';
import classNames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: any;
}

export default function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={classNames(
        'relative bg-white font-bold text-sm text-black hover:bg-gray-200 active:bg-gray-300 focus:outline-none focus:ring px-8 py-4 text-md',
        "before:border-b-2 before:border-emerald-300 before:content-[''] before:absolute before:inset-0 before:mx-auto before:w-0 before:ease-in-out before:duration-500 hover:before:w-full",
        className
      )}
    >
      {children}
    </button>
  );
}
