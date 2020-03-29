from rest_framework.serializers import (
    Serializer, CharField, FloatField, BooleanField, IntegerField, ListField,
    DictField
)


class CarrierSettings:
    type = CharField(max_length=100, required=True)
    settings = DictField(required=True)


class StringListField(ListField):
    child = CharField()


class Address(Serializer):

    postal_code = CharField(max_length=100, required=False)
    city = CharField(max_length=100, required=False)
    type = CharField(max_length=100, required=False)
    federal_tax_id = CharField(max_length=100, required=False)
    state_tax_id = CharField(max_length=100, required=False)
    person_name = CharField(max_length=100, required=False)
    company_name = CharField(max_length=100, required=False)
    country_code = CharField(max_length=100, required=False)
    email = CharField(max_length=100, required=False)
    phone_number = CharField(max_length=100, required=False)

    state_code = CharField(max_length=100, required=False)
    suburb = CharField(max_length=100, required=False)
    residential = BooleanField(required=False)

    address_line_1 = CharField(max_length=100, required=False)
    address_line_2 = CharField(max_length=100, required=False)


class Commodity(Serializer):

    id = CharField(max_length=100, required=False)
    weight = FloatField(required=False)
    width = FloatField(required=False)
    height = FloatField(required=False)
    length = FloatField(required=False)
    description = CharField(max_length=100, required=False)
    quantity = IntegerField(required=False)
    sku = CharField(max_length=100, required=False)
    value_amount = FloatField(required=False)
    value_currency = CharField(max_length=100, required=False)
    origin_country = CharField(max_length=100, required=False)


class Parcel(Serializer):

    id = CharField(max_length=100, required=False)
    weight = FloatField(required=False)
    width = FloatField(required=False)
    height = FloatField(required=False)
    length = FloatField(required=False)
    packaging_type = CharField(max_length=100, required=False)
    package_preset = CharField(max_length=100, required=False)
    reference = CharField(max_length=100, required=False)
    description = CharField(max_length=100, required=False)
    content = CharField(max_length=100, required=False)
    is_document = BooleanField(required=False)
    weight_unit = CharField(max_length=100, required=False)
    dimension_unit = CharField(max_length=100, required=False)
    services = StringListField(required=False)


class Invoice(Serializer):

    date = CharField(max_length=100, required=True)
    identifier = CharField(max_length=100, required=False)
    type = CharField(max_length=100, required=False)
    copies = IntegerField(required=False)


class Card(Serializer):

    type = CharField(max_length=100, required=True)
    number = CharField(max_length=100, required=True)
    expiry_month = CharField(max_length=100, required=True)
    expiry_year = CharField(max_length=100, required=True)
    security_code = CharField(max_length=100, required=True)
    name = CharField(max_length=100, required=False)
    postal_code = CharField(max_length=100, required=False)


class Payment(Serializer):

    paid_by = CharField(max_length=100, required=True)
    amount = FloatField(required=False)
    currency = CharField(max_length=100, required=False)
    account_number = CharField(max_length=100, required=False)
    credit_card = Card()
    contact = Address()


class Customs(Serializer):

    no_eei = CharField(max_length=100, required=False)
    aes = CharField(max_length=100, required=False)
    description = CharField(max_length=100, required=False)
    terms_of_trade = CharField(max_length=100, required=False)
    commodities = ListField(child=Commodity())
    duty = Payment()
    invoice = Invoice()
    commercial_invoice = BooleanField(required=False)


class Doc(Serializer):

    type = CharField(max_length=100, required=False)
    format = CharField(max_length=100, required=False)
    image = CharField(max_length=100, required=False)


class ShipmentRequest(Serializer):

    shipper = Address(required=True)
    recipient = Address(required=True)
    parcel = Parcel()

    payment = Payment()
    customs = Customs()
    doc_images = ListField(child=Doc())

    options = DictField(required=False)


class RateRequest(Serializer):
    shipper = Address(required=True)
    recipient = Address(required=True)
    parcel = Parcel()

    options = DictField(required=False)


class TrackingRequest(Serializer):

    tracking_numbers = StringListField(required=True)
    language_code = CharField(max_length=100, required=False)
    level_of_details = CharField(max_length=100, required=False)


class PickupRequest(Serializer):

    date = CharField(max_length=100, required=True)

    address = Address(required=True)
    parcels = ListField(child=Parcel())

    ready_time = CharField(max_length=100, required=False)
    closing_time = CharField(max_length=100, required=False)
    instruction = CharField(max_length=100, required=False)
    package_location = CharField(max_length=100, required=False)


class PickupUpdateRequest(Serializer):

    date = CharField(max_length=100, required=True)
    address = Address(required=True)
    parcels = ListField(child=Parcel())

    confirmation_number = CharField(max_length=100, required=False)
    ready_time = CharField(max_length=100, required=False)
    closing_time = CharField(max_length=100, required=False)
    instruction = CharField(max_length=100, required=False)
    package_location = CharField(max_length=100, required=False)


class PickupCancellationRequest(Serializer):

    pickup_date = CharField(max_length=100, required=True)
    confirmation_number = CharField(max_length=100, required=True)
    person_name = CharField(max_length=100, required=False)
    country_code = CharField(max_length=100, required=False)


class COD(Serializer):

    amount = FloatField(required=True)


class Notification(Serializer):

    email = CharField(max_length=100, required=False)
    locale = CharField(max_length=100, required=False, default='en')


class Insurance(Serializer):

    amount = FloatField(required=True)


class Message(Serializer):

    carrier = CharField(max_length=100, required=True)
    carrier_name = CharField(max_length=100, required=True)
    message = CharField(max_length=100, required=False)
    code = CharField(max_length=100, required=False)
    details = DictField(required=False)


class ChargeDetails(Serializer):

    name = CharField(max_length=100, required=False)
    amount = FloatField(required=False)
    currency = CharField(max_length=100, required=False)


class TrackingEvent(Serializer):

    date = CharField(max_length=100, required=True)
    description = CharField(max_length=100, required=True)
    location = CharField(max_length=100, required=True)
    code = CharField(max_length=100, required=False)
    time = CharField(max_length=100, required=False)
    signatory = CharField(max_length=100, required=False)


class RateDetails(Serializer):

    carrier = CharField(max_length=100, required=True)
    carrier_name = CharField(max_length=100, required=True)
    currency = CharField(max_length=100, required=True)
    service = CharField(max_length=100, required=False)
    discount = FloatField(required=False)
    base_charge = FloatField(default=0.0)
    total_charge = FloatField(default=0.0)
    duties_and_taxes = FloatField(required=False)
    estimated_delivery = CharField(max_length=100, required=False)
    extra_charges = ListField(child=ChargeDetails())


class TrackingDetails(Serializer):

    carrier = CharField(max_length=100, required=True)
    carrier_name = CharField(max_length=100, required=True)
    tracking_number = CharField(max_length=100, required=True)
    events = ListField(child=TrackingEvent())


class ShipmentDetails(Serializer):

    carrier = CharField(max_length=100, required=True)
    carrier_name = CharField(max_length=100, required=True)
    label = CharField(max_length=100, required=True)
    tracking_number = CharField(max_length=100, required=True)
    selected_rate = RateDetails()


class PickupDetails(Serializer):

    carrier = CharField(max_length=100, required=True)
    carrier_name = CharField(max_length=100, required=True)
    confirmation_number = CharField(max_length=100, required=True)
    pickup_date = CharField(max_length=100, required=False)
    pickup_charge = ChargeDetails()
    pickup_time = CharField(max_length=100, required=False)
    pickup_max_time = CharField(max_length=100, required=False)


class Shipment(ShipmentRequest, ShipmentDetails):
    pass
    # shipper = Address()
    # recipient = Address()
    # options = DictField(required=False)
    # rates = ListField(child=RateDetails())
    # carrier = CharField(max_length=100, required=False)
    # selected_rate = RateDetails()
    # label = CharField(max_length=100, required=False)
    # tracking_number = CharField(max_length=100, required=False)


class CompleteShipmentResponse(Serializer):
    messages = ListField(child=Message())
    shipment = Shipment()


class CompleteTrackingResponse(Serializer):
    messages = ListField(child=Message())
    tracking_details = TrackingDetails()
