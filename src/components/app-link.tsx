import { AppMode } from '@/context/app-mode-provider';
import { p } from '@/lib/helper';
import Link, { LinkProps } from 'next/link';
import React, { useContext } from 'react';

interface AppLinkProps extends LinkProps {
  href: string;
  target?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const AppLink: React.FC<AppLinkProps> = ({ href, className, target, onClick, children, ...props }) => {
  const { basePath } = useContext(AppMode);

  return (
    <Link legacyBehavior href={p`${basePath}${href}`} {...props}>
      <a
        {...(target ? { target } : {})}
        {...(onClick ? { onClick } : {})}
        {...(className ? { className } : {})}>
        {children}
      </a>
    </Link>
  )
};

export default AppLink;
