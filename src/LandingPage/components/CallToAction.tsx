import React from 'react';
import classNames from 'classnames';
import EmailRegistration from './EmailRegistration';

interface CallToActionProps {
  className?: string;
}

export default function CallToAction({ className }: CallToActionProps) {
  return (
    <div className={classNames('relative', className)}>
      <svg className="absolute" width="100%" height="100%">
        <defs>
          <pattern
            id="grid-cta"
            x="-1"
            y="-1"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <rect
              stroke="rgba(255,255,255,.1)"
              fill="none"
              width="50"
              height="50"
            ></rect>
          </pattern>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#grid-cta)"
        ></rect>
      </svg>
      <div className="flex flex-col items-center justify-center px-6 py-24 md:px-0 z-10">
        <h2 className="font-grifter text-5xl mb-8 text-center">
          Ready to join engi?
        </h2>
        <p className="mb-12 text-gray-300 text-center">
          Enter your email address and get started today!
        </p>
        <EmailRegistration
          className="sm:w-full sm:max-w-md mx-6"
          inputClassName="bg-gray-800 z-10"
        />
      </div>
    </div>
  );
}
