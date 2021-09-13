import React, { useContext, useEffect, useState } from 'react';
import { References } from '@/api/index';
import { RestContext } from '@/client/context';
import { AutocompleteConfig } from '@/lib/autocomplete';

export type APIReferenesType = References & { address_auto_complete: AutocompleteConfig };

export const APIReference = React.createContext<APIReferenesType>({} as APIReferenesType);

const APIReferenceProvider: React.FC = ({ children }) => {
  const purplship = useContext(RestContext);
  const [references, setValue] = useState<APIReferenesType>({} as APIReferenesType);

  useEffect(() => {
    purplship?.API.data().then(data => setValue(data as APIReferenesType));
  }, [purplship]);

  return (
    <APIReference.Provider value={references}>
      {children}
    </APIReference.Provider>
  );
};

export default APIReferenceProvider;
