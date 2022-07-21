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
    <Link href="/litepaper">
      <a>
        <button
          className={classNames(
            'px-6 py-4 bg-black/20 border border-white font-bold',
            className
          )}
        >
          Learn more
        </button>
      </a>
    </Link>
  );
}
