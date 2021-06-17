import logging
import functools
import importlib
from django.db.models import Q

from purpleserver.serializers import Context
from purpleserver.core.gateway import Rates
import purpleserver.pricing.models as models

logger = logging.getLogger(__name__)


def register_rate_post_processing(*args, **kwargs):
    logger.debug("register custom surcharge processing")
    Rates.post_process_functions += [apply_custom_surcharges]


def apply_custom_surcharges(context: Context, result):
    _filters = tuple()

    if importlib.util.find_spec('purpleserver.orgs') is not None:
        _filters += (
            Q(active=True, org__id=getattr(context.org, 'id', None))
            | Q(active=True, org=None),
        )
    else:
        _filters += (Q(active=True),)

    charges = models.Surcharge.objects.filter(*_filters)

    return functools.reduce(
        lambda cummulated_result, charge: charge.apply_charge(cummulated_result),
        charges,
        result
    )
