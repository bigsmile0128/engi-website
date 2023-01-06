import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

type MenuItemLinkProps = {
  children: any;
  className?: string;
  href: string;
};

// to be used for rendering a link inside headlessui Menu.Item
function MenuItemLink({
  href,
  children,
  className,
  ...props
}: MenuItemLinkProps) {
  return (
    <Link href={href} className="flex">
      <button className={classNames('flex-1', className)} {...props}>
        {children}
      </button>
    </Link>
  );
}

export default MenuItemLink;
