import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';

type TextLinkProps = {
  children: any;
  className?: string;
  href: string;
};

export default function TextLink({ className, children, href }: TextLinkProps) {
  return (
    <Link
      href={href}
      className={classNames('font-bold text-green-primary', className)}
    >
      {children}
    </Link>
  );
}
