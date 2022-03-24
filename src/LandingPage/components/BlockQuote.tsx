import React from 'react';
import classNames from 'classnames';

interface BlockQuoteProps {
  className?: string;
}

export default function BlockQuote({ className }: BlockQuoteProps) {
  return (
    <div
      className={classNames(
        '',
        'mx-6 md:mx-auto pb-12 py-14 px-12 my-24 border-y border-[#00000022] flex justify-center gap-x-2'
      )}
    >
      <svg
        className="scale-75 -mt-5"
        width="38"
        height="28"
        viewBox="0 0 38 28"
        fill="none"
      >
        <path
          d="M2.99992 27.3337H10.9999L16.3333 16.667V0.666992H0.333252V16.667H8.33325L2.99992 27.3337ZM24.3333 27.3337H32.3333L37.6666 16.667V0.666992H21.6666V16.667H29.6666L24.3333 27.3337Z"
          fill="#65FEB7"
        />
      </svg>
      <div className="flex flex-col gap-y-4">
        <h2 className="font-grifter text-3xl">We built engi using engi</h2>
        <p className="text-gray-400">
          Cupcake ipsum dolor sit amet. Tootsie roll sesame snaps chocolate bar.
        </p>
      </div>
    </div>
  );
}
