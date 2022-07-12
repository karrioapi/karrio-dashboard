import React, { useContext } from 'react';
import { OperationResponse, RateResponse, Shipment } from 'karrio/rest/index';
import { handleFailure, handleGraphQLRequest } from '@/lib/helper';
import { LabelContext } from '@/context/label-data-provider';
import { AppMode } from '@/context/app-mode-provider';
import { RestContext } from '@/client/context';
import { useMutation } from '@apollo/client';
import { discard_commodity, DISCARD_COMMODITY, discard_commodityVariables, discard_customs, DISCARD_CUSTOMS, discard_customsVariables, discard_parcel, DISCARD_PARCEL, discard_parcelVariables, GET_SHIPMENT, PartialShipmentUpdateInput, partial_shipment_update, partial_shipment_updateVariables, PARTIAL_UPDATE_SHIPMENT } from 'karrio/graphql';
import { ShipmentType } from '@/lib/types';


export type ShipmentMutator = {
  fetchRates: (shipment: ShipmentType) => Promise<RateResponse>;
  buyLabel: (shipment: ShipmentType) => Promise<Shipment>;
  voidLabel: (shipment: ShipmentType) => Promise<OperationResponse>;
  updateShipment: (data: PartialShipmentUpdateInput) => Promise<void>;
  discardCommodity: (id: string) => Promise<void>;
  discardCustoms: (id: string) => Promise<void>;
  discardParcel: (id: string) => Promise<void>;
};

export const ShipmentMutationContext = React.createContext<ShipmentMutator>({} as ShipmentMutator);

const ShipmentMutationProvider: React.FC<{}> = ({ children }) => {
  const karrio = useContext(RestContext);
  const { testMode } = useContext(AppMode);
  const state = useContext(LabelContext);

  const [updateShipmentMutation] = useMutation<partial_shipment_update, partial_shipment_updateVariables>(PARTIAL_UPDATE_SHIPMENT);
  const [discardCommodityMutation] = useMutation<discard_commodity, discard_commodityVariables>(DISCARD_COMMODITY);
  const [discardCustomsMutation] = useMutation<discard_customs, discard_customsVariables>(DISCARD_CUSTOMS);
  const [discardParcelMutation] = useMutation<discard_parcel, discard_parcelVariables>(DISCARD_PARCEL);

  const fetchRates = async (shipment: ShipmentType) => handleFailure(
    karrio!.proxy.fetchRates({ data: (shipment as any) }),
  );
  const buyLabel = async (shipment: ShipmentType) => handleFailure(
    shipment.id !== undefined ?
      karrio!.shipments.purchase({
        id: shipment.id as string,
        data: { selected_rate_id: shipment.selected_rate_id as string },
      }) :
      karrio!.shipments.create({ data: shipment as any })
  );
  const voidLabel = async (shipment: ShipmentType) => handleFailure(
    karrio!.shipments.cancel({ id: shipment.id as string })
  );

  const updateShipment = (data: PartialShipmentUpdateInput) => (
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
