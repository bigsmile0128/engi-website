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
        'bg-white px-6 py-4 text-sm font-bold text-black hover:bg-gray-200 focus:outline-none focus:ring active:bg-gray-300',
        className
      )}
    >
      {children}
    </button>
  );
}
