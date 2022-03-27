import React from 'react';
import classNames from 'classnames';

import { ReactComponent as LogoAndTextSvg } from '../img/logotext.svg';

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <div
      className={classNames(
        'bg-black flex items-center justify-center px-12 py-6',
        className
      )}
    >
      <div className="w-full max-w-3xl lg:max-w-4xl">
        <LogoAndTextSvg className="h-8 fill-emerald-300" />
      </div>
    </div>
  );
}
