import React, { useContext } from 'react';
import { OperationResponse, Shipment } from '@purplship/rest/index';
import { handleFailure } from '@/lib/helper';
import { LabelData } from '@/context/label-data-provider';
import { AppMode } from '@/context/app-mode-provider';
import { RestContext } from '@/client/context';
import { useMutation } from '@apollo/client';
import { DISCARD_COMMODITY, discard_commodityVariables, DISCARD_CUSTOMS, DISCARD_PARCEL, discard_parcelVariables, PartialShipmentUpdateInput, partial_shipment_updateVariables, PARTIAL_UPDATE_SHIPMENT } from '@purplship/graphql';
import { ShipmentType } from '@/lib/types';


export type ShipmentMutator = {
  fetchRates: (shipment: ShipmentType) => Promise<Shipment>;
  buyLabel: (shipment: ShipmentType) => Promise<Shipment>;
  voidLabel: (shipment: ShipmentType) => Promise<OperationResponse>;
  updateShipment: (data: PartialShipmentUpdateInput) => Promise<void>;
  discardCommodity: (id: string) => Promise<void>;
  discardCustoms: (id: string) => Promise<void>;
  discardParcel: (id: string) => Promise<void>;
};

export const ShipmentMutationContext = React.createContext<ShipmentMutator>({} as ShipmentMutator);

const ShipmentMutationProvider: React.FC<{}> = ({ children }) => {
  const purplship = useContext(RestContext);
  const { testMode } = useContext(AppMode);
  const state = useContext(LabelData);

  const [updateShipmentMutation] = useMutation<PartialShipmentUpdateInput, partial_shipment_updateVariables>(PARTIAL_UPDATE_SHIPMENT);
  const [discardCommodityMutation] = useMutation<{ id: string }, discard_commodityVariables>(DISCARD_COMMODITY);
  const [discardCustomsMutation] = useMutation<{ id: string }, discard_commodityVariables>(DISCARD_CUSTOMS);
  const [discardParcelMutation] = useMutation<{ id: string }, discard_parcelVariables>(DISCARD_PARCEL);

  const fetchRates = async (shipment: ShipmentType) => handleFailure((async () => {
    if (shipment.id !== undefined) {
      return purplship!.shipments.rates({ id: shipment.id, data: {} });
    } else {
      return purplship!.shipments.create({ data: shipment as any, test: testMode });
    }
  })()).then(
    (response) => { state.loadShipment(response.id as string); return response; }
  );
  const buyLabel = async (shipment: ShipmentType) => handleFailure(
    purplship!.shipments.purchase({
      data: {
        payment: shipment.payment as any,
        label_type: shipment.label_type as any,
        selected_rate_id: shipment.selected_rate_id as string,
      },
      id: shipment.id as string
    })
  );
  const voidLabel = async (shipment: ShipmentType) => handleFailure(
    purplship!.shipments.cancel({ id: shipment.id as string })
  );

  const updateShipment = async (data: PartialShipmentUpdateInput) => (
    updateShipmentMutation({ variables: { data } })
      .then(() => state?.loadShipment(state.shipment.id))
  );
  const discardCommodity = async (id: string) => (
    discardCommodityMutation({ variables: { data: { id } } })
      .then(() => state?.loadShipment(state.shipment.id))
  );
  const discardCustoms = async (id: string) => (
    discardCustomsMutation({ variables: { data: { id } } })
      .then(() => state?.loadShipment(state.shipment.id))
  );
  const discardParcel = async (id: string) => (
    discardParcelMutation({ variables: { data: { id } } })
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

export default ShipmentMutationProvider;
