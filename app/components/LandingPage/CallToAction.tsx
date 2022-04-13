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
      <div className="z-10 flex flex-col items-center justify-center px-6 py-24 md:px-0">
        <h2 className="mb-8 text-center font-grifter text-5xl">
          Ready to join engi?
        </h2>
        <p className="mb-12 text-center text-gray-300">
          Enter your email address and get started today!
        </p>
        <EmailRegistration
          className="mx-6 sm:w-full sm:max-w-md"
          inputClassName="bg-gray-800 z-10"
        />
      </div>
    </div>
  );
}
