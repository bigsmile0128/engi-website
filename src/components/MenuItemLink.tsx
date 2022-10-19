import React from 'react';
import Link from 'next/link';

type MenuItemLinkProps = {
  children: any;
  className?: string;
  href: string;
};

// to be used for rendering a link inside headlessui Menu.Item
function MenuItemLink({ href, children, ...props }: MenuItemLinkProps) {
  return (
    <Link href={href} passHref>
      <button {...props}>{children}</button>
    </Link>
  );
}

export default MenuItemLink;
