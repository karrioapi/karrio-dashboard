__path__ = __import__('pkgutil').extend_path(__path__, __name__)  # type: ignore

import logging
import dj_database_url
from decouple import config
from purpleserver.settings.base import *
from purpleserver.settings.email import *
from purpleserver.settings.constance import *

if config('MULTI_TENANT_ENABLE', default=False, cast=bool):
    from purpleserver.settings.tenants import *


SECURITY, *EXTRA_MIDDLEWARE = MIDDLEWARE
MIDDLEWARE = [
    SECURITY,
    'whitenoise.middleware.WhiteNoiseMiddleware',
    *EXTRA_MIDDLEWARE
]


# Heroku: Update database configuration from $DATABASE_URL.
db_from_env = dj_database_url.config(conn_max_age=500)
DATABASES['default'].update(db_from_env)


# Simplified static file serving.
# https://warehouse.python.org/project/whitenoise/
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'


logging.warning("Purplship Heroku settings loaded...")
