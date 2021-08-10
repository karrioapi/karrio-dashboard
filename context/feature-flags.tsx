import React, { useEffect, useState } from "react";


export type FeatureFlagType = {
  MULTI_ORGANIZATIONS: boolean,
  ADDRESS_AUTO_COMPLETE: {
    is_enabled: boolean;
    provider?: string;
    url?: string;
    key?: string;
  }
};

function collectFeatureFlags(): FeatureFlagType {
  if (typeof window !== 'undefined') {
    const script = window?.document.getElementById('data-flags');
    const value = JSON.parse(script?.textContent || "{}");

    return value;
  }
  return {} as FeatureFlagType;
}


export const FeatureFlags = React.createContext<FeatureFlagType>(collectFeatureFlags());

const FeatureFlagsContext: React.FC = ({ children }) => {
  const [features, update] = useState<FeatureFlagType>(collectFeatureFlags());

  useEffect(() => { update(collectFeatureFlags()); }, []);

  return (
    <FeatureFlags.Provider value={features}>
      {children}
    </FeatureFlags.Provider>
  );
};

export default FeatureFlagsContext;
