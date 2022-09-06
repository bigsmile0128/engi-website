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
        'inline-flex items-center py-1 px-4',
        'border border-white/20',
        'bg-gradient-to-r from-[#ffffff10]',
        className
      )}
    >
      {children}
    </span>
  );
}
