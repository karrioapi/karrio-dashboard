import React, { useContext } from 'react';
import { APIReference } from '@/context/references-provider';
import { formatCarrierSlug } from '@/lib/helper';

interface AppBadgeComponent extends React.AllHTMLAttributes<HTMLSpanElement> { }

const AppBadge: React.FC<AppBadgeComponent> = ({ className, ...props }) => {
  const { app_name } = useContext(APIReference);

  return (
    <strong
      className={`is-lowercase has-text-weight-bold has-text-primary`}
      style={{ fontSize: '90%', borderRadius: '4px' }}
      {...props}
    >
      {formatCarrierSlug(app_name)}
    </strong>
  );
};

export default AppBadge;
