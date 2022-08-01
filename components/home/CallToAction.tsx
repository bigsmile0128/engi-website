import React from 'react';
import classNames from 'classnames';
import GridPattern from 'components/GridPattern';
import EmailRegistration from './EmailRegistration';

interface CallToActionProps {
  className?: string;
}

export default function CallToAction({ className }: CallToActionProps) {
  return (
    <div className={classNames('relative', className)}>
      <GridPattern id="call-to-action" offset={-1} />
      <div className="flex flex-col items-center justify-center px-6 py-24 md:px-0 z-10">
        <h2 className="font-grifter text-5xl mb-8 text-center">
          Ready to join engi?
        </h2>
        <p className="mb-12 text-secondary text-center">
          Enter your email address and get started today!
        </p>
        <EmailRegistration
          className="w-full sm:max-w-md mx-6"
          inputClassName="bg-gray-800 z-10"
        />
      </div>
    </div>
  );
}
