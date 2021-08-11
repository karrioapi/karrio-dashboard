import { AppMode } from '@/context/app-mode-provider';
import Link from 'next/link';
import React, { useContext } from 'react';

interface AppLinkProps {
  href: string;
  className?: string;
}

const AppLink: React.FC<AppLinkProps> = ({ href, className, children }) => {
  const { basePath, testMode } = useContext(AppMode);

  return (
    <Link href={(testMode ? basePath : "/") + href}>
      <a className={className}>{children}</a>
    </Link>
  )
};

export default AppLink;
