import attr
from typing import List, Dict
from jstruct import JStruct, JList, REQUIRED
from purplship.core.models import (
    Address,
    Doc,
    Payment,
    Customs,
    Parcel,
    RateDetails,
    Parcel,
    Message,
    TrackingDetails,
    RateRequest,
    TrackingRequest,
    ShipmentDetails,
    ShipmentRequest as BaseShipmentRequest
)


@attr.s(auto_attribs=True)
class CarrierSettings:
    carrier: str
    settings: dict


@attr.s(auto_attribs=True)
class ShipmentRate:
    shipper: Address = JStruct[Address, REQUIRED]
    recipient: Address = JStruct[Address, REQUIRED]
    parcel: Parcel = JStruct[Parcel, REQUIRED]
    rates: List[RateDetails] = JList[RateDetails]
    options: Dict = {}


@attr.s(auto_attribs=True)
class ShipmentRequest(BaseShipmentRequest):
    selected_rate_id: str = JStruct[str, REQUIRED]

    shipper: Address = JStruct[Address, REQUIRED]
    recipient: Address = JStruct[Address, REQUIRED]
    parcel: Parcel = JStruct[Parcel, REQUIRED]
    rates: List[RateDetails] = JList[RateDetails, REQUIRED]

    payment: Payment = JStruct[Payment]
    customs: Customs = JStruct[Customs]
    doc_images: List[Doc] = JList[Doc]

    options: Dict = {}


@attr.s(auto_attribs=True)
class Shipment:
    carrier: str
    carrier_name: str
    tracking_number: str
    label: str
    selected_rate_id: str
    shipper: Address = JStruct[Address, REQUIRED]
    recipient: Address = JStruct[Address, REQUIRED]
    parcel: Parcel = JStruct[Parcel, REQUIRED]
    selected_rate: RateDetails = JList[RateDetails]
    rates: List[RateDetails] = JList[RateDetails]
    options: Dict = {}


@attr.s(auto_attribs=True)
class RateResponse:
    messages: List[Message] = JList[Message]
    shipment: ShipmentRate = JStruct[ShipmentRate]


@attr.s(auto_attribs=True)
class ShipmentResponse:
    messages: List[Message] = JList[Message]
    shipment: Shipment = JStruct[Shipment]


@attr.s(auto_attribs=True)
class TrackingResponse:
    messages: List[Message] = JList[Message]
    tracking_details: TrackingDetails = JStruct[TrackingDetails]
