import React from 'react';
import classNames from 'classnames';
import EmailRegistration from './EmailRegistration';
import GridPattern from '../../components/GridPattern';

interface CallToActionProps {
  className?: string;
}

export default function CallToAction({ className }: CallToActionProps) {
  return (
    <div className={classNames('relative', className)}>
      <GridPattern offset={-1} />
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
