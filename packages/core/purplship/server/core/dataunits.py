from django.conf import settings

from purplship.references import collect_providers_data, collect_references
from purplship.server.core.serializers import CustomsContentType, Incoterm


PACKAGE_MAPPERS = collect_providers_data()


REFERENCE_MODELS = {
    **collect_references(),
    "customs_content_type": {c.name: c.value for c in list(CustomsContentType)},
    "incoterms": {c.name: c.value for c in list(Incoterm)},

    "APP_NAME": getattr(settings, 'APP_NAME', 'purplship'),
    "APP_WEBSITE": getattr(settings, 'APP_WEBSITE', 'https://purplship.com'),
    "APP_VERSION": getattr(settings, 'VERSION'),
    "MULTI_ORGANIZATIONS": getattr(settings, 'MULTI_ORGANIZATIONS', False),
}