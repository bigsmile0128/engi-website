import React from 'react';
import classNames from 'classnames';

interface TagProps {
  className?: string;
  children?: any;
}

export default function Tag({ className, children }: TagProps) {
  return (
    <span
      className={classNames(
        'inline-flex items-center border border-gray-500 py-1 px-4 bg-gradient-to-r from-[#ffffff15]',
        className
      )}
    >
      {children}
    </span>
  );
}
