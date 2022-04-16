import React from 'react';
import { Link } from 'react-router-dom';
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
      <div className="w-full max-w-3xl lg:max-w-4xl flex items-center gap-x-12 sm:gap-x-16">
        <LogoAndTextSvg className="h-8 fill-emerald-300 shrink-0" />
        <Link to="/press">Press</Link>
        {/* TODO: add contact page */}
        <Link to="/contact">Contact</Link>
      </div>
    </div>
  );
}
