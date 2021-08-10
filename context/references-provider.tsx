import React, { useContext, useEffect, useState } from 'react';
import { References } from '@/api/index';
import { RestContext } from '@/client/context';


export const APIReference = React.createContext<References>({} as References);

const APIReferenceProvider: React.FC = ({ children }) => {
  const purplship = useContext(RestContext);
  const [references, setValue] = useState<References>({} as References);

  useEffect(() => {
    purplship?.API.data().then(({ data }) => setValue(data));
  }, [purplship]);

  return (
    <APIReference.Provider value={references}>
      {children}
    </APIReference.Provider>
  );
};

export default APIReferenceProvider;
