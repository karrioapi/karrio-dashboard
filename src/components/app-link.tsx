import { p } from '@/lib/helper';
import Link, { LinkProps } from 'next/link';
import React from 'react';

interface AppLinkProps extends LinkProps {
  href: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const AppLink: React.FC<AppLinkProps> = ({ href, className, onClick, children, ...props }) => (
  <Link href={p`${href}`} {...props}>
    <a className={className} {...(onClick ? { onClick } : {})}>{children}</a>
  </Link>
);

export default AppLink;
