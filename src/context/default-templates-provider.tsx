import React from 'react';
import { LazyQueryResult, useLazyQuery } from '@apollo/client';
import { get_default_templates, GET_DEFAULT_TEMPLATES, get_default_templates_default_templates } from '@purplship/graphql';
import { AddressType, CustomsType, ParcelType } from '@/lib/types';


export type DefaultTemplatesType = LazyQueryResult<get_default_templates, any> & {
  default_address?: AddressType | null;
  default_customs?: CustomsType | null;
  default_parcel?: ParcelType | null;
  load: (options?: any) => void;
};

export const DefaultTemplatesData = React.createContext<DefaultTemplatesType>({} as DefaultTemplatesType);

const TemplatesProvider: React.FC = ({ children }) => {
  const [initialLoad, result] = useLazyQuery<get_default_templates>(GET_DEFAULT_TEMPLATES);

  const extract = (templates?: get_default_templates_default_templates) => {
    const { default_address, default_customs, default_parcel } = templates || {};
    return {
      default_address: default_address?.address as AddressType,
      default_customs: default_customs?.customs as CustomsType,
      default_parcel: default_parcel?.parcel as ParcelType,
    };
  };
  const load = (options?: any) => result.called ? result.fetchMore({}) : initialLoad(options);

  return (
    <DefaultTemplatesData.Provider value={{
      load,
      ...extract(result.data?.default_templates),
      ...result,
    }}>
      {children}
    </DefaultTemplatesData.Provider>
  );
};

export default TemplatesProvider;
