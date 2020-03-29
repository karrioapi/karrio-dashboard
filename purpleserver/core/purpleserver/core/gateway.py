from typing import List, Tuple, cast
from purplship import package as api
from purplship.core.utils import exec_async, to_dict
from purpleserver.core.serializers import (
    RateDetails, RateRequest, ShipmentRequest, ShipmentDetails,
    TrackingRequest, CarrierSettings, Shipment, CompleteShipmentResponse, CompleteTrackingResponse,
)


def fetch_rates(payload: dict, carriers: List[CarrierSettings]) -> CompleteShipmentResponse:
    request = RateRequest(**payload)

    def process(carrier: CarrierSettings):
        gateway = api.gateway[carrier.type].create(carrier.settings)
        return api.rating.fetch(request).from_(gateway).parse()

    results: List[Tuple] = exec_async(process, carriers)
    rates = sum((to_dict(r) for r, _ in results), [])
    messages = sum((to_dict(m) for _, m in results), [])

    return CompleteShipmentResponse(**dict(
        shipment=dict(
            shipper=request.shipper,
            recipient=request.recipient,
            options=request.options,
            rates=rates
        ),
        messages=messages
    ))


def create_shipment(payload: dict, carrier: CarrierSettings) -> CompleteShipmentResponse:
    request = ShipmentRequest(**{
        key: value for key, value in payload if key in ShipmentRequest.__annotations__
    })

    gateway = api.gateway[carrier.type].create(carrier.settings)
    shipment, messages = api.shipment.create(request).from_(gateway).parse()
    
    rates = payload.get('rates', [])
    selected_rate = (
        (cast(ShipmentDetails, shipment).selected_rate or RateDetails(**payload.get('selected_rate')))
        if shipment is not None else None
    )
    label = (
        cast(ShipmentDetails, shipment).label
        if shipment is not None else None
    )
    tracking_number = (
        cast(ShipmentDetails, shipment).tracking_number
        if shipment is not None else None
    )

    return CompleteShipmentResponse(
        shipment=Shipment(
            shipper=request.shipper,
            recipient=request.recipient,
            options=request.options,
            rates=rates,
            carrier=carrier.type,
            selected_rate=selected_rate,
            label=label,
            tracking_number=tracking_number
        ),
        messages=messages
    )


def track_shipment(payload: dict, carrier: CarrierSettings) -> CompleteTrackingResponse:
    request = TrackingRequest(**payload)
    gateway = api.gateway[carrier.type].create(carrier.settings)
    results, messages = api.tracking.fetch(request).from_(gateway).parse()

    return CompleteTrackingResponse(
        tracking_details=next(iter(results), None),
        messages=messages
    )
