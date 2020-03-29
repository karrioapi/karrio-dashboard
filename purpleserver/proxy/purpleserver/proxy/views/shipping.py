from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.throttling import UserRateThrottle, AnonRateThrottle
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes, throttle_classes
from rest_framework.response import Response
from django.urls import path

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from purplship.core.utils.helpers import to_dict

from purpleserver.core import serializers
from purpleserver.core.gateway import fetch_rates
from purpleserver.proxy.router import router


@swagger_auto_schema(
    methods=['post'],
    responses={200: serializers.CompleteShipmentResponse()},
    request_body=serializers.ShipmentRequest(),
    operation_description="""
    POST /v1/shipping/[carrier?]
    """,
    operation_id="CreateShipment",
    manual_parameter=[
        openapi.Parameter(
            'carrier',
            openapi.IN_PATH,
            required=True,
            description="specific shipping carrier",
            type=openapi.TYPE_STRING
        )
    ]
)
@api_view(['POST'])
@authentication_classes((SessionAuthentication, BasicAuthentication, TokenAuthentication))
@permission_classes((IsAuthenticated, ))
@throttle_classes([UserRateThrottle, AnonRateThrottle])
def rate(carrier: str):
    error = None
    try:
        if error is None:
            return Response(
                to_dict({}),
                status=status.HTTP_200_OK
            )
        else:
            return Response(error, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response(e.args, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


router.urls.append(path('shipping/<carrier>', rate, name='Rates'))
