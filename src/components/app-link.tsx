import { p } from '@/lib/helper';
import Link, { LinkProps } from 'next/link';
import React from 'react';

interface AppLinkProps extends LinkProps {
  href: string;
  target?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const AppLink: React.FC<AppLinkProps> = ({ href, className, target, onClick, children, ...props }) => (
  <Link href={p`${href}`} {...props}>
    <a
      {...(target ? { target } : {})}
      {...(onClick ? { onClick } : {})}
      {...(className ? { className } : {})}>
      {children}
    </a>
  </Link>
);

export default AppLink;
