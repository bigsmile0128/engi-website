import React from 'react';
import classNames from 'classnames';
import { SiPython, SiReact, SiRust, SiTypescript } from 'react-icons/si';

interface LanguageDividerProps {
  className?: string;
}

export default function LanguageDivider({ className }: LanguageDividerProps) {
  return (
    <div className={classNames('', className)}>
      <div className="mx-auto h-px max-w-full bg-gradient-to-r from-gray-800 via-emerald-300 to-gray-800"></div>
      <div className="flex h-32 w-full items-center justify-center gap-x-12 bg-[#232323cc] sm:gap-x-16">
        <SiPython className="h-8 w-8 fill-emerald-300" />
        <SiReact className="h-8 w-8 fill-emerald-300" />
        <SiRust className="h-8 w-8 fill-emerald-300" />
        <SiTypescript className="h-8 w-8 fill-emerald-300" />
      </div>
      <div className="mx-auto h-px max-w-full bg-gradient-to-r from-gray-800 via-emerald-300 to-gray-800"></div>
    </div>
  );
}
