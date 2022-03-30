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
        'bg-white font-bold text-sm text-black hover:bg-gray-200 active:bg-gray-300 focus:outline-none focus:ring px-6 py-4',
        className
      )}
    >
      {children}
    </button>
  );
}
