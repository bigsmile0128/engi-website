import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { LIGHTPAPER_LINK } from '~/utils/links';

type PlaceholderButtonProps = {
  className?: string;
};

export default function PlaceholderButton({
  className,
}: PlaceholderButtonProps) {
  return (
    <Link href={LIGHTPAPER_LINK}>
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
