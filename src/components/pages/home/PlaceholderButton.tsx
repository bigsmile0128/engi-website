import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';

type PlaceholderButtonProps = {
  className?: string;
};

export default function PlaceholderButton({
  className,
}: PlaceholderButtonProps) {
  return (
    <Link href="https://links.engi.network/lightpaper">
      <button
        className={classNames(
          'px-6 py-4 bg-black/20 border border-white font-bold capitalize',
          className
        )}
      >
        Learn more
      </button>
    </Link>
  );
}
