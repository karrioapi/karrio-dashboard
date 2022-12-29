import { discard_commodity, DISCARD_COMMODITY, discard_commodityVariables, discard_customs, DISCARD_CUSTOMS, discard_customsVariables, discard_parcel, DISCARD_PARCEL, discard_parcelVariables, GET_SHIPMENT, PartialShipmentUpdateInput, partial_shipment_update, partial_shipment_updateVariables, PARTIAL_UPDATE_SHIPMENT } from 'karrio/graphql';
import { OperationResponse, RateResponse, Shipment } from 'karrio/rest/index';
import { handleFailure, handleGraphQLRequest } from '@/lib/helper';
import { LabelContext } from '@/context/label-data-provider';
import { RestContext } from '@/client/context';
import { useMutation } from '@apollo/client';
import { ShipmentType } from '@/lib/types';
import React, { useContext } from 'react';


export type ShipmentMutator = {
  fetchRates: (shipment: ShipmentType) => Promise<AxiosResponse<RateResponse, any>>;
  buyLabel: (shipment: ShipmentType) => Promise<AxiosResponse<Shipment, any>>;
  voidLabel: (shipment: ShipmentType) => Promise<AxiosResponse<OperationResponse, any>>;
  updateShipment: (data: PartialShipmentMutationInput) => Promise<void>;
  discardCommodity: (id: string) => Promise<void>;
  discardCustoms: (id: string) => Promise<void>;
  discardParcel: (id: string) => Promise<void>;
};

export const ShipmentMutationContext = React.createContext<ShipmentMutator>({} as ShipmentMutator);

const ShipmentMutationProvider: React.FC<{}> = ({ children }) => {
  const karrio = useContext(RestContext);
  const state = useContext(LabelContext);

  const [updateShipmentMutation] = useMutation<partial_shipment_update, partial_shipment_updateVariables>(PARTIAL_UPDATE_SHIPMENT);
  const [discardCommodityMutation] = useMutation<discard_commodity, discard_commodityVariables>(DISCARD_COMMODITY);
  const [discardCustomsMutation] = useMutation<discard_customs, discard_customsVariables>(DISCARD_CUSTOMS);
  const [discardParcelMutation] = useMutation<discard_parcel, discard_parcelVariables>(DISCARD_PARCEL);

  const fetchRates = async (shipment: ShipmentType) => handleFailure(
    karrio!.proxy
      .fetchRates({ data: (shipment as any) })
      .then(({ data }) => data)
  );
  const buyLabel = async (shipment: ShipmentType) => handleFailure(
    shipment.id !== undefined
      ? karrio!.shipments.purchase({
        id: shipment.id as string,
        data: { selected_rate_id: shipment.selected_rate_id as string },
      }).then(({ data }) => data)
      : karrio!.shipments.create({
        data: shipment as any
      }).then(({ data }) => data)
  );
  const voidLabel = async (shipment: ShipmentType) => handleFailure(
    karrio!.shipments
      .cancel({ id: shipment.id as string })
      .then(({ data }) => data)
  );

  const updateShipment = (data: PartialShipmentMutationInput) => (
    handleGraphQLRequest("partial_shipment_update", updateShipmentMutation)({ variables: { data } })
      .then(() => state?.loadShipment(state.shipment.id))
  );
  const discardCommodity = async (id: string) => (
    handleGraphQLRequest("discard_commodity", discardCommodityMutation)({ variables: { data: { id } } })
      .then(() => state?.loadShipment(state.shipment.id))
  );
  const discardCustoms = async (id: string) => (
    handleGraphQLRequest("discard_customs", discardCustomsMutation)({ variables: { data: { id } } })
      .then(() => state?.loadShipment(state.shipment.id))
  );
  const discardParcel = async (id: string) => (
    handleGraphQLRequest("discard_parcel", discardParcelMutation)({ variables: { data: { id } } })
      .then(() => state?.loadShipment(state.shipment.id))
  );

  return (
    <ShipmentMutationContext.Provider value={{
      buyLabel,
      voidLabel,
      fetchRates,
      updateShipment,
      discardCommodity,
      discardCustoms,
      discardParcel,
    }}>
      {children}
    </ShipmentMutationContext.Provider>
  )
};

export function useShipmentMutation() {
  return useContext(ShipmentMutationContext);
}

export default ShipmentMutationProvider;
