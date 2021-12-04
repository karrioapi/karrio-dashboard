import { p } from '@/lib/helper';
import Link from 'next/link';
import React from 'react';

interface AppLinkProps {
  href: string;
  className?: string;
}

const AppLink: React.FC<AppLinkProps> = ({ href, className, children }) => (
  <Link href={p`${href}`}>
    <a className={className}>{children}</a>
  </Link>
);

export default AppLink;
