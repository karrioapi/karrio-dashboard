import logging

from rest_framework import status, serializers
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.request import Request

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from django.urls import path
from django_filters import rest_framework as filters

from purpleserver.core.views.api import GenericAPIView, APIView
from purpleserver.core.serializers import (
    FlagField,
    Pickup,
    ErrorResponse,
    OperationConfirmation,
    TestFilters,
)
from purpleserver.serializers import SerializerDecorator, PaginatedResult
from purpleserver.manager.router import router
from purpleserver.manager.serializers import PickupData, PickupUpdateData, PickupCancelData
import purpleserver.manager.models as models

logger = logging.getLogger(__name__)
ENDPOINT_ID = "$$$$"  # This endpoint id is used to make operation ids unique make sure not to duplicate
Pickups = PaginatedResult('PickupList', Pickup)


class PickupFilters(filters.FilterSet):
    parameters = [
        openapi.Parameter('test_mode', in_=openapi.IN_QUERY, type=openapi.TYPE_BOOLEAN),
    ]

    class Meta:
        model = models.Pickup
        fields = ['test_mode']


class PickupList(GenericAPIView):
    pagination_class = type('CustomPagination', (LimitOffsetPagination,), dict(default_limit=20))
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = PickupFilters
    serializer_class = Pickup
    model = models.Pickup

    @swagger_auto_schema(
        tags=['Pickups'],
        operation_id=f"{ENDPOINT_ID}list",
        operation_summary="List shipment pickups",
        responses={200: Pickups(), 400: ErrorResponse()},
        query_serializer=PickupFilters.parameters,
        code_examples=[
            {
                'lang': 'bash',
                'source': '''
                curl --request GET \\
                  --url '/v1/pickups' \\
                  --header 'Authorization: Token <API_KEY>'
                '''
            }
        ]
    )
    def get(self, request: Request):
        """
        Retrieve all scheduled pickups.
        """
        pickups = self.filter_queryset(self.get_queryset())
        response = self.paginate_queryset(Pickup(pickups, many=True).data)
        return self.get_paginated_response(response)


class PickupRequest(APIView):

    @swagger_auto_schema(
        tags=['Pickups'],
        operation_id=f"{ENDPOINT_ID}schedule",
        operation_summary="Schedule a pickup",
        responses={200: Pickup(), 400: ErrorResponse()},
        query_serializer=TestFilters(),
        request_body=PickupData(),
        code_examples=[
            {
                'lang': 'bash',
                'source': '''
                curl --request POST \\
                  --url /v1/pickups/<PICKUP_ID> \\
                  --header 'Authorization: Token <API_KEY>' \\
                  --data '{
                    "pickup_date": "2020-10-25",
                    "address": {
                      "address_line1": "125 Church St",
                      "person_name": "John Doe",
                      "city": "Moncton",
                      "country_code": "CA",
                      "postal_code": "E1C4Z8",
                      "state_code": "NB",
                    },
                    "ready_time": "13:00",
                    "closing_time": "17:00",
                    "instruction": "Should not be folded",
                    "package_location": "At the main entrance hall",
                    "tracking_numbers": [
                        "8545763607864201002"
                    ]
                }'
                '''
            }
        ]
    )
    def post(self, request: Request, carrier_name: str):
        """
        Schedule a pickup for one or many shipments with labels already purchased.
        """
        carrier_filter = {
            **SerializerDecorator[TestFilters](data=request.query_params).data,
            "carrier_name": carrier_name,
            "user": request.user
        }

        pickup = SerializerDecorator[PickupData](
            data=request.data, context=request).save(carrier_filter=carrier_filter).instance

        return Response(Pickup(pickup).data, status=status.HTTP_201_CREATED)


class PickupDetails(APIView):

    @swagger_auto_schema(
        tags=['Pickups'],
        operation_id=f"{ENDPOINT_ID}retrieve",
        operation_summary="Retrieve a pickup",
        responses={200: Pickup(), 400: ErrorResponse()},
        code_examples=[
            {
                'lang': 'bash',
                'source': '''
                curl --request GET \\
                  --url /v1/pickups/<PICKUP_ID> \\
                  --header 'Authorization: Token <API_KEY>'
                '''
            }
        ]
    )
    def get(self, request: Request, pk: str):
        """Retrieve a scheduled pickup."""
        pickup = models.Pickup.access_by(request).get(pk=pk)
        return Response(Pickup(pickup).data)

    @swagger_auto_schema(
        tags=['Pickups'],
        operation_id=f"{ENDPOINT_ID}update",
        operation_summary="Update a pickup",
        responses={200: OperationConfirmation(), 400: ErrorResponse()},
        request_body=PickupUpdateData(),
        code_examples=[
            {
                'lang': 'bash',
                'source': '''
                curl --request PATCH \\
                  --url /v1/pickups/<PICKUP_ID> \\
                  --header 'Authorization: Token <API_KEY>' \\
                  --data '{
                    "address": {
                      "phone_number": "514-000-0000",
                      "residential": false,
                      "email": "john@a.com"
                    },
                    "ready_time": "13:00",
                    "closing_time": "20:00",
                }'
                '''
            }
        ]
    )
    def patch(self, request: Request, pk: str):
        """
        Modify a pickup for one or many shipments with labels already purchased.
        """
        pickup = models.Pickup.access_by(request).get(pk=pk)
        instance = SerializerDecorator[PickupUpdateData](
            pickup, data=request.data, context=request).save().instance

        return Response(Pickup(instance).data, status=status.HTTP_200_OK)


class PickupCancel(APIView):

    @swagger_auto_schema(
        tags=['Pickups'],
        operation_id=f"{ENDPOINT_ID}cancel",
        operation_summary="Cancel a pickup",
        responses={200: OperationConfirmation(), 400: ErrorResponse()},
        request_body=PickupCancelData(),
        code_examples=[
            {
                'lang': 'bash',
                'source': '''
                curl --request POST \\
                  --url /v1/pickups/<PICKUP_ID> \\
                  --header 'Authorization: Token <API_KEY>'
                '''
            }
        ]
    )
    def post(self, request: Request, pk: str):
        """
        Cancel a pickup of one or more shipments.
        """
        pickup = models.Pickup.access_by(request).get(pk=pk)
        confirmation = SerializerDecorator[PickupCancelData](
            pickup, data=request.data, context=request).save().instance

        return Response(OperationConfirmation(confirmation).data, status=status.HTTP_200_OK)


router.urls.append(path('pickups', PickupList.as_view(), name="shipment-pickup-list"))
router.urls.append(path('pickups/<str:pk>', PickupDetails.as_view(), name="shipment-pickup-details"))
router.urls.append(path('pickups/<str:pk>/cancel', PickupCancel.as_view(), name="shipment-pickup-cancel"))
router.urls.append(path('pickups/<str:carrier_name>/schedule', PickupRequest.as_view(), name="shipment-pickup-request"))
