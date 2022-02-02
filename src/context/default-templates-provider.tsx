import React from 'react';
import { LazyQueryResult, useLazyQuery } from '@apollo/client';
import { get_default_templates, GET_DEFAULT_TEMPLATES, get_default_templates_default_templates, get_default_templates_default_templates_default_address_address, get_default_templates_default_templates_default_customs_customs, get_default_templates_default_templates_default_parcel_parcel } from '@purplship/graphql';


export type DefaultTemplatesType = LazyQueryResult<get_default_templates, any> & {
  default_address: get_default_templates_default_templates_default_address_address | null;
  default_customs: get_default_templates_default_templates_default_customs_customs | null;
  default_parcel: get_default_templates_default_templates_default_parcel_parcel | null;
  load: (options?: any) => Promise<any>;
};

export const DefaultTemplatesData = React.createContext<DefaultTemplatesType>({} as DefaultTemplatesType);

const TemplatesProvider: React.FC = ({ children }) => {
  const [initialLoad, result] = useLazyQuery<get_default_templates>(GET_DEFAULT_TEMPLATES);

  const extract = (templates?: get_default_templates_default_templates) => {
    const { default_address, default_customs, default_parcel } = templates || {};
    return {
      default_address: default_address ? default_address?.address : null,
      default_customs: default_customs?.customs ? default_customs?.customs : null,
      default_parcel: default_parcel?.parcel ? default_parcel?.parcel : null,
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
