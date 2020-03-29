import attr
from typing import List, Dict, Tuple, cast
from purplship import package as api
from purplship.core.utils import exec_async
from purplship.core.models import (
    RateDetails, Address, RateRequest, Message, ShipmentRequest, ShipmentDetails, TrackingDetails,
    TrackingRequest
)


@attr.s(auto_attribs=True)
class CarrierSettings:
    type: str  # eg: dhl, caps, aups...
    settings: dict


@attr.s(auto_attribs=True)
class Shipment:
    shipper: Address
    recipient: Address
    options: Dict
    rates: List[RateDetails]
    carrier: str = None
    selected_rate: RateDetails = None
    label: str = None
    tracking_number: str = None


@attr.s(auto_attribs=True)
class CompleteShipmentResponse:
    messages: List[Message]
    shipment: Shipment = None


@attr.s(auto_attribs=True)
class CompleteTrackingResponse:
    messages: List[Message]
    tracking_details: TrackingDetails = None


def fetch_rates(payload: dict, carriers: List[CarrierSettings]) -> CompleteShipmentResponse:
    request = RateRequest(**payload)

    def process(carrier: CarrierSettings):
        gateway = api.gateway[carrier.type].create(carrier.settings)
        return api.rating.fetch(request).from_(gateway).parse()

    results: List[Tuple] = exec_async(process, carriers)
    rates = sum((r for r, _ in results), [])
    messages = sum((m for _, m in results), [])

    return CompleteShipmentResponse(
        shipment=Shipment(
            shipper=request.shipper,
            recipient=request.recipient,
            options=request.options,
            rates=rates
        ),
        messages=messages
    )


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
