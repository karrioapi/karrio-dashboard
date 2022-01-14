import React, { useContext } from 'react';
import { OperationResponse, Shipment, ShipmentData } from '@purplship/rest/index';
import { handleFailure } from '@/lib/helper';
import { LabelData } from '@/context/shipment-provider';
import { AppMode } from '@/context/app-mode-provider';
import { RestContext } from '@/client/context';
import { useMutation } from '@apollo/client';
import { DISCARD_COMMODITY, discard_commodityVariables, DISCARD_CUSTOMS, DISCARD_PARCEL, discard_parcelVariables, PartialShipmentUpdateInput, partial_shipment_updateVariables, PARTIAL_UPDATE_SHIPMENT } from '@purplship/graphql';
import { ShipmentType } from '@/lib/types';


export type ShipmentMutator = {
  fetchRates: (shipment: Shipment | ShipmentData) => Promise<Shipment>;
  buyLabel: (shipment: Shipment) => Promise<Shipment>;
  voidLabel: (shipment: Shipment) => Promise<OperationResponse>;
  updateShipment: (data: PartialShipmentUpdateInput) => Promise<ShipmentType>;
  discardCommodity: (id: string) => Promise<ShipmentType>;
  discardCustoms: (id: string) => Promise<ShipmentType>;
  discardParcel: (id: string) => Promise<ShipmentType>;
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

  const fetchRates = async (shipment: Shipment | ShipmentData) => {
    return handleFailure((async () => {
      if ((shipment as Shipment).id !== undefined) {
        const { reference, id } = shipment as Shipment;
        return purplship!.shipments.rates({ id: id as string, data: { reference } });
      } else {
        return purplship!.shipments.create({ data: (shipment as ShipmentData), test: testMode });
      }
    })().then(r => { state.updateShipment(r as ShipmentType); return r; }));
  };
  const buyLabel = async (shipment: Shipment) => handleFailure(
    purplship!.shipments.purchase({
      data: {
        payment: shipment.payment,
        reference: shipment.reference,
        label_type: shipment.label_type as any,
        selected_rate_id: shipment.selected_rate_id as string,
      },
      id: shipment.id as string
    })
  );
  const voidLabel = async (shipment: Shipment) => handleFailure(
    purplship!.shipments.cancel({ id: shipment.id as string })
  );

  const updateShipment = async (data: PartialShipmentUpdateInput) => (
    updateShipmentMutation({ variables: { data } })
      .then(() => state.loadShipment(data.id))
  );
  const discardCommodity = async (id: string) => (
    discardCommodityMutation({ variables: { data: { id } } })
      .then(() => state.loadShipment(state.shipment.id))
  );
  const discardCustoms = async (id: string) => (
    discardCustomsMutation({ variables: { data: { id } } })
      .then(() => state.loadShipment(state.shipment.id))
  );
  const discardParcel = async (id: string) => (
    discardParcelMutation({ variables: { data: { id } } })
      .then(() => state.loadShipment(state.shipment.id))
  );

  return (
    <ShipmentMutationContext.Provider value={{
      fetchRates,
      buyLabel,
      voidLabel,
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
