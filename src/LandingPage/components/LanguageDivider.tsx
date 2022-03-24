import React from 'react';
import classNames from 'classnames';
import {
  CodeIcon,
  AcademicCapIcon,
  FingerPrintIcon,
  KeyIcon,
} from '@heroicons/react/outline';

interface LanguageDividerProps {
  className?: string;
}

export default function LanguageDivider({ className }: LanguageDividerProps) {
  return (
    <div className={classNames('', className)}>
      <div className="max-w-full h-px mx-auto bg-gradient-to-r from-gray-800 via-green-700 to-gray-800"></div>
      <div className="w-full h-24 bg-gray-900 flex justify-center items-center">
        <CodeIcon className="h-6 w-6 text-green-700 shrink-0 mx-6" />
        <AcademicCapIcon className="h-6 w-6 text-green-700 shrink-0 mx-6" />
        <FingerPrintIcon className="h-6 w-6 text-green-700 shrink-0 mx-6" />
        <KeyIcon className="h-6 w-6 text-green-700 shrink-0 mx-6" />
      </div>
      <div className="max-w-full h-px mx-auto bg-gradient-to-r from-gray-800 via-green-700 to-gray-800"></div>
    </div>
  );
}
