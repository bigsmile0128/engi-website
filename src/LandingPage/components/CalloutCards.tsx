import React from 'react';
import classNames from 'classnames';

interface CalloutCardsProps {
  className?: string;
}

export default function CalloutCards({ className }: CalloutCardsProps) {
  return (
    <div
      className={classNames(
        'flex flex-col md:flex-row gap-x-6 gap-y-6',
        className
      )}
    >
      <div className="flex-1 border border-gray-400 p-6">
        <h3 className="font-grifter text-xl">
          Write code, <span className="text-[#F27B50]">get paid</span>
        </h3>
        <p className="text-gray-300 pr-10">
          No need to apply. Get paid instantly regardless of your time zone or
          language.
        </p>
      </div>
      <div className="flex-1 border border-gray-400 p-6">
        <h3 className="font-grifter text-xl">
          Build products <span className="text-[#F27B50]">faster</span>
        </h3>
        <p className="text-gray-300 pr-10">
          No sourcing. No recruiting. Find worldwide talent instantly.
        </p>
      </div>
    </div>
  );
}
