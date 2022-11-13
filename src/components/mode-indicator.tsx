import React, { useContext } from 'react';
import { AppMode } from '@/context/data/mode-context';

const ModeIndicator: React.FC = () => {
  const { testMode } = useContext(AppMode);

  return (
    <>
      {testMode && <div className="mode-indicator">
        <span className="mode-indicator-label has-text-weight-semibold">TEST DATA</span>
      </div>}
    </>
  )
};

export default ModeIndicator;
