import { useAPIReference } from '@/context/reference';
import { formatCarrierSlug } from '@/lib/helper';
import React from 'react';

interface AppBadgeComponent extends React.AllHTMLAttributes<HTMLSpanElement> { }

const AppBadge: React.FC<AppBadgeComponent> = ({ className, ...props }) => {
  const { APP_NAME } = useAPIReference();

  return (
    <strong
      className={`is-lowercase has-text-weight-bold has-text-primary`}
      style={{ fontSize: '90%', borderRadius: '4px' }}
      {...props}
    >
      {formatCarrierSlug(APP_NAME)}
    </strong>
  );
};

export default AppBadge;
