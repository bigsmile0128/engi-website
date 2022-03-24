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
          {/* TODO: use exact orange from designs */}
          Write code, <span className="text-orange-500">get paid</span>
        </h3>
        <p className="text-gray-300 pr-10">
          No need to apply. Get paid instantly regardless of your time zone or
          language.
        </p>
      </div>
      <div className="flex-1 border border-gray-400 p-6">
        <h3 className="font-grifter text-xl">
          {/* TODO: use exact orange from designs */}
          Build products <span className="text-orange-500">faster</span>
        </h3>
        <p className="text-gray-300 pr-10">
          No sourcing. No recruiting. Find worldwide talent instantly.
        </p>
      </div>
    </div>
  );
}
