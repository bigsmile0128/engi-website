import React from 'react';
import Link from 'next/link';

type MenuItemLinkProps = {
  className?: string;
  href: string;
  children: any;
};

// to be used for rendering a link inside headlessui Menu.Item
function MenuItemLink({ href, children, ...props }: MenuItemLinkProps) {
  return (
    <Link href={href} passHref>
      <button {...props}>{children}</button>
    </Link>
  );
}

export default React.forwardRef(MenuItemLink);
