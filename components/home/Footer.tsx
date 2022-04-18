import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

import LogoAndTextSvg from './img/logotext.svg';

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
      <div className="w-full max-w-3xl lg:max-w-4xl flex items-center gap-x-12 sm:gap-x-16">
        <LogoAndTextSvg className="h-8 fill-emerald-300 shrink-0" />
        <Link href="/press">Press</Link>
        {/* TODO: add contact page */}
        <Link href="/contact">Contact</Link>
      </div>
    </div>
  );
}
