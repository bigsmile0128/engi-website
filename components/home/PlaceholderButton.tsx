import React from 'react';
import classNames from 'classnames';

type PlaceholderButtonProps = {
  className?: string;
};

export default function PlaceholderButton({
  className,
}: PlaceholderButtonProps) {
  return (
    <button
      className={classNames(
        'px-6 py-4 bg-black/20 border border-white font-bold',
        className
      )}
    >
      Learn more
    </button>
  );
}
