import React from 'react';
import classNames from 'classnames';
import { SiPython } from '@react-icons/all-files/si/SiPython';
import { SiReact } from '@react-icons/all-files/si/SiReact';
import { SiRust } from '@react-icons/all-files/si/SiRust';
import { SiTypescript } from '@react-icons/all-files/si/SiTypescript';

interface LanguageDividerProps {
  className?: string;
}

export default function LanguageDivider({ className }: LanguageDividerProps) {
  return (
    <div className={classNames('', className)}>
      <div className="max-w-full h-px mx-auto bg-gradient-to-r from-gray-800 via-green-primary to-gray-800"></div>
      <div className="w-full h-32 bg-[#232323cc] flex justify-center items-center gap-x-12 sm:gap-x-16">
        <SiPython className="h-8 w-8 fill-green-primary" />
        <SiReact className="h-8 w-8 fill-green-primary" />
        <SiRust className="h-8 w-8 fill-green-primary" />
        <SiTypescript className="h-8 w-8 fill-green-primary" />
      </div>
      <div className="max-w-full h-px mx-auto bg-gradient-to-r from-gray-800 via-green-primary to-gray-800"></div>
    </div>
  );
}
