import React from 'react';
import classNames from 'classnames';

interface BlockQuoteProps {
  className?: string;
  value: string | JSX.Element;
  title?: string;
  subtitle?: string;
}

export default function BlockQuote({
  className,
  value,
  title,
  subtitle,
}: BlockQuoteProps) {
  return (
    <div
      className={classNames(
        'pb-12 py-14 sm:px-12 border-y border-[#ffffff22] flex flex-col items-center',
        className
      )}
    >
      {title && <h2 className="mb-16 text-4xl font-grifter">{title}</h2>}
      <div className="flex justify-center gap-x-2">
        <svg
          className="scale-75 -mt-5 fill-emerald-300 shrink-0"
          width="38"
          height="28"
          viewBox="0 0 38 28"
        >
          <path
            d="M2.99992 27.3337H10.9999L16.3333 16.667V0.666992H0.333252V16.667H8.33325L2.99992 27.3337ZM24.3333 27.3337H32.3333L37.6666 16.667V0.666992H21.6666V16.667H29.6666L24.3333 27.3337Z"
            fill="inherit"
          />
        </svg>
        <div className="flex flex-col gap-y-4">
          <span className="font-grifter text-3xl">{value}</span>
          {subtitle && <p className="text-gray-400">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
