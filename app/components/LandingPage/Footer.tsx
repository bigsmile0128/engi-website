import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import logoTextSrc from '~/img/logotext.svg';

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <div
      className={classNames(
        'flex items-center justify-center bg-black px-12 py-6',
        className
      )}
    >
      <div className="flex w-full max-w-3xl items-center gap-x-12 sm:gap-x-16 lg:max-w-4xl">
        <img
          src={logoTextSrc}
          alt="engi-logo"
          className="h-8 shrink-0 fill-emerald-300"
        />
        <Link to="/press">Press</Link>
        {/* TODO: add contact page */}
        <Link to="/contact">Contact</Link>
      </div>
    </div>
  );
}
